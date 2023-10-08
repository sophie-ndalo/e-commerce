import React, { useEffect, useState } from 'react';

function Items() {
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

  const productCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    width: "250px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer", // Add cursor style to indicate clickability
    
  };

  const productListStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "100px",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    cursor: "pointer", // Add cursor style to indicate clickability
  };

  const descriptionStyle = {
    fontSize: "1rem",
    marginBottom: "10px",
    cursor: "pointer", // Add cursor style to indicate clickability
  };

  const priceStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
  };

  const categoryStyle = {
    fontSize: "1rem",
  };

  const ratingStyle = {
    fontSize: "1rem",
  };

  // Function to toggle card expansion on click
  const handleCardClick = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  return (
    <div className="product-listings">
      <div style={productListStyle}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            style={productCardStyle}
            onClick={() => handleCardClick(index)} // Call the click handler
          >
            <img src={product.image} alt={product.title} style={imageStyle} />
            <h2 style={titleStyle}>
              {expanded[index] ? product.title : product.title.split(' ').slice(0, 3).join(' ')}
            </h2>
            <p style={descriptionStyle}>
              {expanded[index] ? product.description : product.description.split(' ').slice(0, 3).join(' ')}
            </p>
            <p style={priceStyle}>Price: ${product.price}</p>
            <p style={categoryStyle}>Category: {product.category}</p>
            <p style={ratingStyle}>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            {expanded[index] &&
           <button>BUY</button>} {/* Render the button when expanded */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
