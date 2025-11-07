import React from "react";

export default function CartView({ cart, onQty, onRemove }) {
  return (
    <div>
      {cart.items.length === 0 && (
        <p className="meta">Your cart is empty.</p>
      )}

      {cart.items.map(item => (
        <div key={item.id} className="item">
          <div className="grow">
            <strong>{item.name}</strong>

            <div className="meta">
              ₹{item.price} ×
              <input
                type="number"
                min="0"
                value={item.qty}
                onChange={(e) => onQty(item.id, Number(e.target.value))}
              />
              = ₹{item.lineTotal}
            </div>
          </div>

          <button className="ghost" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="total">Total: ₹{cart.total}</div>
    </div>
  );
}
