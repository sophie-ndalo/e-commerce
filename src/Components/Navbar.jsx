import React, { useState } from 'react'; // Import useState
import Search from './Search';
import Account from './Account';
import Cart from './Cart';
import { AiOutlineStar } from 'react-icons/ai';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState(''); // Define the searchQuery state

  // Define the onSearch function to update the searchQuery state
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const cartStyle = {
    marginTop: "-40px",
    marginLeft: "500px",
    zIndex: 1000,
  };

  return (
    <nav style={{ backgroundColor: "#7A4988", width: "100%", height: "120px" }}>
      <div>
        <h1>
          JUMIA CLONE
          <AiOutlineStar style={{ marginLeft: "1%" }} />
        </h1>
        {/* Pass the onSearch function as a prop to the Search component */}
        <Search onSearch={handleSearch} />
        <Account />
        <div style={cartStyle}>
          <Cart />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
