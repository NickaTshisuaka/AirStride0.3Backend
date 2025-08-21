import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx"; 
import { FaTrash } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token"); //  consistent with auth token key
    if (!token) {
      navigate("/signinlogin"); // redirect to login if not authenticated
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const totalPrice = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [navigate]);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  };

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <Sidebar /> {/* ✅ Sidebar included */}

      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="item-image">
                  <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} />
                </div>
                <div className="item-details">
                  <h2 className="item-name">{item.name}</h2>
                  <p className="item-price">R {item.price}</p>

                  <div className="quantity-container">
                    <label>Qty: </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                    />
                  </div>

                  <button className="remove-btn" onClick={() => removeItem(item._id)}>
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h2>Total: R {total}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
