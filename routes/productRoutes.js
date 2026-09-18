import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";

import {
  getAllProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Products route hit:", req.method, req.originalUrl);
  next();
});

// PUBLIC ROUTES

router.get("/", getAllProducts);

router.get("/category/:categoryId", getProductsByCategory);

router.get("/:id", getProductById);

// PROTECTED ROUTES

router.post("/", firebaseAuth, createProduct);

router.put("/:id", firebaseAuth, updateProduct);

router.delete("/:id", firebaseAuth, deleteProduct);

export default router;