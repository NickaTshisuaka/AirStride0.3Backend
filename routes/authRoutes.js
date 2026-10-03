import express from "express";

import {
  signup,
  login,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.put("/password",protect, changePassword);

export default router;