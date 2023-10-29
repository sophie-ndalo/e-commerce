import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

function Cart() {
  const [cart, setCart] = useState([]);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
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
                    style={{ backgroundColor: "#7A4988", fontWeight: "bold" }}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ backgroundColor: "#7A4988", fontWeight: "bold" }}
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
                <hr style={{ margin: "10px 0" }} /> {/* Add a horizontal line between items */}
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
        <button style={{ marginLeft: "10px", width: "200px" }}>
          Checkout (${totalCartPrice.toFixed(2)})
        </button>
      </div>
    </div>
  );
}

export default Cart;
