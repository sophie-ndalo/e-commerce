import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Update the path accordingly

function Cart() {
  const [cart, setCart] = useState([]);
  const auth = useAuth(); // Assuming you have a useAuth hook to check authentication status
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    window.location.reload();
  };

  const updateQuantity = (productId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    window.location.reload();
  };

  // Calculate the total price of all products in the cart
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  
  const handleCheckout = () => {
    console.log("auth.user:", auth.currentUser); // Log the value of auth.user for debugging
  
    // Check if there is a user signed in
    const redirectTo = auth.currentUser ? "/userinformationform" : "/login";
    console.log("Redirecting to:", redirectTo); // Log the determined redirect route
  
    // Navigate to the determined route
    navigate(redirectTo);
  };
  
  


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "100px",
      }}
    >
      {/* Cart Items */}
      <div
        style={{
          width: "40%",
          backgroundColor: "white",
          borderRadius: "10px",
          marginLeft: "275px",
        }}
      >
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "white",
                }}
              >
                <img src={item.image} alt={item.title} width="100" height="100" />
                <div>{item.title}</div>
                <div>${item.price.toFixed(2)}</div>
                <div>
                  Quantity:{" "}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ backgroundColor: "#7A4988", fontWeight: "bold", width: "20px" }}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ backgroundColor: "#7A4988", fontWeight: "bold", width: "20px"}}
                  >
                    +
                  </button>
                </div>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "#7A4988",
                    fontWeight: "bold",
                  }}
                  onClick={() => removeFromCart(item.id)}
                >
                  {" "}
                  <AiOutlineDelete style={{ fontSize: "20px" }} /> REMOVE
                </button>
                {/* Add a horizontal line between items */}
                <hr style={{ margin: "10px 0" }} />
              </div>
            ))}
          </ul>
        )}
      </div>

      {/* Cart Summary (Upper Right) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          height: "300px",
          backgroundColor: "white",
          borderRadius: "10px",
          marginLeft: "10px",
          justifyContent: "space-between",
        }}
      >
        <p style={{ textAlign: "right", marginRight: "400px" }}>CART SUMMARY</p>
        <p style={{ textAlign: "right", marginRight: "450px" }}>Subtotal:</p>
        <p style={{ marginLeft: "450px", marginTop: "-125px" }}> ${totalCartPrice.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          style={{
            marginLeft: "180px",
            width: "200px",
            height: "40px",
            marginBottom: "20px",
            borderRadius: "5px",
            backgroundColor: "#7A4988",
            fontSize: "18px",
            color: "white",
            fontFamily: "'Roboto Slab', serif",
          }}
        >
          Checkout (${totalCartPrice.toFixed(2)})
        </button>
      </div>
    </div>
  );
}

export default Cart;
