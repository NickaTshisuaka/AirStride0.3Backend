import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";


// export const signup = async (req, res) => {
//   try {
//     const { username, password, email, firstName, lastName, phone, address } = req.body;

//     if (!username || !password || !firstName || !lastName) {
//       return res.status(400).json({ error: "Username, password, firstName, and lastName are required" });
//     }

//     const usersColl = getDB().collection("users");

//     const exists = await usersColl.findOne({ username });
//     if (exists) return res.status(409).json({ error: "Username already taken" });

//     const passwordHash = await bcrypt.hash(password, 10);

//     const newUser = {
//       username,
//       firstName,
//       lastName,
//       email: email || "",
//       phone: phone || "",
//       address: address || "",
//       profileImg: "",
//       passwordHash,
//       createdAt: new Date(),
//     };

//     const result = await usersColl.insertOne(newUser);
//     delete newUser.passwordHash;
//     newUser._id = result.insertedId;

//     res.status(201).json({ message: "User created", user: newUser });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ error: "Server error during signup" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password)
//       return res.status(400).json({ error: "username and password required" });

//     const user = await getDB().collection("users").findOne({ username });
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const ok = await bcrypt.compare(password, user.passwordHash);
//     if (!ok) return res.status(401).json({ error: "Invalid credentials" });

//     res.json({ message: "Login successful" });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error during login" });
//   }
// };

// what changed, removed the harsh password as firebase already does that
// 

import { supabase } from "../config/database.js";

export const signup = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      phone,
      address,
      profileImg
    } = req.body;

    if (!username || !firstName || !lastName) {
      return res.status(400).json({
        error: "Username, firstName, and lastName are required"
      });
    }

    const firebaseUid = req.user.uid;
    const email = req.user.email || "";

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id, username")
      .eq("username", username)
      .maybeSingle();

    if (checkError) {
      console.error("Username check error:", checkError);

      return res.status(500).json({
        error: "Server error checking username"
      });
    }

    if (existingUser) {
      return res.status(409).json({
        error: "Username already taken"
      });
    }

    const { data: existingFirebaseUser, error: firebaseCheckError } =
      await supabase
        .from("users")
        .select("id")
        .eq("firebase_uid", firebaseUid)
        .maybeSingle();

    if (firebaseCheckError) {
      console.error(
        "Firebase user check error:",
        firebaseCheckError
      );

      return res.status(500).json({
        error: "Server error checking Firebase user"
      });
    }

    if (existingFirebaseUser) {
      return res.status(409).json({
        error: "User profile already exists"
      });
    }

    const newUser = {
      firebase_uid: firebaseUid,
      username,
      firstName,
      lastName,
      email,
      phone: phone || "",
      address: address || "",
      profileImg: profileImg || ""
    };

    const { data: user, error: insertError } = await supabase
      .from("users")
      .insert(newUser)
      .select()
      .single();

    if (insertError) {
      console.error("Signup database error:", insertError);

      return res.status(500).json({
        error: "Server error creating user profile"
      });
    }

    res.status(201).json({
      message: "User profile created",
      user
    });

  } catch (err) {
    console.error("Signup error:", err);

    res.status(500).json({
      error: "Server error during signup"
    });
  }
};


export const login = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("firebase_uid", firebaseUid)
      .maybeSingle();

    if (error) {
      console.error("Login database error:", error);

      return res.status(500).json({
        error: "Server error during login"
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User profile not found"
      });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      error: "Server error during login"
    });
  }
};
