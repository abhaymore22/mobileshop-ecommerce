# 🚀 Deployment Guide - MobileShop E-Commerce

This guide will walk you through deploying your e-commerce application to production using free hosting services.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account
- ✅ Vercel account
- ✅ MongoDB Atlas database
- 📧 Email: moreacademyabhaymore@gmail.com
- 🔐 Email App Password: wkbb sibn ovhk azzd

## 🔧 Services We'll Use

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **MongoDB Atlas** | Database | 512MB forever |
| **Cloudinary** | Image Storage | 25GB storage/month |
| **Render** | Backend API | 750 hours/month |
| **Vercel** | Frontend | Unlimited |

---

## Part 1: Setup Cloudinary (Image Storage)

### Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **Sign Up Free**
3. Sign up with Google or email
4. Verify your email

### Step 2: Get Cloudinary Credentials
1. After login, go to **Dashboard**
2. You'll see:
   - **Cloud Name** (e.g., `dxxxxx123`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click to reveal)
3. **Keep these safe** - you'll need them later!

---

## Part 2: Push Code to GitHub

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click **New Repository**
3. Name: `mobileshop-ecommerce`
4. **DO NOT** check "Initialize with README"
5. Click **Create Repository**

### Step 2: Push Your Code
Open terminal in your project folder and run:

\`\`\`bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/mobileshop-ecommerce.git

# Push to GitHub
git branch -M main
git push -u origin main
\`\`\`

---

## Part 3: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Click **Get Started**
3. **Sign up with GitHub** (easiest option)
4. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `mobileshop-ecommerce`
3. Configure:
   - **Name**: `mobileshop-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**

### Step 3: Add Environment Variables
Click **Advanced** → **Add Environment Variable**. Add these:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://abhaymore22_db_user:Swxxy3sINIOD5LGf@mobileshop.64pecnk.mongodb.net/?appName=mobileshop` |
| `JWT_SECRET` | `mobileshop_super_secret_jwt_key_2024` |
| `EMAIL_USER` | `moreacademyabhaymore@gmail.com` |
| `EMAIL_PASSWORD` | `wkbb sibn ovhk azzd` |
| `NODE_ENV` | `production` |
| `CLOUDINARY_CLOUD_NAME` | (your cloud name from Step 2 of Cloudinary setup) |
| `CLOUDINARY_API_KEY` | (your API key from Cloudinary) |
| `CLOUDINARY_API_SECRET` | (your API secret from Cloudinary) |
| `FRONTEND_URL` | (leave empty for now, we'll update this) |

### Step 4: Deploy
1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. Once done, you'll get a URL like: `https://mobileshop-backend.onrender.com`
4. **Copy this URL** - you'll need it!

### Step 5: Update FRONTEND_URL
1. Go back to your Render service
2. Click **Environment**
3. Edit `FRONTEND_URL` and add your Vercel URL (we'll get this in next step)
4. For now, you can leave it or update it later

---

## Part 4: Deploy Frontend to Vercel

### Step 1: Prepare Frontend
1. In your project, create `frontend/.env.production`:

\`\`\`
VITE_API_URL=https://mobileshop-backend.onrender.com
\`\`\`

(Replace with your actual Render URL from Part 3, Step 4)

2. Commit and push:

\`\`\`bash
git add .
git commit -m "Add production environment config"
git push
\`\`\`

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository: `mobileshop-ecommerce`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables
Under **Environment Variables**, add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://mobileshop-backend.onrender.com` |

(Use your actual Render URL)

### Step 4: Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://mobileshop-ecommerce.vercel.app`
4. **Copy this URL**

### Step 5: Update Backend FRONTEND_URL
1. Go back to Render dashboard
2. Open your backend service
3. Go to **Environment**
4. Update `FRONTEND_URL` to your Vercel URL
5. Service will automatically redeploy

---

## Part 5: Verify Deployment

### ✅ Test Backend
Visit: `https://your-backend.onrender.com`

You should see:
\`\`\`json
{
  "message": "Mobile Shop API is running..."
}
\`\`\`

### ✅ Test Frontend
1. Visit your Vercel URL
2. Try to:
   - Browse products
   - Register/Login
   - Add items to cart
   - Check email verification

### ⚠️ First Load May Be Slow
Render's free tier "sleeps" after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

---

## 🔐 Security Notes

**IMPORTANT:** Your credentials are hardcoded in this guide. For better security:

1. **Change JWT_SECRET** to something random:
   \`\`\`bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   \`\`\`

2. **MongoDB Password**: Consider creating a new database user with a stronger password

3. **Never commit `.env` files** to GitHub (already in .gitignore)

---

## 🎯 Common Issues & Solutions

### Backend Shows 503 Error
- **Cause**: Render is waking up from sleep
- **Solution**: Wait 30-60 seconds and refresh

### Images Not Showing
- **Cause**: Cloudinary credentials not set
- **Solution**: Double-check environment variables in Render

### CORS Errors
- **Cause**: FRONTEND_URL not set correctly
- **Solution**: Update FRONTEND_URL in Render to match your Vercel URL

### Email Not Sending
- **Cause**: Gmail app password expired or incorrect
- **Solution**: Generate a new app password from Google Account settings

---

## 🔄 Updating Your App

### Update Backend
\`\`\`bash
# Make changes to backend code
git add .
git commit -m "Update backend"
git push
\`\`\`
Render will automatically redeploy!

### Update Frontend
\`\`\`bash
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push
\`\`\`
Vercel will automatically redeploy!

---

## 📊 Monitoring

### Render Dashboard
- Check logs: **Logs** tab in your service
- Monitor usage: **Metrics** tab
- View deployments: **Events** tab

### Vercel Dashboard
- Analytics: **Analytics** tab
- Logs: **Deployments** → Click deployment → **Logs**

### MongoDB Atlas
- Monitor database: **Metrics** tab
- View connections: **Network Access**

---

## 🎉 You're Live!

Your e-commerce store is now deployed and accessible worldwide! 

**Share your links:**
- 🌐 Frontend: `https://your-app.vercel.app`
- 🔌 API: `https://your-backend.onrender.com`

---

## 📞 Need Help?

If you encounter issues:
1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

Good luck! 🚀
