import { ObjectId } from "mongodb";
import { getDB } from "../config/mongoClient.js";

export const getProductById = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    console.log("Requested Product ID:", id);

    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
