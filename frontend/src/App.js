import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar"; 
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AdminAddProduct from "./pages/AdminAddProduct";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App-root">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CategorySection />
              <FeaturedProducts  searchTerm={searchTerm} />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/products/new" element={<AdminAddProduct />} />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
