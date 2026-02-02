# Quick Deployment Checklist

## ✅ Pre-Deployment Completed
- [x] Migrated to Cloudinary for image storage
- [x] Updated all image URLs to support Cloudinary
- [x] Removed local file storage from backend
- [x] Created environment variable templates
- [x] Updated frontend to use dynamic API URL

## 📝 What You Need To Do

### 1. Create Accounts (5 minutes)
- [ ] Cloudinary account → Get credentials
- [ ] Render account (sign up with GitHub)

### 2. Push to GitHub (2 minutes)
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/mobileshop-ecommerce.git
git push -u origin main
\`\`\`

### 3. Deploy Backend to Render (10 minutes)
- [ ] Create new Web Service
- [ ] Connect GitHub repo
- [ ] Set root directory: `backend`
- [ ] Add environment variables (see DEPLOYMENT_GUIDE.md)
- [ ] Deploy and copy URL

### 4. Deploy Frontend to Vercel (5 minutes)
- [ ] Import GitHub repo
- [ ] Set root directory: `frontend`
- [ ] Add VITE_API_URL environment variable
- [ ] Deploy and copy URL

### 5. Final Configuration (2 minutes)
- [ ] Update FRONTEND_URL in Render
- [ ] Test the application

## 🔑 Environment Variables Quick Reference

### Backend (Render)
\`\`\`
MONGO_URI=mongodb+srv://abhaymore22_db_user:Swxxy3sINIOD5LGf@mobileshop.64pecnk.mongodb.net/?appName=mobileshop
JWT_SECRET=mobileshop_super_secret_jwt_key_2024
EMAIL_USER=moreacademyabhaymore@gmail.com
EMAIL_PASSWORD=wkbb sibn ovhk azzd
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=[from cloudinary dashboard]
CLOUDINARY_API_KEY=[from cloudinary dashboard]
CLOUDINARY_API_SECRET=[from cloudinary dashboard]
FRONTEND_URL=[your vercel URL]
\`\`\`

### Frontend (Vercel)
\`\`\`
VITE_API_URL=[your render backend URL]
\`\`\`

## 🎯 Total Time: ~25 minutes

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions.
