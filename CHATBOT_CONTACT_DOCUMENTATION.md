# Chatbot and Contact System Documentation

## Overview

This document describes the implementation of two major features:
1. **AI Chatbot** - An intelligent customer support chatbot
2. **Contact/Complaint System** - A comprehensive contact management system for both registered and guest users

---

## 🤖 Chatbot Feature

### Description
An AI-powered chatbot that helps customers answer basic questions about orders, shipping, returns, payments, and more. The chatbot is available to both authenticated and guest users.

### Features
- **24/7 Availability**: Always available to answer customer questions
- **Predefined Knowledge Base**: Covers common topics like:
  - Shipping & Delivery
  - Returns & Refunds
  - Payment Methods
  - Account Management
  - Order Tracking
  - Product Information
- **Session Management**: Each conversation is tracked by a unique session ID
- **User Context**: Recognizes logged-in users and provides personalized greetings
- **Chat History**: Conversations are stored and can be retrieved
- **Admin Analytics**: Admins can view chatbot usage statistics and session data

### Backend Implementation

#### Model: `ChatMessage.js`
```javascript
{
  sessionID: String (required),
  userID: ObjectId (ref: User, optional),
  message: String (required),
  response: String (required),
  intent: String,
  createdAt: Date
}
```

#### API Endpoints

1. **POST /api/chatbot/message**
   - **Access**: Public (with optional authentication)
   - **Body**: `{ message, sessionID }`
   - **Response**: `{ success, response, intent, messageId }`

2. **GET /api/chatbot/history/:sessionID**
   - **Access**: Public
   - **Response**: List of messages for the session

3. **GET /api/chatbot/sessions**
   - **Access**: Admin/Staff only
   - **Response**: List of all chat sessions

4. **GET /api/chatbot/analytics**
   - **Access**: Admin/Staff only
   - **Response**: Chatbot usage statistics

### Frontend Implementation

#### Component: `Chatbot.jsx`
- **Location**: `frontend/src/components/Chatbot.jsx`
- **Features**:
  - Floating chat button (bottom-right corner)
  - Expandable chat window
  - Real-time message display
  - Quick question buttons
  - Auto-scroll to latest message
  - Session persistence

#### Redux Slice: `chatbotSlice.js`
- **Actions**:
  - `sendChatMessage`: Send a message to the chatbot
  - `getChatHistory`: Retrieve chat history
  - `getAllChatSessions`: Get all sessions (Admin)
  - `getChatbotAnalytics`: Get analytics (Admin)
  - `toggleChatbot`: Toggle chat window
  - `setSessionID`: Set session ID
  - `clearMessages`: Clear chat messages

### Usage

#### For Users
1. Click the floating chat button in the bottom-right corner
2. Type your question or select from quick questions
3. Receive instant responses
4. Chat history is maintained during the session

#### For Admins
- View all chat sessions at `/api/chatbot/sessions`
- Access analytics at `/api/chatbot/analytics`

---

## 📧 Contact/Complaint System

### Description
A comprehensive contact management system that allows both registered users and guests to submit inquiries, complaints, or feedback. Admin and staff can manage and respond to these contacts.

### Features

#### For All Users (Guest & Registered)
- Submit contact forms with:
  - Name, Email, Phone (optional)
  - Subject and Message
  - Category selection (General Inquiry, Order Issue, Product Question, etc.)
- Automatic email capture for guest users
- Pre-filled form for logged-in users

#### For Registered Users
- View their own contact history
- Automatic association with user account
- Track status of submissions

#### For Admin/Staff
- View all contacts with filtering options
- Update contact status (Open, In Progress, Resolved, Closed)
- Set priority levels (Low, Medium, High, Urgent)
- Add internal notes
- Send responses to customers
- Delete contacts
- View statistics dashboard

### Backend Implementation

#### Model: `Contact.js`
```javascript
{
  userID: ObjectId (ref: User, optional),
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  category: Enum (required),
  status: Enum (default: 'Open'),
  priority: Enum (default: 'Medium'),
  assignedTo: ObjectId (ref: User),
  adminNotes: String,
  response: String,
  isRegisteredUser: Boolean,
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date
}
```

#### API Endpoints

1. **POST /api/contact**
   - **Access**: Public (with optional authentication)
   - **Body**: `{ name, email, phone, subject, message, category }`
   - **Response**: `{ success, message, contact }`

2. **GET /api/contact**
   - **Access**: Admin/Staff only
   - **Query Params**: `status, priority, category, search`
   - **Response**: List of all contacts

3. **GET /api/contact/:id**
   - **Access**: Admin/Staff only
   - **Response**: Contact details

4. **GET /api/contact/my-contacts**
   - **Access**: Authenticated users
   - **Response**: User's own contacts

5. **PUT /api/contact/:id**
   - **Access**: Admin/Staff only
   - **Body**: `{ status, priority, assignedTo, adminNotes, response }`
   - **Response**: Updated contact

6. **DELETE /api/contact/:id**
   - **Access**: Admin only
   - **Response**: Success message

