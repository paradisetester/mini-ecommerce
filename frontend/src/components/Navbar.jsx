// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `http://localhost:5000${image}`;
};

function Navbar({ searchTerm, onSearchChange }) {
  const { itemsCount } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // load all products once for search
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error("Error fetching products for search:", err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleSelectProduct = (id) => {
    // go to product page
    navigate(`/product/${id}`);
    // clear search + hide dropdown
    onSearchChange("");
    setShowDropdown(false);
  };

  // simple filtering
  const term = searchTerm.trim().toLowerCase();
  const filtered =
    term.length === 0

      ? []
      : allProducts.filter((p) =>
          `${p.name} ${p.category || ""}`.toLowerCase().includes(term)
        );

  // hide dropdown on blur (with small delay to allow click)
  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="nav-left">
          <Link to="/" style={{ textDecoration: "none", color: "#4f46e5" }}>
            StyleSphere
          </Link>
        </div>

        <div className="nav-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => {
              if (term.length > 0) setShowDropdown(true);
            }}
            onBlur={handleBlur}
          />

          {showDropdown && (
            <div className="search-dropdown">
              {filtered.length > 0 ? (
                filtered.map((p) => (
                  <div
                    key={p.id}
                    className="search-item"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectProduct(p.id);
                    }}
                  >
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.name}
                      className="search-item-image"
                    />
                    <div className="search-item-name">{p.name}</div>
                    <div className="search-item-price">${p.price}</div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                  }}
                >
                  "{searchTerm}" not found
                </div>
              )}
            </div>
          )}

        </div>

        <div className="nav-right">
          <Link to="/admin/products/new" className="icon-btn" style={{ marginLeft: 8 }}>
          Admin
        </Link>
          <Link to="/account" className="icon-btn">
            Account
          </Link>
          <Link to="/cart" className="icon-btn">
            Cart ({itemsCount})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
