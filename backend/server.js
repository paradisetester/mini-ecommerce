// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

// --------------- PRODUCTS DATA (GLOBAL) ---------------
const products = [
  {
    id: 1,
    name: "Stylish Blue Sneakers",
    price: 89.99,
    oldPrice: 99.99,
    image: "/images/Blue-Sneakers.jpg",
    description: "Comfortable everyday sneakers with a modern design.",
    category: "Shoes",
  },
  {
    id: 2,
    name: "Minimalist Smartwatch",
    price: 199.99,
    oldPrice: 219.99,
    image: "/images/Minimalist-Smartwatch.jpg",
    description: "Track your fitness and notifications in style.",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Comfortable Cotton T-Shirt",
    price: 24.99,
    oldPrice: 29.99,
    image:
      "https://images.pexels.com/photos/7671160/pexels-photo-7671160.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    name: "Noise-Cancelling Headphones",
    price: 149.99,
    oldPrice: 169.99,
    image:
      "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    name: "Classic Leather Wallet",
    price: 39.99,
    oldPrice: 49.99,
    image:
      "https://images.pexels.com/photos/7698740/pexels-photo-7698740.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    name: "Casual Denim Jacket",
    price: 79.99,
    oldPrice: 89.99,
    image:
      "https://images.pexels.com/photos/7671163/pexels-photo-7671163.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 59.99,
    oldPrice: 69.99,
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 8,
    name: "Canvas Backpack",
    price: 64.99,
    oldPrice: 79.99,
    image:
      "https://images.pexels.com/photos/374574/pexels-photo-374574.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// ------------------ ROUTES ------------------

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get single product by ID
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// --------------- PORT CONFIG ---------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
