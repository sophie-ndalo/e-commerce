import React, { useState } from "react";
import { Link } from "react-router-dom";
import Account from "./Account";
import { AiOutlineStar } from "react-icons/ai";
import CartIcon from "./CartIcon";
import { FaAngleDown } from "react-icons/fa";

function Navbar({ cart = [], updateCart, selectedProduct }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav
    style={{
      backgroundColor: "white",
      width: "100%",
      height: "100px",
      position: "fixed",  // Set the position to fixed
      top: 0,             // Stick it at the top
      zIndex: 1000,       // Set a high z-index to ensure it appears above other elements
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: "30px" }}>
        <h1 style={{ marginLeft: "380px", fontStyle:"initial" }}>
          JUMIA CLONE
          <AiOutlineStar
            style={{
              marginLeft: "95%",
              marginBottom: "-4px",
              color: "white",
              backgroundColor: "#7A4988",
              borderRadius: "50%",
              height: "20px",
              width: "20px",
              display: "flex",
              marginRight: "160px",
              marginTop: "-25px",
              border: "1px solid white", // Set the border color to white
              fill: "white", // Set the fill color of the star (inside)
            }}
          />
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "20px", marginTop: "40px",
            }}
          >
            <span
              onClick={toggleCategories}
              style={{ cursor: "pointer", color: "black",fontFamily: "'Roboto Slab', serif", }}
            >
              Categories <FaAngleDown />
            </span>
            {categoriesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "white",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  to="/electronics"
                  style={{ color: "black", textDecoration: "none",fontFamily: "'Roboto Slab', serif",   }}
                >
                  Electronics
                </Link>
                <Link
                  to="/clothing"
                  style={{ color: "black", textDecoration: "none",fontFamily: "'Roboto Slab', serif",   }}
                >
                  Clothing
                </Link>
                {/* Add more category links as needed */}
              </div>
            )}
          </div>
          <div
            className="horizontal-list"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px", 
              marginTop: "40px",
              fontFamily: "'Roboto Slab', serif", 
            }}
          >
            <Link
              to="/admin"
              style={{
                color: "black",
                textDecoration: "none",
                marginRight: "10px",
               
              }}
            >
              Admin
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                marginRight: "10px",
                color: "black",
               
              }}
            >
              Home
            </Link>
            <Account style={{ marginTop: "50px" }} />
            <CartIcon itemCount={cartItemCount} style={{ marginLeft: "5px" }} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
