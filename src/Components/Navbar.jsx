import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account';
import Cart from './Cart';
import { AiOutlineStar } from 'react-icons/ai';

function Navbar() {
  const cartStyle = {
    marginTop: '-40px',
    marginLeft: '500px',
    zIndex: 1000,
  };

 
  return (
    <nav style={{ backgroundColor: '#7A4988', width: '100%', height: '120px', marginTop: '20px' }}>
  <div>
    <h1>
      JUMIA CLONE
      <AiOutlineStar style={{ marginLeft: '1%' }} />
    </h1>
    <Account />
    <div style={cartStyle}>
      <Cart />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        Home
      </Link>
      <Link to="/electronics" style={{ color: 'white', textDecoration: 'none' }}>
        Electronics
      </Link>
      <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
        Admin
      </Link>
    </div>
  </div>
</nav>

  );
}

export default Navbar;
