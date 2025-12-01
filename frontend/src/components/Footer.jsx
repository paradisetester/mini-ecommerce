// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-logo">StyleSphere</div>
          <p className="footer-text">
            Discover the latest trends and curated essentials for your everyday
            lifestyle.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>Shoes</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Electronics</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} StyleSphere. All rights reserved.</span>
        <div className="footer-socials">
          <span>FB</span>
          <span>IG</span>
          <span>X</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
