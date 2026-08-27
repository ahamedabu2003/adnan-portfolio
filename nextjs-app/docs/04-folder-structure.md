# 📂 04 — Folder Structure

This explains what every folder and file does in the project.

---

## Root of `nextjs-app/`

```
nextjs-app/
│
├── 📁 app/              ← All pages and API routes live here
├── 📁 lib/              ← Helper files (e.g., database connection)
├── 📁 models/           ← Database models (data shapes)
├── 📁 scripts/          ← One-time setup scripts
├── 📁 public/           ← Static files (images, uploaded files)
├── 📁 docs/             ← 📖 You are here! Documentation folder
│
├── 📄 auth.ts           ← Authentication setup (login logic)
├── 📄 auth.config.ts    ← Auth rules (who can access what)
├── 📄 middleware.ts     ← Protects admin routes from public access
├── 📄 next.config.ts    ← Next.js configuration
├── 📄 tsconfig.json     ← TypeScript configuration
├── 📄 package.json      ← Project info + list of all dependencies
├── 📄 postcss.config.mjs ← PostCSS config (for Tailwind)
├── 📄 eslint.config.mjs ← ESLint config (code quality)
└── 📄 .env.local        ← Secret environment variables (NOT committed to git)
```

---

## 📁 `app/` — The Heart of the Application

```
app/
│
├── 📄 page.tsx          ← Main homepage (loads data, renders HomeClient)
├── 📄 layout.tsx        ← Root HTML layout wrapping every page
├── 📄 HomeClient.tsx    ← Big client-side homepage component (hero, skills, etc.)
├── 📄 globals.css       ← Global CSS styles
│
├── 📁 login/            ← Login page for admin
│   └── page.tsx
│
├── 📁 admin/            ← 🔐 Admin panel (protected — needs login)
│   ├── page.tsx         ← Admin dashboard
│   ├── layout.tsx       ← Admin layout (sidebar + header)
│   ├── 📁 projects/     ← Manage projects
│   ├── 📁 skills/       ← Manage skills
│   ├── 📁 experiences/  ← Manage work experiences
│   ├── 📁 about/        ← Edit about section
│   ├── 📁 cvs/          ← Upload/manage CV files
│   └── 📁 messages/     ← View contact messages
│
└── 📁 api/              ← Backend API routes
    ├── 📁 auth/         ← NextAuth login/logout endpoints
    ├── 📁 contact/      ← Public endpoint to receive contact form data
    ├── 📁 data/         ← Public endpoint to fetch portfolio data
    ├── 📁 setup/        ← One-time setup endpoint
    └── 📁 admin/        ← 🔐 Protected admin CRUD endpoints
```

---

## 📁 `lib/` — Shared Helper Utilities

```
lib/
└── 📄 db.ts             ← Connects the app to MongoDB (reuses connection)
```

**Why `db.ts` is important:**
- MongoDB connections are expensive to open/close
- This file keeps ONE connection open and reuses it
- All API routes import this to access the database

---

## 📁 `models/` — Database Models (Data Shapes)

```
models/
├── 📄 User.ts           ← Admin user (email, password, is_admin flag)
├── 📄 Project.ts        ← Portfolio project (title, description, image, link)
├── 📄 Skill.ts          ← Skill card (name, icon, category)
├── 📄 Experience.ts     ← Work experience (company, role, dates, description)
├── 📄 About.ts          ← About section content (bio, photo)
├── 📄 Cv.ts             ← CV file (filename, upload date)
└── 📄 ContactMessage.ts ← Contact form submission (name, email, message)
```

Each model **defines the shape** of the data stored in MongoDB.

**Example — what a Project looks like:**
```ts
{
  title: "My App",
  description: "A cool project",
  image: "/uploads/project1.png",
  link: "https://github.com/...",
  technologies: ["React", "Node.js"],
  createdAt: "2025-01-01"
}
```

---

## 📁 `scripts/` — One-Time Setup Scripts

```
scripts/
├── 📄 seed-admin.js     ← Creates the first admin user in the database
└── 📄 seed-cv-data.js   ← Seeds initial CV data into the database
```

These are run **manually, just once**, using:
```bash
node scripts/seed-admin.js
```

---

## 📁 `public/` — Static Assets

```
public/
└── 📁 uploads/          ← Uploaded images (project images, CV files, etc.)
```

Files here are **publicly accessible** via URL. For example:
- `public/uploads/photo.jpg` → accessible at `http://localhost:3000/uploads/photo.jpg`

---

## 📁 `docs/` — Documentation (This Folder!)

```
docs/
├── 📄 README.md                  ← Index of all docs
├── 📄 01-overview.md             ← What this project is
├── 📄 02-languages.md            ← Languages used
├── 📄 03-tools-and-libraries.md  ← Tools and libraries
├── 📄 04-folder-structure.md     ← This file!
├── 📄 05-how-it-works.md         ← How everything connects
└── 📄 06-setup-guide.md          ← How to run locally
```
