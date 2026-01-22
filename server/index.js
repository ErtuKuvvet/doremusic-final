import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005; 
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { products: [], cart: [], orders: [], users: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- MEVCUT API YOLLARI ---

app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id == req.params.id);
  product ? res.json(product) : res.status(404).json({ error: "Ürün yok" });
});

app.get('/api/cart', (req, res) => {
  const db = readDB();
  const guncelSepet = db.cart.map(cartItem => {
    const product = db.products.find(p => p.id == cartItem.id);
    return { ...cartItem, stock: product ? product.stock : 0 };
  });
  res.json(guncelSepet);
});

app.post('/api/cart', (req, res) => {
  const db = readDB();
  const newItem = req.body;
  const productIndex = db.products.findIndex(p => p.id == newItem.id);
  
  if (productIndex === -1) return res.status(404).json({ error: "Ürün yok" });
  if (db.products[productIndex].stock <= 0) return res.status(400).json({ error: "Stok bitti" });

  const existingItem = db.cart.find(item => item.id == newItem.id);
  if (existingItem) existingItem.quantity += 1;
  else db.cart.push({ ...newItem, quantity: 1 });

  db.products[productIndex].stock -= 1;
  writeDB(db);
  res.json(db.cart);
});

app.delete('/api/cart/:id', (req, res) => {
  const db = readDB();
  const id = req.params.id;
  const cartItem = db.cart.find(i => i.id == id);

  if (cartItem) {
    const productIndex = db.products.findIndex(p => p.id == id);
    if (productIndex !== -1) db.products[productIndex].stock += cartItem.quantity;
    db.cart = db.cart.filter(item => item.id != id);
    writeDB(db);
  }
  res.json(db.cart);
});

app.put('/api/cart/:id', (req, res) => {
  const db = readDB();
  const id = req.params.id;
  const { quantity } = req.body;
  const cartItem = db.cart.find(i => i.id == id);
  const productIndex = db.products.findIndex(p => p.id == id);

  if (cartItem && productIndex !== -1) {
    const fark = quantity - cartItem.quantity;
    if (fark > 0 && db.products[productIndex].stock < fark) return res.status(400).json({ error: "Stok yetersiz" });
    db.products[productIndex].stock -= fark;
    cartItem.quantity = quantity;
    writeDB(db);
  }
  res.json(db.cart);
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const newProduct = req.body;
  const lastId = db.products.length > 0 ? Math.max(...db.products.map(p => parseInt(p.id))) : 0;
  newProduct.id = lastId + 1;
  db.products.push(newProduct);
  writeDB(db);
  res.json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.products.findIndex(p => p.id == id);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...req.body };
    writeDB(db);
    res.json(db.products[index]);
  } else {
    res.status(404).json({ error: "Ürün bulunamadı" });
  }
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  if (db.cart.length === 0) return res.status(400).json({ error: "Sepet boş" });

  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    items: [...db.cart],
    total: db.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    user: 'Guest'
  };

  db.orders.push(newOrder);
  db.cart = [];
  writeDB(db);
  res.json({ message: "Sipariş başarılı!", orderId: newOrder.id });
});

// --- YENİ: KULLANICI İŞLEMLERİ (USERS TABLOSU) ---

// Kayıt Ol (Register)
app.post('/api/register', (req, res) => {
  const db = readDB();
  const { ad, soyad, email, sifre, tip } = req.body;

  // E-posta kontrolü
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Bu e-posta zaten kayıtlı!" });
  }

  const newUser = {
    id: Date.now(),
    ad, soyad, email, sifre, tip // Şifreyi şifrelemeden saklıyoruz (Ödev olduğu için)
  };

  db.users.push(newUser);
  writeDB(db);
  res.json({ message: "Kayıt başarılı", user: newUser });
});

// Giriş Yap (Login)
app.post('/api/login', (req, res) => {
  const db = readDB();
  const { email, sifre } = req.body;
  
  const user = db.users.find(u => u.email === email && u.sifre === sifre);
  
  if (user) {
    res.json({ message: "Giriş başarılı", user });
  } else {
    res.status(401).json({ error: "E-posta veya şifre hatalı" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API çalışıyor: http://localhost:${PORT}`);
});