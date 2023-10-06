import React from "react";
import { FaAngleDown, FaUser } from "react-icons/fa";

function Account() {
  const buttonStyle = {
    display: "flex", // Display button contents in a row
    alignItems: "center", // Center content vertically
    padding: "8px 16px", // Adjust padding as needed
    borderRadius: "5px", // Adjust border radius
    marginTop: "-30px", // Adjust margin
    marginLeft: "350px", // Adjust margin
  };

  const iconStyle = {
    marginRight: "8px", // Add margin to the right of the icons
  };

  return (
    <div>
      <button style={buttonStyle}>
        <FaUser style={iconStyle} />
        Account
        <FaAngleDown style={iconStyle} />
      </button>
    </div>
  );
}

export default Account;
