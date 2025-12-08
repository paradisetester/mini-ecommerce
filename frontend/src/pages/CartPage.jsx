// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeItem, itemsTotal, itemsCount } = useCart();
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/checkout");
  };

  return (
    <main className="section">
      <div className="container">
        <h2 className="section-title">Your Cart</h2>
        {cart.items.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <Link to="/">Return to shop</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
            <div>
              {cart.items.map((it) => (
                <div key={it.id} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid #e5e7eb" }}>
                  <div style={{ width: 120 }}>
                    <img src={it.image?.startsWith("http") ? it.image : `http://localhost:5000${it.image}`} alt={it.name} style={{ width: "100%", borderRadius: 8 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4>{it.name}</h4>
                    <p>${it.price.toFixed(2)}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                      <button onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}>-</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                      <button onClick={() => removeItem(it.id)} style={{ marginLeft: 12 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside style={{ background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 8px 25px rgba(15,23,42,0.04)" }}>
              <h4>Order Summary</h4>
              <p>Items: {itemsCount}</p>
              <p>Subtotal: ${itemsTotal.toFixed(2)}</p>
              <button className="primary-btn" onClick={handleProceed} style={{ marginTop: 12 }}>Proceed to Checkout</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
