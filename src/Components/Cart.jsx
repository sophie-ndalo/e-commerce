import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function ShoppingCart() {
  const containerStyle = {
    display: "flex", // Use flex display to align elements on the same line
    alignItems: "center", // Align items vertically in the center
    
  };

  const iconStyle = {
    marginRight: "8px", // Add some spacing to the right of the icon
    height: "16px",
  };

  return (
    <div style={containerStyle}>
      <FaShoppingCart style={iconStyle} />
      <p>cart</p>
    </div>
  );
}

export default ShoppingCart;
