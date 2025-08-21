// import React from "react";
// import Sidebar from "../components/Sidebar";
// import "./Checkout.css";

// const Checkout = () => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="checkout-page">
//       <Sidebar />
//       <div className="checkout-container">
//         <h1>Checkout</h1>
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             <ul className="checkout-items">
//               {cart.map((item) => (
//                 <li key={item._id}>
//                   {item.name} x {item.quantity} - R {item.price * item.quantity}
//                 </li>
//               ))}
//             </ul>
//             <h2>Total: R {total}</h2>
//             <button className="confirm-btn">Confirm Order</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;
