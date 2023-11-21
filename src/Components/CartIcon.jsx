import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './CartIcon.css';

function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Fetch the cart data from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total quantity of items in the cart
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    setItemCount(totalQuantity);
  }, []);

  const handleCartIconClick = () => {
    // You can perform any additional actions here when the cart icon is clicked.
    // If you want to reload the page, you can call window.location.reload() here.
    window.location.reload();
  };

  return (
    <div className="cart-icon">
      <a href="/cart" onClick={handleCartIconClick} className="cart-link">
        <AiOutlineShoppingCart className="cart-icon-svg" />
        <span className="item-count">{itemCount}</span>
        <p className="cart-text">Cart</p>
      </a>
    </div>
  );
}

export default CartIcon;
