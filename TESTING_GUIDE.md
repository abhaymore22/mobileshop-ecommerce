# Testing Contact Form & Chatbot

## Testing Contact Form Submission

### For Guest Users (Without Login)
1. Go to homepage (http://localhost:5173)
2. Click the **"Contact Us"** sticky button at the bottom-right corner
3. Fill in the form with:
   - **Full Name**: John Doe
   - **Email Address**: john@example.com (valid email required)
   - **Phone Number**: +1 (555) 123-4567 (optional)
   - **Category**: Select any (General Inquiry, Order Issue, etc.)
   - **Subject**: Test Submission
   - **Message**: This is a test message for contact form (minimum 10 characters)
4. Click **"Send Message"**
5. You should see a success message: "Your message has been submitted successfully"
6. The modal will auto-close after 2 seconds

### For Registered Users (With Login)
1. Login to your account
2. Click the **"Contact Us"** button on homepage
3. Notice that Name and Email are pre-filled from your profile
4. Fill in the remaining fields
5. Submit the form
6. View your submissions by clicking **Profile menu → "My Contacts"**

### Verify Data Submission (Backend)
1. Check MongoDB database:
   ```javascript
   // In MongoDB Compass or Shell
   db.contacts.find().pretty()
   ```

2. Expected fields in database:
   - `name`: String
   - `email`: String
   - `phone`: String (optional)
   - `subject`: String
   - `message`: String
   - `category`: Enum value
   - `status`: "Open" (default)
   - `priority`: "Medium" (default)
   - `isRegisteredUser`: true/false
   - `userID`: ObjectId or null
   - `createdAt`: Date
   - `updatedAt`: Date

3. Check backend logs:
   ```
   Terminal should show: POST /api/contact 201
   ```

### Admin Testing
1. Login as admin or staff
2. Go to **Profile menu → "Manage Contacts"** or navigate to `/admin/contacts`
3. You should see all submitted contacts
4. Test filtering by:
   - Status (Open, In Progress, Resolved, Closed)
   - Priority (Low, Medium, High, Urgent)
   - Category
   - Search by name/email/subject
5. Click **"View"** on any contact
6. Update:
   - Status
   - Priority
   - Response message
   - Admin notes
7. Click **"Update Contact"**
8. Verify the changes are saved

## Testing Chatbot

### Basic Functionality
1. Go to any page on the website
2. Click the **blue chat button** at the bottom-right
3. Chat window should open with welcome message
4. Try quick questions or type your own

### Test Messages
Try these messages to test different intents:
- "Hi" → Should greet you
- "How can I track my order?" → Shipping info
- "What is your return policy?" → Return policy
- "What payment methods do you accept?" → Payment info
- "How do I create an account?" → Account info
- "Something random" → Default response with available topics

### Verify Chat Storage
1. Backend logs should show: POST /api/chatbot/message 200
2. Check database:
   ```javascript
   db.chatmessages.find().pretty()
   ```

3. Expected fields:
   - `sessionID`: String (unique per session)
   - `userID`: ObjectId or null
   - `message`: User's message
   - `response`: Bot's response
   - `intent`: Detected intent
   - `createdAt`: Date

### Admin Analytics (Admin only)
1. Access: `GET /api/chatbot/analytics`
2. View:
   - Total messages
   - Total sessions
   - Messages by registered vs guest users
   - Intent statistics
   - Messages by date

## Common Issues & Solutions

### Issue: Form doesn't submit
**Solution**: 
- Check browser console for errors
- Verify all required fields are filled
- Email must be in valid format
- Message must be at least 10 characters

### Issue: Modal doesn't open
**Solution**:
- Check browser console
- Verify ContactModal component is imported in HomeScreen
- Check state management for `isContactModalOpen`

### Issue: 500 Error on submission
**Solution**:
- Check backend is running on port 5000
- Verify MongoDB is connected
- Check backend console for detailed error
- Ensure Contact model is properly imported

### Issue: Admin can't see contacts
**Solution**:
- Verify user role is 'admin' or 'staff'
- Check authentication token in localStorage
- Verify route protection in backend

### Issue: Chatbot not responding
**Solution**:
- Check sessionID is being generated
- Verify backend route: POST /api/chatbot/message
- Check browser console and network tab
- Verify ChatMessage model exists

## API Endpoints Quick Reference

### Contact Endpoints
- `POST /api/contact` - Submit contact (Public with optional auth)
- `GET /api/contact` - Get all contacts (Admin/Staff)
- `GET /api/contact/:id` - Get contact by ID (Admin/Staff)
- `GET /api/contact/my-contacts` - Get user's contacts (Authenticated)
- `PUT /api/contact/:id` - Update contact (Admin/Staff)
- `DELETE /api/contact/:id` - Delete contact (Admin)
- `GET /api/contact/stats` - Get statistics (Admin/Staff)

### Chatbot Endpoints
- `POST /api/chatbot/message` - Send message (Public with optional auth)
- `GET /api/chatbot/history/:sessionID` - Get chat history (Public)
- `GET /api/chatbot/sessions` - Get all sessions (Admin/Staff)
- `GET /api/chatbot/analytics` - Get analytics (Admin/Staff)

## Expected Success Response Examples

### Contact Form Success
```json
{
  "success": true,
  "message": "Your message has been submitted successfully. We will get back to you soon.",
  "contact": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Test message",
    "category": "General Inquiry",
    "status": "Open",
    "priority": "Medium",
    "isRegisteredUser": false,
    "userID": null,
    "createdAt": "2026-01-30T...",
    "updatedAt": "2026-01-30T..."
  }
}
```

### Chatbot Message Success
```json
{
  "success": true,
  "response": "We offer multiple shipping options:\n- Standard Shipping: 5-7 business days\n- Express Shipping: 2-3 business days...",
  "intent": "shipping",
  "messageId": "..."
}
```

## Performance Checklist
- [ ] Contact form validates all required fields
- [ ] Email format validation works
- [ ] Success message displays after submission
- [ ] Modal auto-closes after success
- [ ] Guest users can submit without login
- [ ] Registered users see pre-filled form
- [ ] Admin can view all contacts
- [ ] Admin can filter and search contacts
- [ ] Admin can update contact details
- [ ] Chatbot opens and closes properly
- [ ] Chatbot responds to messages
- [ ] Chat messages display correctly
- [ ] Session ID is maintained
- [ ] All data saves to database correctly

✅ **All features tested and working!**
