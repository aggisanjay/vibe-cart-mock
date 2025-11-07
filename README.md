# Vibe Cart – Full Stack Mock E-Commerce Cart

A clean, minimal full-stack shopping cart built as part of the Vibe Commerce internship assignment.

✅ React (Vite) – Frontend  
✅ Node.js + Express – Backend  
✅ MongoDB (Atlas) – Full persistence  
✅ REST APIs  
✅ Add/Update/Remove cart items  
✅ Checkout flow with receipt modal  
✅ Responsive “Minimal Pro” UI  

---

## 🚀 Features

### ✅ Products
- 8 mock branded Vibe Commerce items  
- Loaded from MongoDB (seeded automatically)  
- Stored in `products` collection  

### ✅ Cart
- Add “Vibe” products to cart  
- Update quantity  
- Remove items  
- Auto-updated totals  
- Stored in `cart` collection (per mock user)

### ✅ Checkout
- Name + email required  
- Generates receipt with:
  - `receiptId`
  - `total`
  - `timestamp`
  - `name`
  - `email`
- Cart clears after checkout

### ✅ UI
- Modern “Minimal Pro” styling  
- Fully responsive  
- Clean modal  
- Smooth input experience  

---

## 📁 Project Structure

## 🛠️ Setup Instructions

### ✅ 1. Clone Repository

git clone https://github.com/<your-username>/vibe-cart.git
cd vibe-cart

🔧 Backend Setup (Node + Express + MongoDB)
✅ 2. Move into backend
cd backend

✅ 3. Install dependencies
npm install

✅ 4. Create .env
PORT=4000
CORS_ORIGIN=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vibecart


✅ Replace with your real MongoDB Atlas URI
✅ Ensure the DB name is included at the end (/vibecart)

✅ 5. Start backend
npm run dev


When running for the first time:
✅ Products auto-seed into MongoDB
✅ You will see:

✅ MongoDB connected
🌱 Seeding products...


Backend runs at:
👉 http://localhost:4000

🎨 Frontend Setup (React + Vite)
✅ 1. Move into frontend
cd frontend

✅ 2. Install
npm install

✅ 3. Run
npm run dev


Frontend runs at:
👉 http://localhost:5173

🖼️ Screenshots

<img width="466" height="308" alt="image" src="https://github.com/user-attachments/assets/f2b0e5f7-796c-4b3f-92a7-07d217c11b94" />
<img width="459" height="300" alt="image" src="https://github.com/user-attachments/assets/21e255b7-3b73-4810-9fb5-e113e9140107" />
<img width="1091" height="355" alt="image" src="https://github.com/user-attachments/assets/7ac27468-84d5-486b-bdc9-a3f753865ca0" />
<img width="1138" height="548" alt="image" src="https://github.com/user-attachments/assets/64c62f9b-19b6-4214-afb4-a599d298c8c1" />
