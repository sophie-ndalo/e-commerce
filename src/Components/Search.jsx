import React from 'react';

function Search({ onSearch }) {
  

  return (
    <div style={{ marginTop: '100px', width: "70%",marginLeft: "15%",backgroundColor: "white",height: "80px"}}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)} // Call the onSearch prop with the search input
        style={{ borderRadius: "5px",height: "40px", width: "725px", marginTop: "20px", fontFamily:  "'Roboto Slab', serif", marginLeft: "10px", fontSize: "17px" }}
      />
    </div>
  );
}

export default Search;
