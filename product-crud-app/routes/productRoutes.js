// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");  // Correct path to the Product model

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

// POST a new product
router.post("/", async (req, res) => {
  const { name, price, category, inStock } = req.body;

  const newProduct = new Product({ name, price, category, inStock });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send("Error saving product");
  }
});

// Export the router
module.exports = router;
