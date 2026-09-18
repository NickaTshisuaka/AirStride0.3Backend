import { supabase } from "../config/database.js";

export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Get products error:", error);

      return res.status(500).json({
        error: "Server error fetching products"
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Get products error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", categoryId);

    if (error) {
      console.error("Get products by category error:", error);

      return res.status(500).json({
        error: "Server error fetching products"
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Get products by category error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Get product error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      product_id,
      name,
      description,
      price,
      category_id,
      inventory_count,
      image
    } = req.body;

    if (!product_id || !name || price === undefined || !category_id) {
      return res.status(400).json({
        error: "product_id, name, price, and category_id are required"
      });
    }

    const newProduct = {
      product_id,
      name,
      description: description || "",
      price,
      category_id,
      inventory_count: inventory_count || 0,
      image: image || ""
    };

    const { data, error } = await supabase
      .from("products")
      .insert(newProduct)
      .select()
      .single();

    if (error) {
      console.error("Create product error:", error);

      return res.status(500).json({
        error: "Server error creating product"
      });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Create product error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      category_id,
      inventory_count,
      image
    } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (inventory_count !== undefined) updateData.inventory_count = inventory_count;
    if (image !== undefined) updateData.image = image;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "No valid fields to update"
      });
    }

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("product_id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("Update product error:", error);

      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Update product error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("product_id", id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json({
      message: "Product deleted",
      product: data
    });
  } catch (err) {
    console.error("Delete product error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};