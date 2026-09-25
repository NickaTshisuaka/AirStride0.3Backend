import supabase from "../config/supabase.js";

export const getAllProducts = async (req, res) => {
  try {
    const { data: products, error } = await supabase.from("products").select("*");
    if (error) throw error;
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { data: result, error } = await supabase.from("products").insert([req.body]).select().single();
    if (error) throw error;

    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { data: product, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();

    if (!product) return res.status(404).json({ error: "Not found" });

    res.json(product);
  } catch {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
   const { data: result, error } = await supabase.from("products").update(req.body).eq("id", req.params.id);
    if (error) throw error;

    res.json({ message: "Updated successfully" });
  } catch {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { data: result, error } = await supabase.from("products").delete().eq("id", req.params.id);
    if (error) throw error;

    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
