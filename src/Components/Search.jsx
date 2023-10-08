import React, { useState, useEffect } from "react";
import { FaSistrix } from "react-icons/fa";

function Search({ onSearch, placeholder, value }) {
  const apiUrl = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        // Initialize the expanded state with false for each product
        setExpanded(new Array(data.length).fill(false));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);
  const containerStyle = {
    display: 'inline-block',
  };

  const inputContainerStyle = {
    display: 'inline-block',
    verticalAlign: 'top', // Align the input and button elements at the top
  };

  const inputStyle = {
    paddingRight: '30px',
    height: "20px",
    borderRadius: "5px",
    paddingLeft: '30px', // Adjust this value to control the spacing between icon and text
  };

  const iconStyle = {
    position: 'absolute',
    top: '8.5%',
    left: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  };

  const buttonStyle = {
    verticalAlign: 'top', // Align the button at the top
    marginLeft: '10px', // Adjust this value to control the spacing between input and button
    borderRadius: "5px", //
  };
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };
  const handleCardClick = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  return (
    <div className="search-container" style={containerStyle}>
      
      <div style={inputContainerStyle}>
        <input className="search-input" style={inputStyle} placeholder="Search products & brands" onChange={handleInputChange}
          value={value} />
        <FaSistrix className="search-icon" style={iconStyle} />
      </div>
      <button style={buttonStyle}>Search</button>
    </div>
  );
}

export default Search;
