# BuildMyFolio

A full-stack portfolio builder that lets developers and creatives create and publish professional portfolios in minutes — no coding or design skills required.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Templates](#templates)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [File Uploads](#file-uploads)
- [Admin Panel](#admin-panel)

---

## Overview

BuildMyFolio is a MERN-stack application where users sign up, pick a portfolio template, fill out a guided multi-section form, and instantly get a public shareable URL. Every template is a standalone React component that renders the user's data — no separate deployment needed per portfolio.

**Live flow:**
1. User signs up (email/password or Google OAuth)
2. Picks a template from the gallery
3. Fills in sections (hero, projects, skills, experience, contact, etc.)
4. Reviews and publishes — gets a live URL at `/p/:slug`

---

## Features

- **11 portfolio templates** — Dark, light, glassmorphism, terminal, creative, professional styles
- **Dynamic form builder** — Each template defines its own JSON schema; forms generate automatically
- **Live public portfolios** — Unique slug-based URLs, publicly accessible without login
- **Image & resume uploads** — Cloudinary-backed, supports JPG/PNG/WebP and PDF
- **Google OAuth** — One-click sign-in alongside email/password
- **JWT authentication** — HttpOnly cookie-based sessions
- **Admin panel** — Upload and manage templates without touching code
- **Dark / light mode toggle** — Persisted to localStorage, respects OS preference on first load
- **Orbital template carousel** — Landing page shows live template previews rotating in a circle
- **Responsive** — All pages and templates are mobile-friendly

---

## Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Express 5 | HTTP server and routing |
| Mongoose 9 | MongoDB ODM |
| jsonwebtoken | JWT generation and verification |
| bcryptjs | Password hashing |
| cookie-parser | HttpOnly cookie management |
| multer + multer-storage-cloudinary | File upload pipeline |
| cloudinary | Image and resume cloud storage |
| google-auth-library | Google OAuth token verification |
| uuid | Unique portfolio slug generation |
| nodemon | Dev server with auto-reload |

### Frontend
| Package | Purpose |
|---|---|
| React  | UI framework and build tool |
| React Router | Client-side routing |
| Tailwind CSS  | Utility-first styling for app pages |
| styled-components | Used inside some portfolio templates |
| MUI (Material UI) | Used inside some portfolio templates |
| react-icons | Icon library |
| nprogress | Top progress bar on form submissions |

---

## Templates

Each template is a self-contained React component in `Frontend/src/Pages/Portfolios/` and a matching JSON schema in `Frontend/src/Pages/Data/`.

| Name | Style | Accent Color | Special Features |
|---|---|---|---|
| **Dev** | Monospace / terminal | `#00FF88` green | Typing animation, VS Code-style code block hero |
| **NeonStack** | Cyberpunk dark | `#00FF00` neon | MUI Timeline for experience, modal project cards |
| **AuroraStudio** | Aurora gradient | Multi-color | Studio-style layout |
| **Canvas** | Minimal light | Neutral | Clean canvas aesthetic |
| **Folio** | Classic | Blue | Traditional portfolio layout |
| **NeonOS** | OS-inspired dark | Neon | Desktop OS-like interface |
| **PrismaFolio** | Prismatic | Multi-gradient | Color-shifting design |
| **TerminalDev** | Full terminal | `#00FF00` | CLI-style interface |
| **Lumina** | Glassmorphism dark | `#8B5CF6` violet / `#EC4899` pink | Floating gradient orbs, glassmorphic cards, scroll reveal |
| **Obsidian** | Premium dark | `#F59E0B` amber | Animated cycling roles, vertical timeline, amber accents |
| **Breeze** | Clean professional | `#0D9488` teal | Two-column hero, circular profile photo, split contact section |

---

## Project Structure

```
BuildMyFolio/
├── Backend/
│   ├── Config/
│   │   ├── cloudinary.js        # Cloudinary SDK setup
│   │   └── connect.js           # MongoDB connection
│   ├── Controller/
│   │   ├── Google.js            # Google OAuth handler
│   │   ├── Portfolio.js         # Portfolio CRUD logic
│   │   ├── Template.js          # Template CRUD logic
│   │   └── User.js              # Auth logic (signup, login, logout, /me)
│   ├── Middleware/
│   │   ├── Admin.js             # Checks isAdmin flag on JWT payload
│   │   ├── Auth.js              # Verifies JWT from cookie
│   │   └── Upload.js            # Multer + Cloudinary storage config
│   ├── Model/
│   │   ├── Portfolio.js         # Portfolio schema
│   │   ├── Template.js          # Template schema
│   │   └── User.js              # User schema
│   ├── Routes/
│   │   ├── Google.js            # POST /auth/google
│   │   ├── Portfolio.js         # CRUD /portfolio/*
│   │   ├── Template.js          # CRUD /template/*
│   │   ├── Upload.js            # POST /upload, /upload/resume
│   │   └── User.js              # POST /signup, /login, /logout, GET /me
│   ├── Utils/
│   │   └── Auth.js              # JWT sign/verify helpers
│   └── server.js                # Express app entry point
│
└── Frontend/
    ├── src/
    │   ├── Pages/
    │   │   ├── Context/
    │   │   │   ├── AuthContext.jsx      # Auth context definition
    │   │   │   ├── AuthProvider.jsx     # Auth state + /me fetch on load
    │   │   │   └── ThemeContext.jsx     # Dark/light mode context + localStorage
    │   │   ├── Data/                    # JSON schemas (one per template)
    │   │   │   └── *.json
    │   │   ├── Portfolios/             # Template React components
    │   │   │   └── *.jsx
    │   │   ├── CreatePortfolio.jsx     # Multi-step form to create a portfolio
    │   │   ├── Dashboard.jsx           # User portfolio management
    │   │   ├── EditPortfolio.jsx       # Multi-step form to edit a portfolio
    │   │   ├── LandingPage.jsx         # Public landing page with orbital carousel
    │   │   ├── Login.jsx               # Login page
    │   │   ├── ProtectedRoutes.jsx     # Auth guard wrapper
    │   │   ├── PublicPortfolio.jsx     # Public portfolio renderer by slug
    │   │   ├── Signup.jsx              # Signup page
    │   │   ├── Template.jsx            # Template picker gallery
    │   │   └── UploadTemplate.jsx      # Admin template upload page
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── AppNavbar.jsx       # Shared navbar for app pages
    │   │   │   ├── GoogleButton.jsx    # Google OAuth button
    │   │   │   ├── PageShell.jsx       # Loading / error full-screen states
    │   │   │   ├── Spinner.jsx         # Loading spinner
    │   │   │   └── ThemeToggle.jsx     # Sun/moon toggle button
    │   │   └── forms/
    │   │       └── FieldRenderer.jsx   # Renders any field type from JSON schema
    │   ├── App.jsx                     # Route definitions
    │   ├── index.css                   # Global styles + Tailwind + keyframes
    │   └── main.jsx                    # App entry point, providers
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Google Cloud project with OAuth 2.0 credentials

### 1. Clone the repo

```bash
git clone https://github.com/Wasiqashfaq23/BuildMyFolio
cd BuildMyFolio
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Copy the example env and fill in your values:

```bash
cp .env.example .env
```

Then start the server:

```bash
npm start
```

### 3. Frontend setup

```bash
cd Frontend
npm install
```

Copy the example env and fill in your values:

```bash
cp .env.example .env
```

Then start the dev server:

```bash
npm run dev
```

---

## Environment Variables

Example files are provided — copy them and fill in your own values:

```bash
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
```

### Backend — `Backend/.env.example`

```env
PORT=8001
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/buildmyfolio
JWT_SECRET=your_jwt_secret_here
FRONTEND_URI=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OAUTH_CLIENT_ID=your_google_oauth_client_id
```

### Frontend — `Frontend/.env.example`

```env
VITE_API_URL=http://localhost:8001
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

---

## API Reference

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | — | Register with email + password |
| `POST` | `/login` | — | Login, sets HttpOnly JWT cookie |
| `POST` | `/logout` | — | Clears cookie |
| `GET` | `/me` | Cookie | Returns current user |
| `POST` | `/auth/google` | — | Google OAuth login/signup |

### Portfolios

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/portfolio` | Cookie | Create portfolio (max 3 per user) |
| `GET` | `/portfolio/all` | Cookie | Get all portfolios for current user |
| `GET` | `/portfolio/id/:id` | Cookie | Get portfolio by MongoDB ID |
| `PUT` | `/portfolio/:id` | Cookie | Update portfolio content |
| `DELETE` | `/portfolio/:id` | Cookie | Delete portfolio |
| `GET` | `/portfolio/:slug` | — | Get public portfolio by slug |

### Templates

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/template` | — | Get all active templates |
| `GET` | `/template/:id` | — | Get single template |
| `POST` | `/template` | Admin | Create template (with image upload) |
| `PUT` | `/template/:id` | — | Update template |
| `DELETE` | `/template/:id` | — | Delete template |

### Uploads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/upload` | Cookie | Upload image (JPG/PNG/WebP, max 10MB) |
| `POST` | `/upload/resume` | Cookie | Upload resume PDF (max 5MB) |

---

## Authentication

Authentication uses **JWT tokens stored in HttpOnly cookies**. On login or signup, the server sets a `token` cookie. All protected routes read and verify this cookie via the `Auth` middleware.

**Google OAuth** uses `google-auth-library` on the backend to verify the `credential` token sent from the frontend's Google Identity Services button. On success, it finds or creates a user and issues the same JWT cookie.

---

## File Uploads

All uploads are handled by **Multer** with **Cloudinary** as the storage backend.

- **Images** (`POST /upload`) — Accepts JPG, PNG, WebP up to 10MB. Returns a Cloudinary URL stored in portfolio `userData`.
- **Resumes** (`POST /upload/resume`) — Accepts PDF up to 5MB. Returns a Cloudinary URL stored in portfolio `userData`.

The Cloudinary config lives in `Backend/Config/cloudinary.js` and the Multer pipeline in `Backend/Middleware/Upload.js`.

---

## Admin Panel

Users with `isAdmin: true` in the database can access `/admin/template/upload` to add new templates.

To make a user admin, manually set `isAdmin: true` in MongoDB for that user document.

When uploading a template, the `portfolioType` field must exactly match the filename of the corresponding JSX component in `Frontend/src/Pages/Portfolios/` (e.g. `Lumina` maps to `Lumina.jsx`) and the JSON schema in `Frontend/src/Pages/Data/` (e.g. `Lumina.json`).

### Adding a New Template

1. Create `Frontend/src/Pages/Data/YourTemplate.json` — define the sections and fields schema
2. Create `Frontend/src/Pages/Portfolios/YourTemplate.jsx` — build the React component that accepts `{ data }` prop
3. Log in as admin, go to `/admin/template/upload`, fill in the form with `portfolioType: "YourTemplate"`
4. The template appears in the gallery immediately

---

Made by **Wasiq Ashfaq**
