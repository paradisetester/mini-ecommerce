// src/components/Hero.jsx
const heroBg = process.env.PUBLIC_URL + "/images/hero.jpg";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay" />
      </div>
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">Your Style, Your Story.</h1>
          <p className="hero-text">
            Discover curated fashion, accessories, and essentials to match your
            everyday vibe.
          </p>
          <button className="primary-btn">Explore Collection</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
