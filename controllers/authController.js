import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";


export const signup = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, phone, address } = req.body;

    if (!username || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Username, password, firstName, and lastName are required" });
    }

    // const usersColl = getDB().collection("users");

    // const exists = await usersColl.findOne({ username });
    // if (exists) return res.status(409).json({ error: "Username already taken" });

    const user = await pool.query('SELECT id FROM users WHERE email = $1',[email]);
    if(user.rows.length > 0){
      return res.status(400).json({ error: "Email already exists"});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // const newUser = { 
    //   username,
    //   firstName,
    //   lastName,
    //   email: email || "",
    //   phone: phone || "",
    //   address: address || "",
    //   profileImg: "",
    //   passwordHash,
    //   createdAt: new Date(),
    // };

    // const result = await usersColl.insertOne(newUser);
    // delete newUser.passwordHash;
    // newUser._id = result.insertedId;

    const insertQuery = 'INSER INTO users (email, password_hash) VALUES ($1, $2)';
    await pool.query(insertQuery, [email, passwordHash]);

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "username and password required" });

    // const user = await getDB().collection("users").findOne({ username });
    
    // find user in the table
     

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};