7. **GET /api/contact/stats**
   - **Access**: Admin/Staff only
   - **Response**: Contact statistics

### Frontend Implementation

#### Screen: `ContactScreen.jsx`
- **Location**: `frontend/src/screens/ContactScreen.jsx`
- **Route**: `/contact`
- **Features**:
  - Contact form with validation
  - Category selection
  - Auto-fill for logged-in users
  - Success/error notifications
  - Additional contact information display

#### Screen: `AdminContactsScreen.jsx`
- **Location**: `frontend/src/screens/Admin/AdminContactsScreen.jsx`
- **Route**: `/admin/contacts`
- **Features**:
  - Statistics dashboard
  - Advanced filtering (status, priority, category, search)
  - Contact list table
  - Detail modal with update form
  - Delete functionality
  - Status and priority badges

#### Redux Slice: `contactSlice.js`
- **Actions**:
  - `createContact`: Submit new contact
  - `getAllContacts`: Get all contacts with filters
  - `getContactById`: Get specific contact
  - `getMyContacts`: Get user's own contacts
  - `updateContact`: Update contact details
  - `deleteContact`: Delete contact
  - `getContactStats`: Get statistics

### Usage

#### For Users
1. Navigate to `/contact`
2. Fill out the contact form
3. Select appropriate category
4. Submit the form
5. Receive confirmation message

#### For Registered Users
- Form is auto-filled with user information
- Can view submission history at `/api/contact/my-contacts`

#### For Admins/Staff
1. Navigate to `/admin/contacts`
2. View statistics dashboard
3. Filter contacts by status, priority, or category
4. Click "View" to see details and update
5. Change status, priority, add notes, or respond
6. Delete contacts if needed

---

## 🔐 Authentication & Authorization

### Optional Authentication
Both features support optional authentication through the `optionalAuth` middleware:
- Guest users can use features without logging in
- Logged-in users get enhanced experience with personalized data

### Role-Based Access
- **Public**: Can submit contacts and use chatbot
- **User**: Can view their own contacts
- **Staff**: Can manage contacts and view chatbot analytics
- **Admin**: Full access to all features including deletion

---

## 📊 Categories

### Contact Categories
- General Inquiry
- Order Issue
- Product Question
- Technical Support
- Complaint
- Feedback
- Other

### Contact Status
- Open (default)
- In Progress
- Resolved
- Closed

### Priority Levels
- Low
- Medium (default)
- High
- Urgent

---

## 🎨 UI Components

### Chatbot UI
- Floating button with chat icon
- Expandable chat window (400x600px)
- Welcome message with quick questions
- User messages (blue, right-aligned)
- Bot responses (white, left-aligned)
- Typing indicator during loading
- Timestamp for each message

### Contact Form UI
- Responsive form with validation
- Pre-filled fields for logged-in users
- Category dropdown
- Rich textarea for message
- Contact information section
- Success/error alerts

### Admin Contact Management UI
- Statistics cards (Total, Open, In Progress, Urgent)
- Filter bar with search
- Data table with badges
- Modal for detailed view and editing
- Color-coded status and priority badges

---

## 🚀 Getting Started

### Backend Setup
No additional setup required. The features are integrated with existing authentication and database.

### Frontend Setup
1. The Chatbot component is automatically loaded in `App.jsx`
2. Contact link is added to the Navbar
3. Admin contacts link is available in the admin dropdown

### Testing

#### Test Chatbot
1. Click the chat button on any page
2. Try questions like:
   - "How can I track my order?"
   - "What is your return policy?"
   - "What payment methods do you accept?"

#### Test Contact Form
1. Go to `/contact`
2. Submit a form as a guest (provide email)
3. Login and submit another form (pre-filled)
4. Admin can view at `/admin/contacts`

---

## 📝 Notes

### Chatbot Knowledge Base
The chatbot uses a predefined knowledge base. To add more responses:
1. Edit `backend/controllers/chatbotController.js`
2. Add new entries to the `chatbotKnowledge` object
3. Follow the existing pattern with keywords and responses

### Email Notifications
Currently, the system stores responses but doesn't send email notifications. You can integrate an email service (like SendGrid, Nodemailer) to send:
- Confirmation emails when contact is submitted
- Response emails when admin replies
- Status update notifications

### Future Enhancements
- Email notifications
- File upload support for contacts
- Chatbot AI integration (OpenAI, DialogFlow)
- Live chat with human agents
- Contact assignment workflow
- Priority escalation rules
- Chatbot training from contact history

---

## 🐛 Troubleshooting

### Chatbot not responding
- Check browser console for errors
- Verify backend is running
- Check sessionID is being generated

### Contact form not submitting
- Verify all required fields are filled
- Check email format is valid
- Look for validation errors in Alert component

### Admin can't see contacts
- Verify user role is 'admin' or 'staff'
- Check authentication token is valid
- Ensure backend routes are accessible

---

## 📄 License
This feature is part of the MobileShop e-commerce application.
