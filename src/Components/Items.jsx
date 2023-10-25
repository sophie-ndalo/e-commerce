import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function Items() {
  const apiUrl = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch products from the API
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Function to filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="product-listings">
        <Search onSearch={handleSearch} />
        {/* <div
          style={{
            display: 'flex',
            backgroundColor: "red",
            width: "60%",
            marginLeft: "20%"
          }}
        > */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", // Center horizontally
            gap: "5px", // Reduce the gap value to your preferred spacing
            backgroundColor: "white",
            width: "60%",
            marginLeft: "auto", // Set left margin to auto
            marginRight: "auto", // Set right margin to auto
            borderRadius: "10px",
          }}
        >
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                className="product-card"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  width: "250px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  height: "250px",
                  backgroundColor: "#7A4988",
                  marginTop: "10px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: "100%", height: "100px" }}
                />
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "white",
                  }}
                >
                  {product.title}
                </h2>
                <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "white", }}>
                  Price: ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Items;
