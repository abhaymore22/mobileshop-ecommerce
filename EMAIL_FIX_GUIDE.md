# 🚨 Email Verification Not Working - Fix Guide

## Problem
Emails are not being sent because Gmail is rejecting the credentials with error:
```
Invalid login: 535-5.7.8 Username and Password not accepted
```

## ✅ Solution: Generate New Gmail App Password

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. If not enabled, click **Get Started** and follow the setup

### Step 2: Generate App Password
1. Go back to **Security** page
2. Scroll down to **2-Step Verification**
3. At the bottom, find **App passwords**
4. Click **App passwords**
5. You may need to sign in again
6. Under "Select app", choose **Mail**
7. Under "Select device", choose **Other (Custom name)**
8. Enter: `MobileShop Backend`
9. Click **GENERATE**
10. **IMPORTANT**: Copy the 16-character password immediately
    - It looks like: `abcd efgh ijkl mnop`
    - Note: It has spaces, but you need to remove them

### Step 3: Update Your Code

Open: `backend/config/emailConfig.js`

Replace the password on line 7 with your new app password (remove all spaces):

```javascript
pass: process.env.EMAIL_PASSWORD || 'abcdefghijklmnop'  // Replace with your password
```

**Example:**
- Generated password: `abcd efgh ijkl mnop`
- Use in code: `abcdefghijklmnop` (no spaces!)

### Step 4: Restart Backend Server

```bash
cd backend
# Stop the current server (Ctrl+C)
npm start
```

You should see:
```
✅ Email server is ready to send messages
```

## 🎯 What's Already Fixed

✅ **Login blocked for unverified users**
- Users cannot login until email is verified
- Shows warning message with resend option

✅ **Resend verification email**
- Button appears on login if email not verified
- Can request new verification link

✅ **Professional email templates**
- Verification email with 24-hour expiry
- Welcome email after verification

✅ **User model updated**
- `isEmailVerified` field tracks status
- Verification token with expiry

## 📋 Testing After Fix

1. **Restart backend** - You should see email ready message
2. **Register new user** - Check server logs for "✅ Verification email sent"
3. **Check email inbox** - Look for verification email
4. **Try to login** - Should be blocked with "Please verify your email"
5. **Click resend button** - Should receive new verification email
6. **Click verification link** - Account activated
7. **Login again** - Should work now

## 🔍 Troubleshooting

### Still getting email errors?
1. Make sure 2-Step Verification is enabled
2. Generate a fresh app password
3. Remove ALL spaces from the password
4. Make sure you're using the correct Gmail address
5. Try using a different browser to generate app password

### Email sent but not received?
1. Check spam/junk folder
2. Wait 2-3 minutes (sometimes delayed)
3. Check Gmail account: moreacademyabhaymore@gmail.com
4. Verify email address is correct in registration

### Want to use .env file? (Recommended)
Create `backend/.env` file:
```env
EMAIL_USER=moreacademyabhaymore@gmail.com
EMAIL_PASSWORD=your_app_password_here
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_uri
```

Then the code will automatically use these values.

## 📧 Current Configuration

**Email**: moreacademyabhaymore@gmail.com  
**Status**: Waiting for valid app password  
**Service**: Gmail SMTP  
**Port**: Auto (465 SSL)  

## ⚠️ Important Notes

1. **Never share app password** - It's like your account password
2. **App password expires** - If it stops working, generate new one
3. **Check logs** - Backend console shows if email sent successfully
4. **24-hour expiry** - Verification links expire after 24 hours

Once you update the app password and restart the backend, email verification will work perfectly! 🎉
