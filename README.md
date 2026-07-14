# 🏫 Premium School Website — Full Stack

A cinematic, glassmorphism-styled school website inspired by top school sites, built with:

- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion + React Router + Axios
- **Backend:** Node.js + Express + JWT (Spring-Boot-style REST API, but in Node as requested)
- **Database:** MySQL

**Important:** The public website works even WITHOUT the backend — it automatically falls back to built-in sample data. You only need MySQL + backend for the login portals (Student / Teacher / Parent / Admin).

---

## 📁 Project structure

```
school-website/
├── frontend/                 # React app (what visitors see)
│   ├── src/
│   │   ├── components/       # Navbar, Footer, Ticker, ChatBot, etc.
│   │   ├── pages/            # Home, About, Academics, Gallery…
│   │   │   └── portals/      # Student / Teacher / Parent / Admin
│   │   ├── context/          # Theme (dark/light) + Auth
│   │   ├── services/api.js   # All API calls (with offline fallback)
│   │   ├── config/school.js  # ⭐ EDIT THIS — name, motto, logo, contacts
│   │   └── data/mockData.js  # Sample content (news, events, gallery…)
├── backend/                  # Express REST API + JWT auth
│   ├── routes/               # auth, marks, attendance, notices…
│   ├── config/db.js          # MySQL connection pool
│   ├── middleware/auth.js    # JWT verification + role guard
│   └── seed.js               # Creates demo accounts & data
├── database/schema.sql       # MySQL tables
└── README.md
```

---

## ✅ STEP-BY-STEP: Run it in VS Code

### Step 0 — Install these once (if you don't have them)
1. **Node.js** (v18 or newer): https://nodejs.org → download LTS → install.
2. **MySQL Community Server** (only needed for the portals): https://dev.mysql.com/downloads/ → remember the root password you set!
3. **VS Code**: https://code.visualstudio.com

### Step 1 — Open the project
1. Unzip `school-website.zip` anywhere (e.g. Desktop).
2. In VS Code: **File → Open Folder…** → choose the `school-website` folder.
3. Open a terminal: **Terminal → New Terminal**.

