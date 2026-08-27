# 📖 01 — Project Overview

## What Is This Project?

This is **Adnan's Portfolio Website** — a personal website where Adnan can:

- 🖼️ **Show his projects** to the world
- 💼 **List his skills** (like programming languages, tools, etc.)
- 📄 **Share his CV** (resume) for download
- 👨‍💼 **Show work experience**
- 📬 **Let visitors send contact messages**
- 🔐 **Login as admin** to manage all content

---

## Who Uses This Site?

| User Type | What They Can Do |
|-----------|-----------------|
| **Visitor (anyone)** | View portfolio, skills, projects, experience, download CV, send messages |
| **Admin (Adnan)** | Login, add/edit/delete projects, skills, experiences, CVs, and read messages |

---

## What Type of App Is This?

This is a **Full-Stack Web Application**. That means:

- The **frontend** (what you see) and **backend** (server logic) are in the **same project**
- It uses a **database** to store all data
- It has a **protected admin panel** only accessible with a password

### Simple Diagram

```
Browser (Visitor)
      │
      ▼
Next.js App (Frontend + API)
      │
      ▼
MongoDB Database (Stores all data)
```

---

## Pages in the Website

### Public Pages
| Page | URL | What It Shows |
|------|-----|---------------|
| Home | `/` | Hero, About, Skills, Projects, Experience, Contact |
| Login | `/login` | Admin login form |

### Admin Pages (password protected)
| Page | URL | What It Does |
|------|-----|--------------|
| Dashboard | `/admin` | Overview of all sections |
| Projects | `/admin/projects` | Manage portfolio projects |
| Skills | `/admin/skills` | Manage skill cards |
| Experiences | `/admin/experiences` | Manage work history |
| About | `/admin/about` | Edit the about section |
| CVs | `/admin/cvs` | Upload/manage CV files |
| Messages | `/admin/messages` | Read contact messages |
