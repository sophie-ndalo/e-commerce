import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from 'react-icons/ai';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check if the "cart" item is defined in local storage
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

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Reload the page after removing the item from the cart
    window.location.reload();
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <img src={item.image} alt={item.title} width="100" height="100" />
            <div>{item.title}</div>
            <div>${item.price.toFixed(2)}</div>
            <div>
              Quantity:{" "}
              <button onClick={() => decrementQuantity(item.id)} style={{backgroundColor: "#7A4988", fontWeight: 'bold'}}>-</button>
              {item.quantity}
              <button onClick={() => incrementQuantity(item.id)} style={{backgroundColor: "#7A4988", fontWeight: 'bold'}}>+</button>
            </div>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: "#7A4988", fontWeight: 'bold'}}onClick={() => removeFromCart(item.id)}> <AiOutlineDelete style={{ fontSize: '20px' }}  />  {/* Use the delete icon */}REMOVE</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
