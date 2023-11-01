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

  const cartIconStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const itemCountStyle = {
    color: 'white',
    backgroundColor: '#7A4988',
    borderRadius: '50%',
    height: '20px',
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5px', // Adjust this margin to move the count inside the icon
    marginTop: '-30px', // Adjust this margin to align it with the icon
  };
  

  const cartText = {
    marginRight: '300px',
  };

  return (
    <div style={cartIconStyle}>
      <a href="/cart" onClick={handleCartIconClick} style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
        <AiOutlineShoppingCart style={{ marginRight: '5px', height: '25px', width: '25px' }} />
        <span style={itemCountStyle}>{itemCount}</span>
        <p style={cartText}>Cart</p>
      </a>
    </div>
  );
}

export default CartIcon;
