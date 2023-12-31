import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom'; // Import Link
import SingleitemAdmin from './SingleitemAdmin';
import AddItem from './AddItem';

function Admin() {
  const apiUrl = 'https://fakestoreapi.com/products';
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products data
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);

        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length <= maxLength) {
      return text;
    }
    return words.slice(0, maxLength).join(' ') + '...';
  };

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="product-listings">
      <AddItem/>
      <Search onSearch={handleSearch} />
      <div  style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", // Center horizontally
            gap: "5px", // Reduce the gap value to your preferred spacing
            backgroundColor: "white",
            width: "70%",
            marginLeft: "auto", // Set left margin to auto
            marginRight: "auto", // Set right margin to auto
            borderRadius: "10px",
            marginTop: "20px",
          }}>
        {filteredProducts.map((product, index) => (
          <Link to={`/productAdmin/${product.id}`} key={product.id}> {/* Use Link to link to SingleItem */}
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
                marginBottom: "10px",
              }}
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: '100px' }} />
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                {truncateText(product.title, 3)} {/* Truncate the title here */}
              </h2>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold',color: "white" }}>Price: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
      {selectedProduct && <SingleitemAdmin product={selectedProduct} />}
    </div>
  );
}

export default Admin;
