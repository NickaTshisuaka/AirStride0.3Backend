import bcrypt from "bcryptjs";
import { supabase } from "../config/database.js";

export const signup = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, phone, address } =
      req.body;

    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Username, password, firstName, and lastName are required",
      });
    }

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id, username")
      .eq("username", username)
      .maybeSingle();

    if (checkError) {
      console.error("Username check error:", checkError);

      return res.status(500).json({
        error: "Server error checking username",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        error: "Username already taken",
      });
    }

    // Hash password before storing it
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      firstName,
      lastName,
      email: email || "",
      phone: phone || "",
      address: address || "",
      profileImg: "",
      passwordHash,
    };

    const { data: user, error: insertError } = await supabase
      .from("users")
      .insert(newUser)
      .select()
      .single();

    if (insertError) {
      console.error("Signup database error:", insertError);

      return res.status(500).json({
        error: "Server error creating user",
      });
    }

    // Never send the password hash to the frontend
    delete user.passwordHash;
    delete user.password_hash;

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    console.error("Signup error:", err);

    res.status(500).json({
      error: "Server error during signup",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "username and password required",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error("Login database error:", error);

      return res.status(500).json({
        error: "Server error during login",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const storedPasswordHash = user.passwordHash || user.password_hash;

    if (!storedPasswordHash) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const ok = await bcrypt.compare(password, storedPasswordHash);

    if (!ok) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Never send password hash
    delete user.passwordHash;
    delete user.password_hash;

    res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      error: "Server error during login",
    });
  }
};
