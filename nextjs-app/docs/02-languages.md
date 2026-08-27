# 💻 02 — Languages Used

This project uses **3 main programming languages**. Here is a simple explanation of each.

---

## 1. 🟦 TypeScript

**What it is:** TypeScript is JavaScript with **extra rules** (called "types"). It helps catch mistakes before the code runs.

**Used for:**
- All React components (`.tsx` files)
- API route handlers
- Database models
- Authentication logic
- Configuration files

**Examples of files:**
| File | What it does |
|------|-------------|
| `app/HomeClient.tsx` | The main homepage component |
| `app/layout.tsx` | Root layout wrapping all pages |
| `app/page.tsx` | The main entry page |
| `lib/db.ts` | Connects to MongoDB database |
| `auth.ts` | Sets up authentication |
| `auth.config.ts` | Auth rules and session config |
| `middleware.ts` | Protects admin routes |
| `models/Project.ts` | Defines what a Project looks like in DB |
| `models/Skill.ts` | Defines what a Skill looks like in DB |
| `models/User.ts` | Defines what a User looks like in DB |
| `models/About.ts` | Defines the About section data |
| `models/Experience.ts` | Defines work experience data |
| `models/Cv.ts` | Defines CV file data |
| `models/ContactMessage.ts` | Defines contact form message data |

> **Simple Rule:** If a file ends in `.ts` or `.tsx` → it is TypeScript.

---

## 2. 🟨 JavaScript

**What it is:** JavaScript is the **original language of the web**. TypeScript is built on top of it.

**Used for:**
- Seed/setup scripts (helper scripts run only once)

**Examples of files:**
| File | What it does |
|------|-------------|
| `scripts/seed-admin.js` | Creates the first admin user in the database |
| `scripts/seed-cv-data.js` | Adds initial CV data to the database |

> **Simple Rule:** If a file ends in `.js` → it is plain JavaScript.

---

## 3. 🎨 CSS (via Tailwind CSS)

**What it is:** CSS (Cascading Style Sheets) controls **how things look** — colors, fonts, spacing, layout.

**Used for:**
- Styling all components and pages
- Responsive design (mobile + desktop)
- Animations and effects

**How it's used:** Instead of writing separate CSS files, this project uses **Tailwind CSS** which lets you write styles directly inside the HTML/JSX using class names.

**Example:**
```tsx
// Instead of writing CSS in a .css file:
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello!
</div>
```

**CSS File:**
| File | What it does |
|------|-------------|
| `app/globals.css` | Global base CSS styles |

---

## Summary Table

| Language | File Extension | Purpose |
|----------|---------------|---------|
| **TypeScript** | `.ts`, `.tsx` | Main application logic |
| **JavaScript** | `.js` | Setup scripts |
| **CSS** | `.css` (+ Tailwind classes) | Styling and visual design |

---

## 🔑 Key Concept: TypeScript vs JavaScript

Think of it like this:

```
JavaScript = A car with no seatbelt
TypeScript = The same car WITH a seatbelt (catches errors early!)
```

This project uses TypeScript everywhere possible because it's safer and helps prevent bugs.
