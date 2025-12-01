// src/components/Navbar.jsx
function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="nav-left">StyleSphere</div>

        <div className="nav-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
          />
        </div>

        <div className="nav-right">
          <button className="icon-btn">Account</button>
          <button className="icon-btn">Cart (0)</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
