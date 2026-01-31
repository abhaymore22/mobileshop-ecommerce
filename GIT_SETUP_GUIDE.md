# Mobile Shop - Git Setup Guide

## Step 1: Install Git

### Option A: Download and Install Git
1. Visit: https://git-scm.com/download/win
2. Download the latest version (Git for Windows)
3. Run the installer with default settings
4. **Important**: Restart VS Code after installation

### Option B: Install via Winget (if available)
```powershell
winget install --id Git.Git -e --source winget
```

### Option C: Install via Chocolatey (if available)
```powershell
choco install git
```

---

## Step 2: Configure Git (Run after installation)

Open PowerShell and run these commands:

```powershell
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Navigate to project directory
cd c:\Users\hp\Desktop\Testing1

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Mobile Shop E-commerce Project"
```

---

## Step 3: Create GitHub Repository

### Via GitHub Website:
1. Go to https://github.com/new
2. Repository name: **mobileshop**
3. Description: "Mobile Shop E-commerce Platform"
4. Choose: **Private** or **Public**
5. **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

---

## Step 4: Push to GitHub

After creating the repository on GitHub, run:

```powershell
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mobileshop.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Alternative: Use GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in to GitHub
3. Click "Add" → "Add Existing Repository"
4. Select folder: `c:\Users\hp\Desktop\Testing1`
5. Click "Publish repository"
6. Name it "mobileshop"
7. Click "Publish Repository"

---

## Project Structure

Your project includes:
- ✅ .gitignore file (already created)
- ✅ Backend API with Node.js/Express
- ✅ Frontend with React
- ✅ MongoDB database configurations
- ✅ Product seeding scripts
- ✅ Authentication & Authorization
- ✅ 53 products across 4 categories

---

## Quick Commands Reference

```powershell
# Check git status
git status

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature/new-feature

# Push changes
git add .
git commit -m "Your commit message"
git push
```

---

## Need Help?

After installing Git, come back and I can help you execute the commands!
