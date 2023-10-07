import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaUser,FaRegHeart, FaCartArrowDown } from "react-icons/fa";

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
    orders
  </span>,
  <span>
  <FaRegHeart style={{ marginRight: "8px" }} />
  Saved Items
</span>,
  ];

  const buttonStyle = {
    display: "flex", // Display button contents in a row
    alignItems: "center", // Center content vertically
    padding: "8px 16px", // Adjust padding as needed
    borderRadius: "5px", // Adjust border radius
    marginTop: "-30px", // Adjust margin
    marginLeft: "320px", // Adjust margin
  };

  const iconStyle = {
    marginRight: "8px", // Add margin to the right of the icons
  };

  
  return (
    <div>
      <button style={buttonStyle} onClick={toggleList}>
        <FaUser style={iconStyle} />
        Account
        {showList ? (
          <FaAngleUp style={iconStyle} />
        ) : (
          <FaAngleDown style={iconStyle} />
        )}
      </button>
      {showList && (
        <ul
          style={{
            position: "relative",
            top: "100%",
            backgroundColor: "#808080",
            padding: "10px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            color: "black",
            zIndex: "1",
            listStyle: "none",
            width: "220px",
          }}
        >
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
      <div>
      </div>
    </div>
  );
}

export default Account;
