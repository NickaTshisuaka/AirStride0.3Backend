import jwt from "jsonwebtoken";
import { supabase } from "../config/database.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

<<<<<<< HEAD
      // Attach user to requestx
      req.user = await User.findById(decoded.id).select("-password");
=======
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963

    const { data: user, error } = await supabase
      .from("users")
      .select(
        "id, username, email, firstName, lastName, phone, address, profileImg"
      )
      .eq("id", decoded.id)
      .maybeSingle();

    if (error) {
      console.error("Auth user lookup error:", error);

      return res.status(500).json({
        message: "Failed to authenticate user",
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};