import { supabase } from "../config/supabase.js";
// import { ObjectId } from "mongodb";

// export const createOrder = async (req, res) => {
//   try {
//     const { items, status } = req.body;

//     if (!Array.isArray(items) || items.length === 0)
//       return res.status(400).json({ error: "Order must contain items" });

//     let total = 0;

//     for (const item of items) {
//       if (!item.productId || typeof item.quantity !== "number")
//         return res.status(400).json({ error: "Invalid item structure" });

//       total += (item.price || 0) * item.quantity;
//     }

//     const order = {
//       userId: req.user.uid || null,
//       items,
//       total,
//       status: status || "pending",
//       createdAt: new Date(),
//     };

//     const result = await getDB().collection("orders").insertOne(order);
//     order._id = result.insertedId;

//     res.status(201).json(order);
//   } catch (err) {
//     console.error("Create order error:", err);
//     res.status(500).json({ error: "Server error creating order" });
//   }
// };

// export const getAllOrders = async (req, res) => {
//   try {
//     const list = await getDB().collection("orders").find().toArray();
//     res.json(list);
//   } catch (err) {
//     console.error("Get orders error:", err);
//     res.status(500).json({ error: "Server error fetching orders" });
//   }
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const order = await getDB()
//       .collection("orders")
//       .findOne({ _id: new ObjectId(req.params.id) });

//     if (!order) return res.status(404).json({ error: "Order not found" });

//     res.json(order);
//   } catch (err) {
//     console.error("Get order error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export const updateOrder = async (req, res) => {
//   try {
//     const update = {};
//     if (req.body.status) update.status = req.body.status;
//     if (req.body.items) update.items = req.body.items;

//     await getDB()
//       .collection("orders")
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update });

//     res.json({ message: "Order updated" });
//   } catch (err) {
//     console.error("Update order error:", err);
//     res.status(500).json({ error: "Server error updating order" });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     await getDB()
//       .collection("orders")
//       .deleteOne({ _id: new ObjectId(req.params.id) });

//     res.json({ message: "Order deleted" });
//   } catch (err) {
//     console.error("Delete order error:", err);
//     res.status(500).json({ error: "Server error deleting order" });
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const { items, status } = req.body;

    if (!Array.isArray(items) || items.length === 0) {return res.status(400).json({error: "Order must contain items"});
    }

    let total = 0;

    for (const item of items) {
      if (!item.productId || typeof item.quantity !== "number") { return res.status(400).json({error: "Invalid item structure"});
      }

      total += (item.price || 0) * item.quantity;
    }

    const order = { user_id: req.user?.uid || null, items, total, status: status || "pending", created_at: new Date().toISOString()};

    const { data, error } = await supabase.from("orders").insert(order).select("*").single();

    if (error) {
      console.error("Supabase Create Order Error:", error);

      return res.status(500).json({error: "Server error creating order"});
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Create order error:", err);

    res.status(500).json({error: "Server error creating order"});
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Get Orders Error:", error);

      return res.status(500).json({error: "Server error fetching orders"});
    }

    res.json(data);
  } catch (err) {
    console.error("Get orders error:", err);

    res.status(500).json({error: "Server error fetching orders"});
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", req.params.id).single();

    if (error) {
      console.error("Supabase Get Order Error:", error);

      if (error.code === "PGRST116") {return res.status(404).json({error: "Order not found"});
      }

      return res.status(500).json({error: "Server error"});
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);

    res.status(500).json({
      error: "Server error"
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const update = {};

    if (req.body.status !== undefined) {
      update.status = req.body.status;
    }

    if (req.body.items !== undefined) {
      update.items = req.body.items;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        error: "No valid fields to update"
      });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update(update)
      .eq("id", req.params.id)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase Update Order Error:", error);

      if (error.code === "PGRST116") {
        return res.status(404).json({
          error: "Order not found"
        });
      }

      return res.status(500).json({
        error: "Server error updating order"
      });
    }

    res.json(order);
  } catch (err) {
    console.error("Update order error:", err);

    res.status(500).json({
      error: "Server error updating order"
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", req.params.id)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase Delete Order Error:", error);

      if (error.code === "PGRST116") {
        return res.status(404).json({
          error: "Order not found"
        });
      }

      return res.status(500).json({
        error: "Server error deleting order"
      });
    }

    res.json({
      message: "Order deleted",
      order: data
    });
  } catch (err) {
    console.error("Delete order error:", err);

    res.status(500).json({
      error: "Server error deleting order"
    });
  }
};