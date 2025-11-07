import React, { useEffect, useState } from "react";
import { getProducts, getCart, setCartItem, removeCartItem, checkout } from "./api";
import ProductGrid from "./components/ProductGrid";
import CartView from "./components/CartView";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [tab, setTab] = useState("shop");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    const [p, c] = await Promise.all([getProducts(), getCart()]);
    setProducts(p);
    setCart(c);
  };

  const addToCart = async (id, qty) => {
    const existing = cart.items.find(i => i.id === id);
    const newQty = (existing?.qty || 0) + qty;

    await setCartItem(id, newQty);
    refresh();
  };

  const updateQty = async (id, qty) => {
    await setCartItem(id, qty);
    refresh();
  };

  const removeItem = async (id) => {
    await removeCartItem(id);
    refresh();
  };

  const handleCheckout = async ({ name, email }) => {
    const cartItems = cart.items.map(i => ({
      productId: i.id,
      qty: i.qty
    }));

    const receiptData = await checkout({ name, email, cartItems });
    setReceipt(receiptData);
    setShowCheckout(false);
    refresh();
  };

  return (
    <div className="container">
      <header className="row between">
        <h2 className="brand">Vibe Cart</h2>

        <nav>
          <button className={tab === "shop" ? "tab active" : "tab"} onClick={() => setTab("shop")}>
            Shop
          </button>
          <button className={tab === "cart" ? "tab active" : "tab"} onClick={() => setTab("cart")}>
            Cart ({cart.items.length})
          </button>
        </nav>
      </header>

      {tab === "shop" && (
        <ProductGrid products={products} onAdd={addToCart} />
      )}

      {tab === "cart" && (
        <>
          <CartView cart={cart} onQty={updateQty} onRemove={removeItem} />
          <div className="row end">
            <button className="primary" onClick={() => setShowCheckout(true)}>
              Checkout
            </button>
          </div>
        </>
      )}

      <CheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSubmit={handleCheckout}
        cart={cart}
      />

      {receipt && (
        <div className="modal" onClick={() => setReceipt(null)}>
          <div className="modal-card">
            <h3>Order Receipt</h3>
            <p><strong>ID:</strong> {receipt.receiptId}</p>
            <p><strong>Total:</strong> ₹{receipt.total}</p>
            <p><strong>Name:</strong> {receipt.name}</p>
            <p><strong>Email:</strong> {receipt.email}</p>
            <p className="meta">{new Date(receipt.timestamp).toLocaleString()}</p>
            <button onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
