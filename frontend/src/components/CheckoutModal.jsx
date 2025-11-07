import React, { useState } from "react";

export default function CheckoutModal({ open, onClose, onSubmit, cart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card checkout-card">
        <h2 className="checkout-title">Checkout</h2>

        <form onSubmit={submit} className="checkout-form">
          <div className="field">
            <label className="field-label">Full Name</label>
            <input
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="field">
            <label className="field-label">Email Address</label>
            <input
              className="field-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="row between checkout-actions">
            <button
              type="button"
              className="ghost checkout-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary checkout-pay">
              Pay ₹{cart.total}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
