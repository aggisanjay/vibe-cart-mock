import React from "react";

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <img src={p.image} alt={p.name} className="product-img" />

          <h3>{p.name}</h3>

          <div className="row between">
            <span className="price">₹{p.price}</span>
            <button className="primary" onClick={() => onAdd(p.id, 1)}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
