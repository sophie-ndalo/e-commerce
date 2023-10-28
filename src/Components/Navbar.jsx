import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Account from './Account';
import { AiOutlineStar } from 'react-icons/ai';
import CartIcon from './CartIcon';
import { FaAngleDown } from 'react-icons/fa';

function Navbar({ cart = [], updateCart, selectedProduct }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav style={{ backgroundColor: '#7A4988', width: '100%', height: '120px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginTop: "30px" }}>
          <h1 style={{ marginLeft: "380px" }}>
            JUMIA CLONE
            <AiOutlineStar style={{ marginLeft: '95%', marginBottom: "-4px" }} />
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }}>
            <span onClick={toggleCategories} style={{ cursor: 'pointer', color: 'white' }}>
              Categories <FaAngleDown />
            </span>
            {categoriesOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Link to="/electronics" style={{ color: 'black', textDecoration: 'none' }}>
                  Electronics
                </Link>
                <Link to="/clothing" style={{ color: 'black', textDecoration: 'none' }}>
                  Clothing
                </Link>
                {/* Add more category links as needed */}
              </div>
            )}
          </div>
          <div className="horizontal-list" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
              Admin
            </Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
              Home
            </Link>
            <Account style={{ marginRight: '10px' }} />
            <CartIcon itemCount={cartItemCount} style={{ marginLeft: '10px' }} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
