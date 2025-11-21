import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "../../back-end/src/config/database.js";
import "../../back-end/src/config/firebase.js"; 

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// 🔥 FIX: Required for parsing JSON on ALL requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// START SERVER
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`API running on port ${process.env.PORT}`)
  );
});
