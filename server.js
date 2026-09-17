import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import './config/supabase.js';
import "./config/firebase.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// FORCED DEBUGGING: Paste this at the very top of server.js
process.on('unhandledRejection', (reason, promise) => {
    console.log('🔴 DETECTED HIDDEN REJECTION:', reason);
});

process.on('uncaughtException', (err) => {
    console.log('🔴 DETECTED HIDDEN EXCEPTION:', err);
});

const originalExit = process.exit;
process.exit = function (code) {
    console.log(`⚠️ process.exit(${code}) WAS CALLED BY A DEPENDENCY FROM:`);
    console.log(new Error().stack);
    originalExit(code);
};

dotenv.config();
const app = express();

// CORS
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options(/.*/, cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});



