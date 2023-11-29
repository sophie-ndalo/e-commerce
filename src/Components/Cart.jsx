import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Update the path accordingly

function Cart() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);
  const [cart, setCart] = useState([]);
  const auth = useAuth(); // Assuming you have a useAuth hook to check authentication status
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]); // State to store saved items

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

  const removeFromLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    window.location.reload(); // Reload the page after item deletion
  };

  // Calculate the total price of all products in the cart
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const redirectTo = auth.currentUser ? "/userinformationform" : "/login";
    navigate(redirectTo);
  };

  const confirmRemove = (productId) => {
    setShowConfirm(true);
    setItemIdToRemove(productId);
  };

  const handleConfirm = () => {
    if (itemIdToRemove !== null) {
      const updatedCart = cart.filter((item) => item.id !== itemIdToRemove);
      removeFromLocalStorage(updatedCart);
      setCart(updatedCart);
      setItemIdToRemove(null);
      setShowConfirm(false);
      window.location.reload(); // Reload the page after item deletion
    }
  };

  const handleCancel = () => {
    setItemIdToRemove(null);
    setShowConfirm(false);
  };

  const saveForLater = (productId) => {
    const itemToSave = cart.find((item) => item.id === productId);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      // You can also remove the saved item from the cart if needed
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
      window.location.reload(); // Reload the page after item deletion
    }
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
                <img
                  src={item.image}
                  alt={item.title}
                  width="100"
                  height="100"
                />
                <div>{item.title}</div>
                <div>${item.price.toFixed(2)}</div>
                <div>
                  Quantity:{" "}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      backgroundColor: "#7A4988",
                      fontWeight: "bold",
                      width: "20px",
                    }}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: "#7A4988",
                      fontWeight: "bold",
                      width: "20px",
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#7A4988",
                    fontWeight: "bold",
                  }}
                  onClick={() => confirmRemove(item.id)}
                >
                  <AiOutlineDelete
                    style={{ fontSize: "20px", marginRight: "5px" }}
                  />{" "}
                  REMOVE
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
        <p style={{ marginLeft: "450px", marginTop: "-125px" }}>
          {" "}
          ${totalCartPrice.toFixed(2)}
        </p>
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            marginTop: "10%",
            marginLeft: "30%",
            width: "600px",
            height: "200px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Remove from cart</p>
          <p style={{ marginTop: "20px" }}>
            Do you really want to remove the item from the cart?
          </p>
          <div
            style={{ display: "flex", marginTop: "20px", position: "relative" }}
          >
            <button
              onClick={handleCancel}
              style={{
                position: "absolute",
                marginTop: "-110px",
                marginLeft: "480px",
              }}
            >
              X
            </button>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                position: "relative",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => saveForLater(itemIdToRemove)}
                style={{
                  color: "#7A4988",
                  backgroundColor: "white",
                  height: "40px",
                  width: "200px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px", // Add margin between buttons
                }}
              >
                {" "}
                <FaHeart
                  style={{ fontSize: "20px", marginRight: "40px" }}
                />{" "}
                SAVE FOR LATER
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  backgroundColor: "#7A4988",
                  color: "white",
                  height: "40px",
                  width: "200px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "10px", // Add margin between buttons
                }}
              >
                <AiOutlineDelete
                  style={{ fontSize: "20px", marginRight: "40px" }}
                />
                REMOVE ITEM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
