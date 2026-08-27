# 🛠️ 03 — Tools and Libraries

A **library** or **tool** is pre-built code that helps you do things faster without writing everything from scratch.

Think of it like a **toolbox** 🧰 — you don't build a hammer yourself, you just pick it up and use it.

---

## 🏗️ Core Framework

### Next.js (v16.3.0)
- **What it is:** The main framework that runs the whole website
- **Why it's used:** It handles both the **frontend** (what users see) and **backend** (API/server) in one place
- **Think of it as:** The engine of the car 🚗
- **Website:** [nextjs.org](https://nextjs.org)

---

## ⚛️ UI / Frontend

### React (v19.2.8)
- **What it is:** A library for building UI (buttons, cards, forms, etc.)
- **Why it's used:** Next.js is built on top of React
- **Think of it as:** The building blocks (like LEGO bricks) for the UI
- **Website:** [react.dev](https://react.dev)

### React DOM (v19.2.8)
- **What it is:** The part of React that talks to the browser
- **Why it's used:** Renders React components into the actual webpage
- **Think of it as:** The translator between React and the browser

### Tailwind CSS (v4)
- **What it is:** A CSS styling framework
- **Why it's used:** Makes it easy to style components with short class names instead of writing long CSS
- **Think of it as:** Pre-made clothing patterns — you just pick the style you want
- **Example:** `className="text-white bg-blue-600 rounded-xl"`
- **Website:** [tailwindcss.com](https://tailwindcss.com)

---

## 🗄️ Database

### MongoDB
- **What it is:** A **NoSQL database** — stores data in a format similar to JSON
- **Why it's used:** Stores all portfolio data: projects, skills, experiences, CVs, users, messages
- **Think of it as:** A big filing cabinet where all data lives
- **Website:** [mongodb.com](https://mongodb.com)

### Mongoose (v9.9.1)
- **What it is:** A library that connects Next.js to MongoDB
- **Why it's used:** Makes it easy to define data shapes (called "models") and query the database
- **Think of it as:** The bridge between the app and the database 🌉
- **File:** [`lib/db.ts`](../lib/db.ts)
- **Website:** [mongoosejs.com](https://mongoosejs.com)

---

## 🔐 Authentication (Login System)

### NextAuth v5 (next-auth@5.0.0-beta)
- **What it is:** A library that handles login/logout/sessions
- **Why it's used:** Provides secure admin login with JWT tokens
- **Think of it as:** The security guard at the door 🔒
- **Key Files:**
  - [`auth.ts`](../auth.ts) — Sets up credential login
  - [`auth.config.ts`](../auth.config.ts) — Rules for who can access what
  - [`middleware.ts`](../middleware.ts) — Checks every request for permission
- **Website:** [next-auth.js.org](https://next-auth.js.org)

### bcryptjs (v3.0.3)
- **What it is:** A library that **hashes** (scrambles) passwords
- **Why it's used:** So passwords are never stored as plain text in the database
- **Think of it as:** A paper shredder for passwords — no one can read it back 🔑
- **Example:** `password123` becomes `$2b$10$xyz...abc` in the database

---

## 🔧 Development Tools

### TypeScript (v5)
- **What it is:** Adds type safety to JavaScript
- **Why it's used:** Catches bugs while writing code, before running it
- **Think of it as:** Spell-check for code ✅
- **Config file:** [`tsconfig.json`](../tsconfig.json)

### ESLint (v9)
- **What it is:** A code quality checker
- **Why it's used:** Automatically finds code problems and bad patterns
- **Think of it as:** A grammar checker for code 📝
- **Config file:** [`eslint.config.mjs`](../eslint.config.mjs)

### PostCSS
- **What it is:** A tool that processes CSS files
- **Why it's used:** Required by Tailwind CSS to work properly
- **Think of it as:** A middleman that converts Tailwind classes into real CSS
- **Config file:** [`postcss.config.mjs`](../postcss.config.mjs)

---

## 📦 Package Manager

### npm (Node Package Manager)
- **What it is:** The tool used to install and manage all the libraries above
- **Why it's used:** Downloads and keeps track of every dependency
- **Config file:** [`package.json`](../package.json)
- **Lock file:** `package-lock.json` (exact versions of everything installed)

---

## ✅ Full Tools Summary Table

| Tool / Library | Version | Category | Purpose |
|----------------|---------|----------|---------|
| **Next.js** | 16.3.0 | Framework | Full-stack web framework |
| **React** | 19.2.8 | UI Library | Building user interfaces |
| **React DOM** | 19.2.8 | UI Library | Rendering to browser |
| **Tailwind CSS** | v4 | Styling | Utility-first CSS framework |
| **MongoDB** | (cloud/local) | Database | Storing all app data |
| **Mongoose** | 9.9.1 | Database | MongoDB connection + models |
| **NextAuth** | 5.0.0-beta | Auth | Login / session management |
| **bcryptjs** | 3.0.3 | Security | Password hashing |
| **TypeScript** | 5 | Dev Tool | Type-safe JavaScript |
| **ESLint** | 9 | Dev Tool | Code quality / linting |
| **PostCSS** | — | Dev Tool | CSS processing |
| **npm** | — | Package Manager | Installing dependencies |
