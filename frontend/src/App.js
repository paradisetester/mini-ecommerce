import "./App.css";
import Navbar from "./components/Navbar"; 
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <CategorySection/>
      <FeaturedProducts/>
      <Footer/>
    </div>
  );
}

export default App;
