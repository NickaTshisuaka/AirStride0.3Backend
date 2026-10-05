import bcrypt from "bcryptjs";
<<<<<<< HEAD
import { supabase } from "../config/database.js";

export const signup = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, phone, address } =
      req.body;
=======
import jwt from "jsonwebtoken";
import { supabase } from "../config/database.js";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const signup = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
      address,
    } = req.body;
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963

    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Username, password, firstName, and lastName are required",
      });
    }

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

    const token = createToken(user);

    delete user.passwordHash;
    delete user.password_hash;

    return res.status(201).json({
      message: "User created",
<<<<<<< HEAD
=======
      token,
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
      user,
    });
  } catch (err) {
    console.error("Signup error:", err);

<<<<<<< HEAD
    res.status(500).json({
=======
    return res.status(500).json({
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
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

    const storedPasswordHash =
      user.passwordHash || user.password_hash;

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

    const token = createToken(user);

    delete user.passwordHash;
    delete user.password_hash;

    return res.json({
      message: "Login successful",
<<<<<<< HEAD
=======
      token,
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
      user,
    });
  } catch (err) {
    console.error("Login error:", err);

<<<<<<< HEAD
    res.status(500).json({
      error: "Server error during login",
=======
    return res.status(500).json({
      error: "Server error during login",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "New password must be at least 8 characters",
      });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, passwordHash, password_hash")
      .eq("id", req.user.id)
      .maybeSingle();

    if (userError) {
      console.error("Password lookup error:", userError);

      return res.status(500).json({
        error: "Server error",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const storedHash =
      user.passwordHash || user.password_hash;

    if (!storedHash) {
      return res.status(400).json({
        error: "Password authentication is not configured for this account",
      });
    }

    const currentPasswordCorrect = await bcrypt.compare(
      currentPassword,
      storedHash
    );

    if (!currentPasswordCorrect) {
      return res.status(401).json({
        error: "Current password is incorrect",
      });
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      10
    );

    const { error: updateError } = await supabase
      .from("users")
      .update({
        passwordHash: newPasswordHash,
      })
      .eq("id", req.user.id);

    if (updateError) {
      console.error("Password update error:", updateError);

      return res.status(500).json({
        error: "Failed to update password",
      });
    }

    return res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Change password error:", err);

    return res.status(500).json({
      error: "Server error changing password",
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
    });
  }
};
