# 🚀 06 — Setup Guide (Run Locally)

This guide tells you how to get the project running on your computer from scratch.

---

## ✅ Requirements

Before you start, make sure you have these installed:

| Requirement | Version | Download |
|-------------|---------|----------|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | Comes with Node.js | — |
| **MongoDB** | Local or Atlas (cloud) | [mongodb.com](https://mongodb.com) |

---

## 📋 Step-by-Step Setup

### Step 1 — Go to the project folder

```bash
cd nextjs-app
```

### Step 2 — Install all dependencies

```bash
npm install
```

This reads `package.json` and downloads all the libraries into `node_modules/`.

---

### Step 3 — Set up environment variables

Create a file called `.env.local` inside the `nextjs-app/` folder:

```bash
# .env.local

# Your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/adnan-portfolio

# A random secret string (used to sign sessions)
AUTH_SECRET=your-super-secret-key-here

# The URL of your app
NEXTAUTH_URL=http://localhost:3000
```

> 💡 **Tip:** For `AUTH_SECRET`, you can generate a random string with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

### Step 4 — Create the first admin user

Run the seed script once to add yourself as admin:

```bash
node scripts/seed-admin.js
```

This creates a user in MongoDB with:
- **Email:** (defined in the script)
- **Password:** (hashed and stored securely)

---

### Step 5 — Start the development server

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

---

## 🌐 Available Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start the development server (with hot reload) |
| `npm run build` | Build the production version |
| `npm run start` | Start the production server (after build) |
| `npm run lint` | Check code for errors using ESLint |

---

## 📁 File You Must Not Delete

| File | Why It's Important |
|------|--------------------|
| `.env.local` | Contains secret keys — **never delete or share** |
| `package.json` | Lists all dependencies — needed to `npm install` |
| `tsconfig.json` | TypeScript settings — needed to compile code |
| `lib/db.ts` | Database connection — every API route needs it |

---

## ❓ Common Issues & Fixes

### ❌ "MONGODB_URI is not defined"
→ You forgot to create `.env.local`, or the variable name is wrong.

### ❌ "Cannot connect to MongoDB"
→ Make sure MongoDB is running locally, or your Atlas URI is correct.

### ❌ "Unauthorized" on admin pages
→ Make sure you ran `seed-admin.js` and are logging in with the correct email/password.

### ❌ Port 3000 is already in use
→ Run on a different port:
```bash
npm run dev -- -p 3001
```

---

## 🗂️ Project URLs (When Running)

| URL | Page |
|-----|------|
| `http://localhost:3000` | Homepage (public) |
| `http://localhost:3000/login` | Admin login |
| `http://localhost:3000/admin` | Admin dashboard (login required) |
| `http://localhost:3000/admin/projects` | Manage projects |
| `http://localhost:3000/admin/skills` | Manage skills |
| `http://localhost:3000/admin/experiences` | Manage experiences |
| `http://localhost:3000/admin/messages` | View contact messages |
| `http://localhost:3000/api/data` | Public API — portfolio data |
| `http://localhost:3000/api/contact` | Public API — contact form |
