import React from 'react'
import Search from './Search'
import Account from './Account'
import Cart from './Cart'
import { AiOutlineStar } from 'react-icons/ai'

function Navbar() {
  const cartStyle = {
    position: "fixed",
    top: "60px", // Adjust the top position as needed
    right: "1250px", // Adjust the right position as needed
    zIndex: 1000,
  };

  return (
    <nav style={{ backgroundColor: "#7A4988", width: "100%", height: "120px" }}>
      <div>
        <h1>
          JUMIA CLONE
          <AiOutlineStar style={{ marginLeft: "1%" }} />
        </h1>
        <Search />
        <Account />
        <div style={cartStyle}>
          <Cart />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
