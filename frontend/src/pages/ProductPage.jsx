// src/pages/ProductPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const getImageUrl = (image) => {
  if (!image) return "";
  // full external URL (pexels etc.)
  if (image.startsWith("http")) return image;
  // image stored on backend under /images -> prefix with backend origin
  return `http://localhost:5000${image}`;
};

function ProductPage() {
  const { id } = useParams(); // /product/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image || "",
    });
    alert("Added to cart");
  };

  const handleBuyNow = async () => {
    // add item to cart first (so checkout summary has it)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image || "",
    });
    // navigate to checkout page
    navigate("/checkout");
  };


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="section">
        <div className="container">
          <p>Product not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div
        className="container"
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "1.2fr 1fr",
        }}
      >
        <div>
          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: "1.25rem",
                maxHeight: "420px",
                objectFit: "cover",
              }}
              onError={(e) => {
                // fallback if browser can't load image
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, Helvetica, sans-serif' font-size='20'%3ENo image available%3C/text%3E%3C/svg%3E";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "1.25rem",
                backgroundColor: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                fontSize: "0.9rem",
              }}
            >
              No image available
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.8rem" }}>{product.name}</h1>
          <p style={{ color: "#6b7280" }}>{product.category}</p>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontSize: "1.4rem", fontWeight: 700 }}>
              ${product.price}
            </span>
            {product.oldPrice && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#9ca3af",
                  fontSize: "0.95rem",
                }}
              >
                ${product.oldPrice}
              </span>
            )}
          </div>

          <p style={{ lineHeight: 1.5 }}>{product.description}</p>

          <div>
          <button className="secondary-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="primary-btn" onClick={handleBuyNow} style={{marginLeft:"10px"}}>Buy Now</button>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
