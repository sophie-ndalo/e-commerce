import React from "react";

function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
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
            <div>Quantity: {item.quantity}</div>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