### Step 2 — Run the WEBSITE (frontend)
```bash
cd frontend
npm install
npm run dev
```
Open the link it prints (usually **http://localhost:5173**). 🎉 The whole public site works right away.

### Step 3 — (Optional) Set up the DATABASE for the portals
1. Start MySQL (it usually runs as a service after installing).
2. In a terminal, from the project root:
```bash
mysql -u root -p < database/schema.sql
```
(Enter your MySQL password when asked. On Windows, use the "MySQL Command Line Client" and run: `source C:/path/to/school-website/database/schema.sql`)

### Step 4 — Run the BACKEND (API server)
Open a **second** terminal (keep the frontend running):
```bash
cd backend
npm install
copy .env.example .env      # Windows   (Mac/Linux: cp .env.example .env)
```
Now open `backend/.env` in VS Code and set `DB_PASSWORD=` to your MySQL password, and change `JWT_SECRET` to any long random text. Then:
```bash
npm run seed     # creates demo users & sample data (run once)
npm run dev      # starts the API on http://localhost:5000
```

### Step 5 — Log in and test the portals
Go to the website → **Portal login** and use:

| Role    | Username  | Password   |
|---------|-----------|------------|
| Student | student1  | student123 |
| Teacher | teacher1  | teacher123 |
| Parent  | parent1   | parent123  |
| Admin   | admin     | admin123   |

**⚠️ Change these passwords before going live** (edit `backend/seed.js` and re-run, or update the `users` table).

---

## 🎨 Make it YOUR school (5 minutes)

1. **Logo & badge:** put your files into `frontend/public/` (e.g. `logo.png`).
2. Open `frontend/src/config/school.js` and change:
   - `name`, `motto`, `established`, `address`, `phone`, `email`
   - `logo: '/logo.png'`
   - social media links, principal's name/photo/message, anthem, stats
3. Replace sample photos in `frontend/src/data/mockData.js` with your own image URLs (or files placed in `frontend/public/`).
4. Google Map: in Google Maps → search your school → Share → Embed a map → copy the `src="..."` URL into `mapEmbed` in `school.js`.

---

## 🌐 STEP-BY-STEP: Hosting (going live)

### Easiest (free): Frontend on Vercel + Backend on Railway

**A. Put the code on GitHub**
1. Create a free account at https://github.com → New repository → name it `school-website`.
2. In VS Code terminal (project root):
```bash
git init
git add .
git commit -m "School website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-website.git
git push -u origin main
```

**B. Host the frontend on Vercel (free)**
1. Go to https://vercel.com → sign in with GitHub → **Add New → Project** → import `school-website`.
2. Set **Root Directory** to `frontend`. Framework: Vite (auto-detected). Click **Deploy**.
3. In 1–2 minutes you get a live URL like `https://yourschool.vercel.app`. ✅ The public site is now online (portals still need the backend).

**C. Host the backend + MySQL on Railway (free trial / cheap)**
1. Go to https://railway.app → sign in with GitHub → **New Project → Deploy from GitHub repo** → pick your repo, set root to `backend`.
2. In the same project: **+ New → Database → MySQL**. Railway gives you host/user/password/database values.
3. In the backend service → **Variables**, add: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `PORT=5000` using Railway's MySQL values.
4. Run the schema + seed once against the Railway database (Railway has a "Query" tab, or connect with MySQL Workbench and paste `database/schema.sql`; then temporarily point your local `backend/.env` at Railway's DB and run `npm run seed`).
5. Copy your backend's public URL (e.g. `https://school-api.up.railway.app`).

**D. Connect frontend → backend in production**
In `frontend/src/services/api.js` change one line:
```js
export const api = axios.create({ baseURL: 'https://YOUR-BACKEND-URL/api', timeout: 6000 })
```
Commit + push — Vercel redeploys automatically.

**E. Custom domain (optional)**
Buy a domain (e.g. from Namecheap or your local registrar) → in Vercel: Project → Settings → Domains → add `www.yourschool.lk` → follow the DNS instructions.

### Alternative hosts
- Frontend: Netlify, Cloudflare Pages, GitHub Pages (all free, same idea).
- Backend + MySQL: Render.com, a $5 VPS (DigitalOcean/Hetzner), or shared hosting with Node support.

---

## 🧰 Included features checklist

Public site: cinematic hero slideshow with Ken Burns effect · logo + motto · animated counters · live notice ticker · principal's message · latest news · upcoming events · quick navigation · interactive history timeline · vision & mission · school anthem · administration · Google map · virtual tour video · grades & streams accordion · academic calendar · exam schedules · sample timetable · teachers directory · sports · clubs & societies · prefects · achievements · gallery with albums + search + lightbox + videos · downloads with filter/search · contact form · 404 page.

Creative extras: dark/light mode · smooth scrolling · page transitions · scroll progress bar · glassmorphism UI · gradient backgrounds · floating gold particles · hover animations · confetti (tap a homepage statistic!) · floating action buttons · weather widget (live, Open-Meteo, no key needed) · site-wide search (magnifier in navbar) · rule-based AI-style chatbot · custom loading animation · fully responsive · reduced-motion support.

Portals: JWT login with roles · Student (marks, grades, report-card print/PDF, attendance %, notices) · Teacher (class list from DB, enter marks, record attendance, publish live notices, upload placeholder) · Parent (child overview, results, attendance, announcements, contact teacher) · Admin (analytics dashboard with charts, enrolment growth, attendance by section, management shortcuts).

## 🔒 Before real students use it
- Change all demo passwords and the `JWT_SECRET`.
- Serve over HTTPS (Vercel/Railway do this automatically).
- Add rate limiting (e.g. `express-rate-limit`) to `/api/auth/login`.
- Back up the MySQL database regularly.
