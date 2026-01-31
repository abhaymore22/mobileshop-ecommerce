# Quick Start Guide - Contact Form & Chatbot

## 🚀 Quick Setup Verification

### 1. Check Backend is Running
```bash
cd backend
npm start
# Should show: Server running on port 5000
# Should show: MongoDB Connected
```

### 2. Check Frontend is Running
```bash
cd frontend
npm run dev
# Should show: Local: http://localhost:5173
```

### 3. Open Browser
Navigate to: `http://localhost:5173`

---

## 📝 Quick Test - Contact Form (2 Minutes)

### Test as Guest User
1. **Find the Button**: Look at bottom-right corner of homepage
   - Purple gradient button with "Contact Us" text
   
2. **Click Button**: Modal should pop up with form

3. **Fill Form**:
   ```
   Name: Test User
   Email: test@example.com
   Phone: 1234567890 (optional)
   Category: General Inquiry
   Subject: Testing Contact Form
   Message: This is a test message to verify the contact form works correctly.
   ```

4. **Submit**: Click "Send Message"

5. **Verify Success**: 
   - Green success alert appears
   - Message: "Your message has been submitted successfully..."
   - Modal closes after 2 seconds

### Test as Logged-in User
1. **Login** to your account
2. Click **"Contact Us"** button
3. Notice **Name** and **Email** are pre-filled
4. Fill remaining fields and submit
5. Go to **Profile menu → "My Contacts"** to see your submission

---

## 💬 Quick Test - Chatbot (1 Minute)

1. **Find Chat Icon**: Blue circle button at bottom-right (different from Contact button)
2. **Click**: Chat window opens
3. **Type**: "What is your return policy?"
4. **Verify**: Bot responds with return policy information
5. **Try Quick Question**: Click any of the suggested questions
6. **Close**: Click X to close chat

---

## 🔍 Verify Data in Database

### Using MongoDB Compass
1. Connect to your MongoDB instance
2. Navigate to your database (usually `mobileshop` or similar)
3. Check Collections:
   - **contacts** collection should have your submission
   - **chatmessages** collection should have chat history

### Using MongoDB Shell
```javascript
// Connect to your database
use mobileshop

// Check contacts
db.contacts.find().pretty()

// Check chat messages
db.chatmessages.find().pretty()
```

---

## 👨‍💼 Admin Panel Quick Access

### View Submitted Contacts
1. **Login as Admin** (role: 'admin' or 'staff')
2. Click **Profile menu → "Manage Contacts"**
3. You should see all submissions in a table
4. Click **"View"** on any contact to see details and respond

### Update Contact Status
1. In the detail modal:
   - Change **Status** (Open → In Progress → Resolved → Closed)
   - Change **Priority** (Low, Medium, High, Urgent)
   - Add **Response** message
   - Add **Admin Notes** (internal only)
2. Click **"Update Contact"**
3. Changes save immediately

---

## ❓ Troubleshooting Quick Fixes

### Modal Doesn't Open
```javascript
// Check browser console (F12)
// If you see errors, ensure:
1. Bootstrap CSS is loaded
2. Bootstrap Icons are loaded
3. ContactModal component exists
```

### Form Submission Fails
```javascript
// Check these:
1. Backend running? (http://localhost:5000)
2. MongoDB connected?
3. All required fields filled?
4. Email format correct?
5. Message at least 10 characters?
```

### Can't See Submitted Data
```javascript
// For Guests:
- Data is saved but guests can't view it
- Only admins can see all submissions

// For Registered Users:
- Go to Profile → "My Contacts"
- If empty, make sure you're logged in when submitting

// For Admins:
- Ensure user role is 'admin' or 'staff'
- Check /admin/contacts route is accessible
```

### Chatbot Not Responding
```javascript
// Quick checks:
1. Is backend running?
2. Check browser console for errors
3. Verify endpoint: POST /api/chatbot/message
4. Check sessionID is generated (random string)
```

---

## 🎨 Design Features at a Glance

### Contact Button (Homepage)
- **Position**: Fixed bottom-right (30px from edges)
- **Color**: Purple gradient (#667eea → #764ba2)
- **Size**: Large, rounded pill shape
- **Animation**: Scales on hover (1.1x)

### Contact Modal
- **Header**: Gradient background with white text
- **Icons**: Bootstrap Icons for each field
- **Validation**: Real-time with red borders
- **Success**: Green alert, auto-close in 2 seconds

### My Contacts Page (Registered Users)
- **Layout**: Card grid (3 columns on desktop)
- **Badges**: Color-coded status and priority
- **Details**: Click "View Details" for full modal
- **Empty State**: Friendly message with CTA button

### Admin Contact Management
- **Stats Cards**: Total, Open, In Progress, Urgent
- **Filters**: Status, Priority, Category, Search
- **Table**: Sortable with action buttons
- **Update Modal**: Full-screen form with all fields

---

## 📊 Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Click Contact button | Modal opens immediately |
| Fill form as guest | All fields editable |
| Fill form as user | Name/Email pre-filled and locked |
| Submit valid form | Success message, modal closes |
| Submit invalid form | Red borders on invalid fields |
| Click "My Contacts" (logged in) | See list of own submissions |
| Admin views contacts | See all submissions in table |
| Admin updates contact | Changes save and reflect immediately |
| Open chatbot | Welcome message with quick questions |
| Send chat message | Bot responds within 1 second |
| Close chatbot | Session persists (reopen continues) |

---

## ✅ Success Indicators

**You know it's working when:**
- ✅ Purple contact button visible on homepage
- ✅ Modal opens with professional design
- ✅ Form validation works (try submitting empty)
- ✅ Success message appears after submission
- ✅ Data appears in MongoDB
- ✅ Logged-in users see pre-filled form
- ✅ Users can view "My Contacts"
- ✅ Admin can see all contacts in admin panel
- ✅ Chatbot opens and responds
- ✅ No console errors

---

## 🎯 One-Minute Health Check

Run this quick checklist:
1. [ ] Homepage loads
2. [ ] Contact button visible at bottom-right
3. [ ] Click button → Modal opens
4. [ ] Submit form → Success message
5. [ ] Chatbot button visible
6. [ ] Click chat → Window opens
7. [ ] Type message → Bot responds
8. [ ] (If logged in) My Contacts link in menu
9. [ ] (If admin) Manage Contacts link in menu
10. [ ] No errors in browser console (F12)

**All checked? You're good to go! 🎉**

---

## 📞 Next Steps

### For Users
- Submit inquiries anytime (no login required)
- Track your submissions if logged in
- Get responses from support team

### For Admins
- Monitor incoming contacts daily
- Respond to urgent items first
- Update status as you progress
- Use notes for internal tracking

### For Developers
- Add email notifications (future)
- Integrate AI for chatbot (future)
- Add file attachments (future)
- Export contacts to CSV (future)

---

**Need help? The contact form is working - use it! 😊**
