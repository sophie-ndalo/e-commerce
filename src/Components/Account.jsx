import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaUser, FaRegHeart, FaCartArrowDown } from "react-icons/fa";

function Account() {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const services = [
    "SignIn",
    <span>
      <FaUser style={{ marginRight: "8px" }} />
      My Account
    </span>,
    <span>
      <FaCartArrowDown style={{ marginRight: "8px" }} />
      Orders
    </span>,
    <span>
      <FaRegHeart style={{ marginRight: "8px" }} />
      Saved Items
    </span>,
  ];

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "5px",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  const listStyle = {
    position: "absolute", // Position the list absolutely
    top: "100%",
    left: 0, // Align with the left side of the button
    backgroundColor: "#808080",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "black",
    zIndex: 1,
    listStyle: "none",
    width: "220px",
  };

  return (
    <div style={{ position: "relative" ,marginTop: "5px", marginRight: "30px"}}>
      <button style={buttonStyle} onClick={toggleList}>
        <FaUser style={iconStyle} />
        Account
        {showList ? <FaAngleUp style={iconStyle} /> : <FaAngleDown style={iconStyle} />}
      </button>
      {showList && (
        <ul style={listStyle}>
          {services.map((service, index) => (
            <li key={index}>
              {typeof service === "string" ? (
                service === "SignIn" ? (
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {service}
                  </button>
                ) : (
                  service
                )
              ) : (
                service
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Account;
