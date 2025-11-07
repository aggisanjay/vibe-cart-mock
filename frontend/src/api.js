const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const getProducts = () =>
  fetch(`${API}/api/products`).then(res => res.json());

export const getCart = () =>
  fetch(`${API}/api/cart`).then(res => res.json());

export const setCartItem = (productId, qty) =>
  fetch(`${API}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty })
  }).then(res => res.json());

export const removeCartItem = (id) =>
  fetch(`${API}/api/cart/${id}`, { method: "DELETE" }).then(res => res.json());

export const checkout = (payload) =>
  fetch(`${API}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => res.json());
