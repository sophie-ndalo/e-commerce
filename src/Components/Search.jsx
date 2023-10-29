import React from 'react';

function Search({ onSearch }) {
  

  return (
    <div style={{ marginBottom: '20px', width: "70%",marginLeft: "15%",backgroundColor: "white",height: "80px"}}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)} // Call the onSearch prop with the search input
        style={{ borderRadius: "5px",height: "30px", width: "725px", marginTop: "20px"}}
      />
    </div>
  );
}

export default Search;
