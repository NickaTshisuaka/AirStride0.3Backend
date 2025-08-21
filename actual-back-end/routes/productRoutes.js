import express from "express";
import { getProducts } from "../controllers/productController.js";
import Product from "../models/Product.js"; // <-- ADD THIS LINE
const router = express.Router();

// @desc Get all products
// @route GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // fetches all products from MongoDB
    res.json(products); // sends them as JSON to the frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc Get single product by ID
// @route GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // fetch one product
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
