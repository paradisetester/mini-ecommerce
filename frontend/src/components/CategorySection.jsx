// src/components/CategorySection.jsx
const shoes = process.env.PUBLIC_URL + "/images/shoes-cat.jpg";
const Cloths = process.env.PUBLIC_URL + "/images/cloths-cat .jpg";
const accessories = process.env.PUBLIC_URL + "/images/accessories.jpg";
const electronics = process.env.PUBLIC_URL + "/images/electronics.jpg";

const categories = [
  {
    id: 1,
    name: "Shoes",
    image:shoes
  },
  {
    id: 2,
    name: "Clothing",
    image:Cloths
  },
  {
    id: 3,
    name: "Accessories",
    image:accessories
  },
  {
    id: 4,
    name: "Electronics",
    image:electronics
  },
];

function CategorySection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
