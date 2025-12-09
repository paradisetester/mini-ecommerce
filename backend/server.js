// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

// ------------------ ROUTES ------------------

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create product
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, oldPrice, image, description, category } = req.body;

    const product = new Product({
      name,
      price,
      oldPrice,
      image,
      description,
      category,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// --------------- PORT CONFIG ---------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

