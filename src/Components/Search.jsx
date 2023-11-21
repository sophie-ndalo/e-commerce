import React from 'react';
import "./Search.css";

function Search({ onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)} // Call the onSearch prop with the search input
        className="search-input"
      />
    </div>
  );
}

export default Search;
