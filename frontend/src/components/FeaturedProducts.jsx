import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  const getImageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/400x300?text=No+Image";
    }
    // If it's already a full URL (starts with http), use it as is
    if (image.startsWith("http")) {
      return image;
    }
    // Otherwise, prefix backend URL (for /images/Blue-Sneakers.jpg)
    return `${API_BASE_URL}${image}`;
  };
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((p) => (
            <article key={p.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={getImageUrl(p.image)} alt={p.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <div className="product-prices">
                  <span className="price">${p.price.toFixed(2)}</span>
                  {p.oldPrice && (
                    <span className="old-price">
                      ${p.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="secondary-btn">Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
