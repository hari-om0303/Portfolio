# Professional MERN Stack Developer Portfolio — Hari Om Gupta

A premium, production-level, fully responsive, and animated developer portfolio website built using the MERN Stack. Designed specifically for Software Engineering (SDE), backend development, and network engineering opportunities.

## Key Features

- 💻 **Dynamic Content CMS**: Custom Admin Panel (`/admin`) to create, read, update, and delete projects, edit profile information, modify skills, and view/delete inbox contact messages.
- 🔒 **Secure Authorization**: Token-based JWT (JSON Web Token) authentication on backend APIs and browser storage with password hashing using `bcryptjs`.
- 🛡️ **Backend Security Middleware**:
  - `helmet`: Sets secure HTTP headers to prevent standard vulnerabilities.
  - `express-mongo-sanitize`: Prevents NoSQL query injection attacks.
  - `cors`: Properly controls resource sharing between frontend and backend.
  - `express-rate-limit`: Rate limiters protecting contact form submissions (`POST /api/contact`) and admin logins (`POST /api/auth/login`) from brute-force spam.
- 🚀 **Premium Animated UI**:
  - Clean typewriter text animation for roles.
  - Interactive project card hover shadows and layouts.
  - Ambient glowing background floating particles.
  - Custom responsive layout (Mobile, Tablet, Desktop) styled with Tailwind CSS.
  - Smooth page transitions and reveal animations using Framer Motion.
  - Global dark/light theme context.
- 📧 **Contact Form Integration**: Full-stack message collection with optional SMTP email notifications (via Nodemailer).

---

## Folder Structure

```
Portfolio/
├── backend/                  # Node.js + Express.js backend
│   ├── config/               # Database configurations (db.js)
│   ├── controllers/          # MVC Controllers (auth, profile, project, skill, certs, exp, contact)
│   ├── middleware/           # JWT authentication validator
│   ├── models/               # Mongoose database models (User, Profile, Project, Skill, Certificate, Experience, Message)
│   ├── routes/               # API route maps
│   ├── scripts/              # Database seeding script (seed.js)
│   └── server.js             # Express entry point
├── frontend/                 # React.js + Vite + Tailwind CSS frontend
│   ├── public/               # Public assets (resume.pdf, favicon)
│   ├── src/
│   │   ├── components/       # CustomCursor, BackgroundParticles, Navbar, Footer
│   │   ├── context/          # ThemeContext, AuthContext (Axios API instance)
│   │   ├── pages/            # Hero, About, Skills, Projects, Experience, Certifications, Contact, Login, AdminDashboard
│   │   ├── App.jsx           # Global layout, Routing rules, Toaster
│   │   └── main.jsx          # React renderer
│   ├── tailwind.config.js    # Custom Tailwind styling variables
│   └── vite.config.js        # Vite parameters
├── package.json              # Root package.json managing concurrent processes
└── README.md                 # Project guide (this file)
```

---

## Getting Started

### 1. Prerequisites

- **Node.js** (v24.18.0+ or similar)
- **MongoDB Atlas** account (or local MongoDB Community Server)

### 2. Environment Variables

Navigate to the `backend/` directory and configure the environment variables:
1. Copy `.env.example` to `.env`.
2. Open `.env` and fill in your connection details:
   ```env
   # Mandatory: Your MongoDB Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   
   # JWT Secret Key for token encoding
   JWT_SECRET=your_custom_secure_secret_key_here
   
   # Optional: SMTP Credentials for contact form email alerts
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   RECEIVER_EMAIL=hariomgupta0303@gmail.com
   ```

### 3. Install All Dependencies

From the root directory, run the following command to automatically install dependencies for the root, backend, and frontend directories:
```bash
npm run install-all
```

### 4. Seed the Database

Once your `MONGODB_URI` is set in `backend/.env`, populate the database collections with your complete resume details and default admin user credentials by running:
```bash
npm run seed
```
*Note: This creates the default admin user with the email `hariomgupta0303@gmail.com` and password `Hariom@2027`.*

### 5. Running the Application locally

Start both the Node/Express backend API server and the Vite React frontend dev server concurrently:
```bash
npm run dev
```
- **Frontend** runs on: `http://localhost:5173`
- **Backend API** runs on: `http://localhost:5000`

---

## Admin Portal Access

To access the portfolio CMS panel and manage your content:
1. Navigate to `/login` on your portfolio site.
2. Enter the credentials seeded during database initialization:
   - **Email**: `hariomgupta0303@gmail.com`
   - **Password**: `Hariom@2027`
3. Upon successful login, you'll be redirected to the `/admin` CMS dashboard. Here you can edit profile records, perform CRUD operations on projects/skills/certificates, and view or delete message submissions from the contact form.
