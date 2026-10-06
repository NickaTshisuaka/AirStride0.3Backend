import { supabase } from "../config/database.js";

const TABLE = "products";

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("product_id", { ascending: true });

    if (error) {
      console.error("Supabase get products error:", error);
      return res.status(500).json({
        error: "Failed to fetch products",
        details: error.message,
      });
    }

    res.json(data || []);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category_id,
      price,
      description,
      tags,
      inventory_count,
      available_sizes,
      brand,
      material,
      image,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        error: "Name and price are required",
      });
    }

    const product = {
      name,
      category_id: category_id || null,
      price,
      description: description || "",
      tags: tags || [],
      inventory_count: inventory_count ?? 0,
      available_sizes: available_sizes || [],
      brand: brand || "",
      material: material || "",
      image: image || "",
    };

    const { data, error } = await supabase
      .from(TABLE)
      .insert(product)
      .select()
      .single();

    if (error) {
      console.error("Supabase create product error:", error);

      return res.status(500).json({
        error: "Failed to create product",
        details: error.message,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      error: "Failed to create product",
      details: error.message,
    });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("product_id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase get product error:", error);

      return res.status(500).json({
        error: "Error fetching product",
        details: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      error: "Error fetching product",
      details: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = [
      "name",
      "category_id",
      "price",
      "description",
      "tags",
      "inventory_count",
      "available_sizes",
      "brand",
      "material",
      "image",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "No valid fields to update",
      });
    }

    const { data, error } = await supabase
      .from(TABLE)
      .update(updates)
      .eq("product_id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase update product error:", error);

      return res.status(500).json({
        error: "Failed to update product",
        details: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      error: "Failed to update product",
      details: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq("product_id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase delete product error:", error);

      return res.status(500).json({
        error: "Failed to delete product",
        details: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted",
      product: data,
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      error: "Failed to delete product",
      details: error.message,
    });
  }
};