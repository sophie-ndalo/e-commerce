import React, { useState, useEffect } from 'react';

function Electronics({ searchQuery }) {
  const apiUrl = 'https://fakestoreapi.com/products/category/electronics'; // API URL for electronics category
  const [electronics, setElectronics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredElectronics, setFilteredElectronics] = useState([]);

  useEffect(() => {
    // Fetch electronics data when the component mounts
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setElectronics(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setIsLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => {
    // Filter electronics based on searchQuery
    if (searchQuery) {
      const filtered = electronics.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredElectronics(filtered);
    } else {
      setFilteredElectronics(electronics);
    }
  }, [searchQuery, electronics]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="electronics">
      <h2>Electronics</h2>
      <div className="product-listings">
        {filteredElectronics.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              width: '250px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: '100px' }} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', cursor: 'pointer' }}>
              {product.title}
            </h2>
            <p style={{ fontSize: '1rem', marginBottom: '10px', cursor: 'pointer' }}>{product.description}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Price: ${product.price}</p>
            <p style={{ fontSize: '1rem' }}>Category: {product.category}</p>
            <p style={{ fontSize: '1rem' }}>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <button>BUY</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Electronics;
