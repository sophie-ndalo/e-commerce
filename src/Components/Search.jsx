import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    // Update the search query as the user types
    setSearchQuery(e.target.value);
    
    // Pass the search query to the parent component using the onSearch callback
    onSearch(e.target.value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={handleInputChange}
        style={{ marginTop: '2px' }}
      />
    </div>
  );
}

export default Search;
