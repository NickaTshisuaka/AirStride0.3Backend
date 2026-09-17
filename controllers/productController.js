import { supabase } from "../config/database.js";

export const getAllProducts = async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get products error:", error);

      return res.status(500).json({
        error: "Failed to fetch products",
      });
    }

    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);

    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
    };

    const { data: product, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error("Create product error:", error);

      return res.status(500).json({
        error: "Failed to create product",
      });
    }

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);

    res.status(500).json({
      error: "Failed to create product",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Get product error:", err);

    res.status(500).json({
      error: "Error fetching product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from("products")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error || !product) {
      console.error("Update product error:", error);

      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Updated successfully",
      product,
    });
  } catch (err) {
    console.error("Update product error:", err);

    res.status(500).json({
      error: "Failed to update product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    console.error("Delete product error:", err);

    res.status(500).json({
      error: "Failed to delete product",
    });
  }
};
