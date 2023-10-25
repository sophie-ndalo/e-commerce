import React from 'react';

function Search({ onSearch }) {
  

  return (
    <div style={{ marginBottom: '20px', width: "100%",
    marginLeft: "20%", }}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)} // Call the onSearch prop with the search input
        style={{ marginTop: '2px', borderRadius: "5px",height: "30px", width: "60%"}}
      />
    </div>
  );
}

export default Search;
