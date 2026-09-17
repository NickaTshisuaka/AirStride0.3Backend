import { supabase } from "../config/database.js";

export const createOrder = async (req, res) => {
  try {
    const { items, status } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Order must contain items"
      });
    }

    let total = 0;

    for (const item of items) {
      if (
        !item.productId ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          error: "Invalid item structure"
        });
      }

      if (typeof item.price !== "number" || item.price < 0) {
        return res.status(400).json({
          error: "Invalid product price"
        });
      }

      total += item.price * item.quantity;
    }

    const orderData = {
      user_id: req.user?.uid || null,
      total,
      status: status || "pending"
    };

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error("Create order error:", orderError);
      return res.status(500).json({
        error: "Server error creating order"
      });
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: String(item.productId),
      product_name: item.productName || null,
      quantity: item.quantity,
      unit_price: item.price
    }));

    const { data: insertedItems, error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select();

    if (itemsError) {
      console.error("Create order items error:", itemsError);

      // Remove the order if its items could not be created
      await supabase
        .from("orders")
        .delete()
        .eq("id", order.id);

      return res.status(500).json({
        error: "Server error creating order items"
      });
    }

    res.status(201).json({
      ...order,
      items: insertedItems
    });

  } catch (err) {
    console.error("Create order error:", err);

    res.status(500).json({
      error: "Server error creating order"
    });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get orders error:", error);

      return res.status(500).json({
        error: "Server error fetching orders"
      });
    }

    res.json(orders);

  } catch (err) {
    console.error("Get orders error:", err);

    res.status(500).json({
      error: "Server error fetching orders"
    });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("id", id)
      .single();

    if (error || !order) {
      return res.status(404).json({
        error: "Order not found"
      });
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
    const { id } = req.params;

    const update = {};

    if (req.body.status) {
      update.status = req.body.status;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        error: "No valid fields to update"
      });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update(update)
      .eq("id", id)
      .select()
      .single();

    if (error || !order) {
      return res.status(404).json({
        error: "Order not found"
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
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !order) {
      return res.status(404).json({
        error: "Order not found"
      });
    }

    res.json({
      message: "Order deleted"
    });

  } catch (err) {
    console.error("Delete order error:", err);

    res.status(500).json({
      error: "Server error deleting order"
    });
  }
};
