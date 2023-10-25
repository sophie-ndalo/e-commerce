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
    // No need to reload the page
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  return (
    <div
      style={{
        width: "60%",
        marginLeft: "20%",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
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
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
