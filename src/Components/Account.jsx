import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaUser, FaRegHeart, FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function Account() {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const services = [
    { label: "SIGN IN", path: "/login" },
    { label: "My Account", path: "/myaccount", icon: <FaUser /> },
    { label: "Orders", path: "/orders", icon: <FaCartArrowDown /> },
    { label: "Saved Items", path: "/saveditems", icon: <FaRegHeart /> },
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
    position: "absolute",
    top: "100%",
    left: 0,
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "black",
    zIndex: 1,
    listStyle: "none",
    width: "220px",
    backgroundColor: "white",
  };

  return (
    <div style={{ position: "relative", marginTop: "5px", marginRight: "30px" }}>
      <button style={buttonStyle} onClick={toggleList}>
        <FaUser style={iconStyle}/>
        Account
        {showList ? <FaAngleUp style={iconStyle} /> : <FaAngleDown style={iconStyle} />}
      </button>
      {showList && (
        <ul style={listStyle}>
          {services.map((service, index) => (
            <li key={index}>
              <Link to={service.path}>
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    backgroundColor: service.label === "SIGN IN" ? "red" : "transparent", // Set background color to red only for "SIGN IN"
                    height: "30px",
                    width: "70px",
                  }}
                >
                  {service.icon} {service.label}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Account;
