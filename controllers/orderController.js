<<<<<<< HEAD
import { supabase } from "../config/database.js";
=======
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
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963

export const createOrder = async (req, res) => {
  try {
    const { items, status } = req.body;

<<<<<<< HEAD
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Order must contain items",
      });
=======
    if (!Array.isArray(items) || items.length === 0) {return res.status(400).json({error: "Order must contain items"});
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
    }

    let total = 0;

    for (const item of items) {
<<<<<<< HEAD
      if (
        !item.productId ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          error: "Invalid item structure",
        });
      }

      if (typeof item.price !== "number" || item.price < 0) {
        return res.status(400).json({
          error: "Invalid product price",
        });
      }

      total += item.price * item.quantity;
    }

    const orderData = {
      user_id: req.user?.uid || null,
      total,
      status: status || "pending",
    };
=======
      if (!item.productId || typeof item.quantity !== "number") { return res.status(400).json({error: "Invalid item structure"});
      }

      total += (item.price || 0) * item.quantity;
    }

    const order = { user_id: req.user?.uid || null, items, total, status: status || "pending", created_at: new Date().toISOString()};
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963

    const { data, error } = await supabase.from("orders").insert(order).select("*").single();

<<<<<<< HEAD
    if (orderError) {
      console.error("Create order error:", orderError);
      return res.status(500).json({
        error: "Server error creating order",
      });
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: String(item.productId),
      product_name: item.productName || null,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { data: insertedItems, error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select();

    if (itemsError) {
      console.error("Create order items error:", itemsError);

      // Remove the order if its items could not be created
      await supabase.from("orders").delete().eq("id", order.id);

      return res.status(500).json({
        error: "Server error creating order items",
      });
    }

    res.status(201).json({
      ...order,
      items: insertedItems,
    });
  } catch (err) {
    console.error("Create order error:", err);

    res.status(500).json({
      error: "Server error creating order",
    });
=======
    if (error) {
      console.error("Supabase Create Order Error:", error);

      return res.status(500).json({error: "Server error creating order"});
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Create order error:", err);

    res.status(500).json({error: "Server error creating order"});
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
  }
};

export const getAllOrders = async (req, res) => {
  try {
<<<<<<< HEAD
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (*)
      `,
      )
      .order("created_at", { ascending: false });
=======
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963

    if (error) {
      console.error("Supabase Get Orders Error:", error);

<<<<<<< HEAD
      return res.status(500).json({
        error: "Server error fetching orders",
      });
    }

    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);

    res.status(500).json({
      error: "Server error fetching orders",
    });
=======
      return res.status(500).json({error: "Server error fetching orders"});
    }

    res.json(data);
  } catch (err) {
    console.error("Get orders error:", err);

    res.status(500).json({error: "Server error fetching orders"});
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", req.params.id).single();

<<<<<<< HEAD
    const { data: order, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (*)
      `,
      )
      .eq("id", id)
      .single();

    if (error || !order) {
      return res.status(404).json({
        error: "Order not found",
      });
=======
    if (error) {
      console.error("Supabase Get Order Error:", error);

      if (error.code === "PGRST116") {return res.status(404).json({error: "Order not found"});
      }

      return res.status(500).json({error: "Server error"});
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);

    res.status(500).json({
      error: "Server error",
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
        error: "No valid fields to update",
      });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update(update)
      .eq("id", req.params.id)
      .select("*")
      .single();

<<<<<<< HEAD
    if (error || !order) {
      return res.status(404).json({
        error: "Order not found",
=======
    if (error) {
      console.error("Supabase Update Order Error:", error);

      if (error.code === "PGRST116") {
        return res.status(404).json({
          error: "Order not found"
        });
      }

      return res.status(500).json({
        error: "Server error updating order"
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
      });
    }

    res.json(order);
  } catch (err) {
    console.error("Update order error:", err);

    res.status(500).json({
      error: "Server error updating order",
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

<<<<<<< HEAD
    if (error || !order) {
      return res.status(404).json({
        error: "Order not found",
=======
    if (error) {
      console.error("Supabase Delete Order Error:", error);

      if (error.code === "PGRST116") {
        return res.status(404).json({
          error: "Order not found"
        });
      }

      return res.status(500).json({
        error: "Server error deleting order"
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
      });
    }

    res.json({
      message: "Order deleted",
<<<<<<< HEAD
=======
      order: data
>>>>>>> 0b9fbae56d3853349af76c238f91d6889dfef963
    });
  } catch (err) {
    console.error("Delete order error:", err);

    res.status(500).json({
      error: "Server error deleting order",
    });
  }
};
