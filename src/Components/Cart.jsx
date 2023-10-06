import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function ShoppingCart() {
  const containerStyle = {
    display: "flex", // Use flex display to align elements on the same line
    alignItems: "center", // Align items vertically in the center
    marginTop: "-2.2%",
    marginLeft: "28%",
  };

  const iconStyle = {
    marginRight: "8px", // Add some spacing to the right of the icon
  };

  return (
    <div style={containerStyle}>
      <FaShoppingCart style={iconStyle} />
      <p>cart</p>
    </div>
  );
}

export default ShoppingCart;
