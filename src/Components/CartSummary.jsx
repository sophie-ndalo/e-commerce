import React, { useState, useEffect } from 'react';

function CartSummary({ cart }) {
  const [summaryCount, setSummaryCount] = useState(0);

  useEffect(() => {
    if (cart) {
      // Calculate the total price based on the items in the cart
      const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setSummaryCount(totalPrice);
    }
  }, [cart]); // Include cart as a dependency of useEffect

  return (
    <div>
      <h2>Cart Summary</h2>
      {cart && cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <div>
            Total Price: ${summaryCount.toFixed(2)}
          </div>
          {/* Add a button here for checkout if needed */}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default CartSummary;
