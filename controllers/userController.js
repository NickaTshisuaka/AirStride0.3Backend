import { supabase } from "../config/database.js";

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Never return the password hash
    delete user.passwordHash;
    delete user.password_hash;

    res.json(user);

  } catch (err) {
    console.error("Get user error:", err);

    res.status(500).json({
      error: "Server error fetching user"
    });
  }
};


export const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const allowed = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "profileImg"
    ];

    const updates = {};

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "No valid fields to update"
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .update(updates)
      .eq("email", email)
      .select()
      .single();

    if (error || !user) {
      console.error("Update user error:", error);

      return res.status(404).json({
        error: "User not found"
      });
    }

    // Never return the password hash
    delete user.passwordHash;
    delete user.password_hash;

    res.json(user);

  } catch (err) {
    console.error("Update user error:", err);

    res.status(500).json({
      error: "Server error updating user"
    });
  }
};