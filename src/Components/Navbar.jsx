import React, { useState } from "react";
import { Link } from "react-router-dom";
import Account from "./Account";
import { AiOutlineStar } from "react-icons/ai";
import CartIcon from "./CartIcon";
import { FaAngleDown, FaAngleUp, FaBars, FaTimes } from "react-icons/fa"; // Import FaBars for hamburger icon
import "./Navbar.css"; // Import the Navbar.css file

function Navbar({ cart = [], updateCart, selectedProduct }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  

  return (
    <nav className="navbar">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="navbar-content">
        <div className="logo">
          <h1>
            JUMIA CLONE
            <AiOutlineStar />
          </h1>
        </div>

        <div className="menu">
          <div className="horizontal-list">
            <span className="categories" onClick={toggleCategories}>
              Categories {categoriesOpen ? <FaAngleUp /> : <FaAngleDown />}
              {categoriesOpen && (
                <div className="category-dropdown">
                  <Link to="/electronics">Electronics</Link>
                  <Link to="/clothing">Clothing</Link>
                  {/* Add more category links */}
                </div>
              )}
            </span>
            <Link className="admin-link" to="/admin">Admin</Link>
            <Link className="home-link" to="/">Home</Link>
            <Account className="account"/>
            <CartIcon  className="cart" itemCount={cartItemCount} />
          </div>
        </div>
      </div>

      <div className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <button className="sidebar-close" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-content">
          <h2>Sidebar</h2>
          <Link to="/admin">Admin</Link>
          <Link to="/">Home</Link>
          <Link to="/mobile-L">Mobile-L</Link>
          <Link to="/mobile-M">Mobile-M</Link>
          <Link to="/mobile-S">Mobile-S</Link>
          {/* Add more sidebar links */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
