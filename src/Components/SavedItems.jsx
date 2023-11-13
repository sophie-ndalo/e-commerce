import React, { useState, useEffect } from "react";

function SavedItems() {
  const [savedItems, setSavedItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedSavedItems =
      JSON.parse(localStorage.getItem("savedItems")) || [];
    setSavedItems(storedSavedItems);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedSavedItems = savedItems.filter((item) => item.id !== itemId);
    setSavedItems(updatedSavedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
  };

  const handleBuyNow = (item) => {
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    window.location.reload();
  };

  return (
    <div
      style={{
        flexDirection: "row",
        marginTop: "90px",
        width: "40%",
        backgroundColor: "white",
        borderRadius: "10px",
        marginLeft: "150px",
      }}
    >
      <h2>Saved Items</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {savedItems.map((item, index) => (
          <div key={item.id} style={{ padding: "10px", backgroundColor: "white", marginTop: index > 0 ? "20px" : "0" }}>
            <img src={item.image} alt={item.title} width="100" height="100" />
            <div>{item.title}</div>
            <div>${item.price.toFixed(2)}</div>
            <button onClick={() => handleRemoveItem(item.id)} style={{fontFamily:  "'Roboto Slab', serif", width:"70px", backgroundColor: "#7A4988", color: "white", borderRadius:"5px"}}>Remove</button>
            {!cart.find((cartItem) => cartItem.id === item.id) && (
              <button onClick={() => handleBuyNow(item)} style={{marginLeft: "50px",width: "70px", fontFamily:  "'Roboto Slab', serif",color: " white", borderRadius: "5px", backgroundColor: "#9867C5"}}>Buy Now</button>
            )}
            <hr style={{ margin: "10px 0", borderTop: "1px solid #7A4988" }} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SavedItems;
