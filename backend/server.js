import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

import { connectDB } from "./db.js";
import Product from "./models/Product.js";
import CartItem from "./models/CartItem.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

await connectDB();

const DEMO_USER = "demo-user";

/* ---------------- PRODUCTS ---------------- */

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/* ---------------- CART ---------------- */

app.get("/api/cart", async (req, res) => {
  const items = await CartItem.find({ userId: DEMO_USER });

  const products = await Product.find({});
  const map = new Map(products.map(p => [p.id, p]));

  let total = 0;
  const result = items.map(item => {
    const p = map.get(item.productId);
    const lineTotal = p.price * item.qty;
    total += lineTotal;

    return {
      id: p.id,
      name: p.name,
      price: p.price,
      qty: item.qty,
      lineTotal
    };
  });

  res.json({ items: result, total });
});

app.post("/api/cart", async (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || typeof qty !== "number") {
    return res.status(400).json({ error: "productId and qty required" });
  }

  if (qty <= 0) {
    await CartItem.deleteOne({ userId: DEMO_USER, productId });
    return res.json({ ok: true });
  }

  await CartItem.findOneAndUpdate(
    { userId: DEMO_USER, productId },
    { qty },
    { upsert: true }
  );

  res.json({ ok: true });
});

app.delete("/api/cart/:id", async (req, res) => {
  await CartItem.deleteOne({ userId: DEMO_USER, productId: req.params.id });
  res.json({ ok: true });
});

/* ---------------- CHECKOUT ---------------- */

app.post("/api/checkout", async (req, res) => {
  const { name, email, cartItems } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email required" });
  }

  // Calculate total
  const products = await Product.find({});
  const map = new Map(products.map(p => [p.id, p]));

  let total = 0;
  cartItems.forEach(item => {
    const p = map.get(item.productId);
    total += p.price * item.qty;
  });

  const receipt = {
    receiptId: nanoid(8),
    total,
    name,
    email,
    timestamp: new Date().toISOString()
  };

  // Clear cart
  await CartItem.deleteMany({ userId: DEMO_USER });

  res.json(receipt);
});

/* ---------------- START ---------------- */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
});
