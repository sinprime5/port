// server.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Database ---
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, 'shop.db'));

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4, // 4 hours
    httpOnly: true
  }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- File upload config (for product images) ---
const uploadDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'product_' + req.params.id + '_' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// --- Auth middleware ---
function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  res.redirect('/admin/login');
}

// =====================================================
// PUBLIC ROUTES
// =====================================================

// --- Settings helper ---
function getSettings() {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  rows.forEach(row => settings[row.key] = row.value);
  return settings;
}

// Home page (portfolio + shop)
app.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY id').all();
  const settings = getSettings();
  res.render('index', { products, settings });
});

// =====================================================
// ADMIN ROUTES
// =====================================================

// Login page
app.get('/admin/login', (req, res) => {
  if (req.session.loggedIn) return res.redirect('/admin/dashboard');
  res.render('login', { error: null });
});

// Login form submit
app.post('/admin/login', (req, res) => {
  const { phone, password } = req.body;

  const admin = db.prepare('SELECT * FROM admin WHERE phone = ?').get(phone);

  if (!admin) {
    return res.render('login', { error: 'Invalid phone number or password.' });
  }

  const match = bcrypt.compareSync(password, admin.password_hash);

  if (!match) {
    return res.render('login', { error: 'Invalid phone number or password.' });
  }

  req.session.loggedIn = true;
  req.session.adminPhone = admin.phone;
  res.redirect('/admin/dashboard');
});

// Logout
app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

// Dashboard (protected) - "Welcome Owner"
app.get('/admin/dashboard', requireLogin, (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY id').all();
  const settings = getSettings();
  res.render('dashboard', { products, settings, success: req.query.success || null });
});

// Update social links / contact settings
app.post('/admin/settings/update', requireLogin, (req, res) => {
  const { whatsapp, tiktok, youtube } = req.body;

  const update = db.prepare('UPDATE settings SET value = ? WHERE key = ?');
  update.run(whatsapp, 'whatsapp');
  update.run(tiktok, 'tiktok');
  update.run(youtube, 'youtube');

  res.redirect('/admin/dashboard?success=Social links updated');
});

// Update a product's text fields (name, description, price)
app.post('/admin/product/:id/update', requireLogin, (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  db.prepare('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?')
    .run(name, description, price, id);

  res.redirect('/admin/dashboard?success=Product updated');
});

// Upload / replace a product's image
app.post('/admin/product/:id/image', requireLogin, upload.single('image'), (req, res) => {
  const { id } = req.params;

  if (req.file) {
    const imagePath = '/images/' + req.file.filename;
    db.prepare('UPDATE products SET image = ? WHERE id = ?').run(imagePath, id);
  }

  res.redirect('/admin/dashboard?success=Image updated');
});

// Remove a product's image (revert to placeholder)
app.post('/admin/product/:id/image/remove', requireLogin, (req, res) => {
  const { id } = req.params;
  db.prepare('UPDATE products SET image = ? WHERE id = ?')
    .run('/images/placeholder.svg', id);

  res.redirect('/admin/dashboard?success=Image removed');
});

// =====================================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
