import express from "express";
import { signup, login } from "../controllers/authController.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";

const router = express.Router();

// adding protection to the signing up routes
router.post("/signup", firebaseAuth, signup);
router.post("/login", firebaseAuth, login);

export default router;
