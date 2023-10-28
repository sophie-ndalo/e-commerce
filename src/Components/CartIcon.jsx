import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

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
    <div>
      <a href="/cart" style={{ textDecoration: 'none' }} onClick={handleCartIconClick}>
        <AiOutlineShoppingCart />
        <span>{itemCount}</span>
      </a>
    </div>
  );
}

export default CartIcon;
