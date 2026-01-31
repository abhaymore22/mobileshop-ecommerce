import Contact from '../models/Contact.js';
import User from '../models/User.js';
import { sendContactAcknowledgmentEmail, sendContactStatusUpdateEmail } from '../config/emailConfig.js';

// @desc    Create new contact/complaint
// @route   POST /api/contact
// @access  Public (can be used by guests or authenticated users)
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, category } = req.body;

    // Check if user is authenticated
    const userID = req.user ? req.user._id : null;
    const isRegisteredUser = !!req.user;

    // If user is authenticated, use their info
    const contactData = {
      name: isRegisteredUser ? req.user.name : name,
      email: isRegisteredUser ? req.user.email : email,
      phone: phone || (isRegisteredUser ? req.user.phone : ''),
      subject,
      message,
      category: category || 'General Inquiry',
      userID,
      isRegisteredUser
    };

    const contact = await Contact.create(contactData);

    // Send acknowledgment email
    try {
      await sendContactAcknowledgmentEmail(contact);
      console.log('Contact acknowledgment email sent to:', contact.email);
    } catch (emailError) {
      console.error('Failed to send contact acknowledgment email:', emailError.message);
      // Don't block contact creation if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully. We will get back to you soon.',
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin/Staff
export const getAllContacts = async (req, res) => {
  try {
    const { status, priority, category, search } = req.query;
    
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by name, email, subject
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .populate('userID', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private/Admin/Staff
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('userID', 'name email phone address')
      .populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found' 
      });
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get user's own contacts
// @route   GET /api/contact/my-contacts
// @access  Private
export const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ 
      $or: [
        { userID: req.user._id },
        { email: req.user.email }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin/Staff
export const updateContact = async (req, res) => {
  try {
    const { status, priority, assignedTo, adminNotes, response } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found' 
      });
    }

    const oldStatus = contact.status;
    const oldResponse = contact.response;

    // Update fields
    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (assignedTo) contact.assignedTo = assignedTo;
    if (adminNotes !== undefined) contact.adminNotes = adminNotes;
    if (response !== undefined) contact.response = response;

    // Set resolvedAt when status changes to Resolved
    if (status === 'Resolved' && !contact.resolvedAt) {
      contact.resolvedAt = Date.now();
    }

    await contact.save();

    const updatedContact = await Contact.findById(req.params.id)
      .populate('userID', 'name email')
      .populate('assignedTo', 'name email');

    // Send status update email if status changed or response was added
    try {
      const shouldSendEmail = (status && status !== oldStatus) || 
                            (response && response !== oldResponse);
      
      if (shouldSendEmail) {
        await sendContactStatusUpdateEmail(updatedContact, oldStatus);
        console.log('Contact status update email sent to:', updatedContact.email);
      }
    } catch (emailError) {
      console.error('Failed to send contact status update email:', emailError.message);
      // Don't block contact update if email fails
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact: updatedContact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ 
        success: false,
        message: 'Contact not found' 
      });
    }

    await Contact.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private/Admin/Staff
export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const openContacts = await Contact.countDocuments({ status: 'Open' });
    const inProgressContacts = await Contact.countDocuments({ status: 'In Progress' });
    const resolvedContacts = await Contact.countDocuments({ status: 'Resolved' });
    const closedContacts = await Contact.countDocuments({ status: 'Closed' });
    
    const urgentContacts = await Contact.countDocuments({ priority: 'Urgent', status: { $nin: ['Resolved', 'Closed'] } });
    const registeredUserContacts = await Contact.countDocuments({ isRegisteredUser: true });
    const guestContacts = await Contact.countDocuments({ isRegisteredUser: false });

    res.json({
      success: true,
      stats: {
        total: totalContacts,
        open: openContacts,
        inProgress: inProgressContacts,
        resolved: resolvedContacts,
        closed: closedContacts,
        urgent: urgentContacts,
        registeredUsers: registeredUserContacts,
        guests: guestContacts
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
