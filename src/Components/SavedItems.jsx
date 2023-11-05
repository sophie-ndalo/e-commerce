import React, { useState, useEffect } from 'react';

function SavedItems() {
  const [savedItems, setSavedItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(storedSavedItems);

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedSavedItems = savedItems.filter((item) => item.id !== itemId);
    setSavedItems(updatedSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
  };

  const handleBuyNow = (item) => {
    // Check if the item is already in the cart
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      // If not, add the item to the cart
      const updatedCart = [...cart];
      updatedCart.push({ ...item, quantity: 1 });
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <div>
      <h2>Saved Items</h2>
      <ul style={{ listStyle: 'none' }}>
        {savedItems.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} style={{ maxWidth: '50px' }} />
            {item.title}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            {!cart.find((cartItem) => cartItem.id === item.id) && (
              <button onClick={() => handleBuyNow(item)}>Buy Now</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedItems;
