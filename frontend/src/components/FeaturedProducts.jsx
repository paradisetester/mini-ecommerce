import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `http://localhost:5000${image}`;
};

function FeaturedProducts({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
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

  const term = searchTerm.trim().toLowerCase();
  const filteredProducts = term
    ? products.filter((p) =>
        `${p.name} ${p.category || ""}`.toLowerCase().includes(term)
      )
    : products;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        {filteredProducts.length === 0 ? (
          <p>No products found for “{searchTerm}”.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <article key={p.id} className="product-card">
                <Link
                  to={`/product/${p.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {p.image && (
                    <div className="product-image-wrapper">
                      <img src={getImageUrl(p.image)} alt={p.name} />
                    </div>
                  )}
                  <div className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-prices">
                      <span className="price">${p.price}</span>
                      {p.oldPrice && (
                        <span className="old-price">${p.oldPrice}</span>
                      )}
                    </div>
                    <button
                      className="secondary-btn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          qty: 1,
                          image: p.image || "",
                        });
                        alert(`${p.name} added to cart`);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
