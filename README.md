# CyberDev Portfolio + Shop (with Admin Dashboard)

A portfolio website with a shop section and a secure admin login to manage
your products (edit name, price, description, and picture for each product).

## What's inside

- `server.js` – the main app (Express server)
- `init-db.js` – run once to create the database, admin login, and starter products
- `views/` – the web pages (home page, login page, admin dashboard)
- `public/` – CSS styles and images (including your profile photo)
- `data/` – where the database file will be created

## Admin Login

- **Phone number:** 09016859242
- **Password:** odosamawn

You can log in at: `yourwebsite.com/admin/login`

⚠️ The password is stored securely (hashed), so even someone looking at the
database file cannot read it directly. However, **anyone who knows the
phone number and password can log in**, so don't share them publicly.

## How to run this (step-by-step)

You need to put this on a hosting service because it requires a server
(it can't run as a plain webpage like the old version).

### Option A: Render.com (recommended, free tier)

1. Create a free account at https://render.com
2. Create a new **Git repository** (e.g. on GitHub) and upload all these files to it
3. On Render, click **New + → Web Service**
4. Connect your GitHub repo
5. Set:
   - **Build Command:** `npm install && node init-db.js`
   - **Start Command:** `npm start`
6. Click **Create Web Service**
7. Wait for it to deploy — Render will give you a live URL like
   `https://your-site.onrender.com`

### Option B: Railway.app (also free tier available)

1. Create account at https://railway.app
2. New Project → Deploy from GitHub repo (upload these files to GitHub first)
3. Railway auto-detects Node.js
4. In settings, set the **Start Command** to: `npm start`
5. Add a **one-time deploy command** or run `node init-db.js` once via the
   Railway shell/console to set up the database
6. Railway gives you a live URL

### Running locally (to test on your own computer first)

If you have Node.js installed on your computer:

```bash
npm install
node init-db.js
npm start
```

Then open `http://localhost:3000` in your browser.

## Using the Admin Dashboard

1. Go to `/admin/login`
2. Enter phone: `09016859242` and password: `odosamawn`
3. You'll see "Welcome, Owner" and your 3 products
4. For each product you can:
   - Upload a new picture ("Update Picture")
   - Remove the current picture ("Remove Picture" — reverts to a placeholder)
   - Edit the name, price, and description, then click "Save Changes"
5. Click "Logout" when done, or "View live website" to see your changes

## Important notes

- **Database file**: `data/shop.db` stores your products and login info.
  Some free hosting plans reset files when the app restarts/sleeps — if you
  notice your edits disappearing after the site sleeps, let me know and I can
  switch this to a hosted database (still free) that doesn't reset.
- **WhatsApp number**: Currently set to `09016859242` (formatted as
  `2349016859242` for WhatsApp links). To change it, search for
  `2349016859242` in `views/index.ejs` and replace it.
- **Changing the admin password**: Edit the `ADMIN_PASSWORD` value in
  `init-db.js` BEFORE running it the first time, or ask me to add a
  "change password" feature to the dashboard.

## File structure

```
portfolio/
├── server.js          ← main server code
├── init-db.js         ← run once to set up database
├── package.json
├── data/
│   └── shop.db         (created automatically)
├── public/
│   ├── css/style.css
│   └── images/
│       ├── profile.jpg
│       ├── product1.svg
│       ├── product2.svg
│       ├── product3.svg
│       └── placeholder.svg
└── views/
    ├── index.ejs        ← public site
    ├── login.ejs         ← admin login
    └── dashboard.ejs     ← admin dashboard
```
