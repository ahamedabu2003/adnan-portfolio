# ⚙️ 05 — How It Works

This page explains how all the pieces connect together, in simple terms.

---

## 🧩 The Big Picture

```
┌─────────────────────────────────────────────────────┐
│                    BROWSER (User)                   │
│         visits http://localhost:3000                │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP Request
                       ▼
┌─────────────────────────────────────────────────────┐
│              NEXT.JS APP (Server)                   │
│  ┌──────────────┐       ┌─────────────────────┐    │
│  │  Pages (UI)  │       │   API Routes (Data)  │    │
│  │  React/TSX   │◄─────►│   /api/...           │    │
│  └──────────────┘       └──────────┬───────────┘    │
└─────────────────────────────────────┼───────────────┘
                                      │ Mongoose Query
                                      ▼
┌─────────────────────────────────────────────────────┐
│                  MONGODB DATABASE                   │
│  Collections: users, projects, skills, experiences  │
│               aboutsections, cvs, contactmessages  │
└─────────────────────────────────────────────────────┘
```

---

## 🌐 Step-by-Step: What Happens When Someone Visits the Site

### Step 1 — Browser sends a request
Someone types `http://localhost:3000` in their browser.

### Step 2 — Next.js receives the request
The `app/page.tsx` file handles the route `/`.

### Step 3 — Page fetches data from API
The page calls its own API (`/api/data`) to get projects, skills, etc. from MongoDB.

### Step 4 — Data is returned from MongoDB
Mongoose queries the database and returns the stored data.

### Step 5 — React renders the page
The `HomeClient.tsx` component receives the data and renders the full portfolio page.

### Step 6 — Browser displays the page
The HTML, CSS (Tailwind), and JavaScript are sent to the browser and shown to the user.

---

## 🔐 How the Login System Works

```
Admin types email + password
         │
         ▼
NextAuth checks credentials
         │
         ▼
bcryptjs compares password hash in MongoDB
         │
    ┌────┴────┐
    │         │
  MATCH    NO MATCH
    │         │
    ▼         ▼
JWT Token  Show error
created    message
    │
    ▼
Stored in session cookie
    │
    ▼
Admin can access /admin pages
```

---

## 🛡️ How Admin Routes Are Protected

The file [`middleware.ts`](../middleware.ts) runs **on every request** before the page loads.

```
User visits /admin/projects
         │
         ▼
middleware.ts checks:
  - Is user logged in? (has JWT session?)
  - Is user an admin? (is_admin = true?)
         │
    ┌────┴────┐
    │         │
   YES        NO
    │         │
    ▼         ▼
Show page  Redirect to /login
```

---

## 🗄️ How Data Is Saved and Loaded

### Saving Data (Admin creates a new project)

```
Admin fills form → clicks Save
         │
         ▼
POST /api/admin/projects
         │
         ▼
middleware.ts checks auth (must be admin)
         │
         ▼
API route calls dbConnect() → connects to MongoDB
         │
         ▼
Mongoose Project.create({ title, description, ... })
         │
         ▼
Data saved in MongoDB "projects" collection
         │
         ▼
API returns { success: true }
         │
         ▼
UI shows success message ✅
```

### Loading Data (Visitor sees projects)

```
Visitor visits homepage
         │
         ▼
GET /api/data
         │
         ▼
API calls Project.find() via Mongoose
         │
         ▼
MongoDB returns all projects
         │
         ▼
API returns JSON data
         │
         ▼
React renders project cards on page
```

---

## 📬 How the Contact Form Works

```
Visitor fills contact form → submits
         │
         ▼
POST /api/contact   ← Public endpoint (no login required)
         │
         ▼
Mongoose saves message to MongoDB
         │
         ▼
Admin can read messages at /admin/messages
```

---

## 🔑 Environment Variables (`.env.local`)

Some things are **secret** and shouldn't be in the code. They go in `.env.local`:

| Variable | What It Is |
|----------|-----------|
| `MONGODB_URI` | The connection string to your MongoDB database |
| `AUTH_SECRET` | A secret key used to sign JWT session tokens |
| `NEXTAUTH_URL` | The URL of your app (e.g., `http://localhost:3000`) |

> ⚠️ **Never share `.env.local` with anyone!** It contains secret passwords and keys.
