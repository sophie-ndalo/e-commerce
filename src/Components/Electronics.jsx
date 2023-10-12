import React, { useEffect, useState } from 'react';
import Search from './Search';

function Electronics() {
  const apiUrl = 'https://fakestoreapi.com/products/category/electronics';
  const [electronics, setElectronics] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch electronics data
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setElectronics(data);
        setExpanded(new Array(data.length).fill(false));
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const toggleCardExpansion = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
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

  const filteredElectronics = searchQuery
    ? electronics.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : electronics;

  const electronicsListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '100px',
  };

  return (
    <div className="product-listings">
      <Search onSearch={handleSearch} />
      <div style={electronicsListStyle}>
        {filteredElectronics.map((product, index) => (
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
            onClick={() => toggleCardExpansion(index)}
          >
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: '100px' }} />
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                cursor: 'pointer',
                whiteSpace: expanded[index] ? 'normal' : 'nowrap',
                overflow: 'hidden',
                textOverflow: expanded[index] ? 'unset' : 'ellipsis',
              }}
            >
              {expanded[index] ? product.title : truncateText(product.title, 3)}
            </h2>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: '10px',
                cursor: 'pointer',
                whiteSpace: expanded[index] ? 'normal' : 'nowrap',
                overflow: 'hidden',
                textOverflow: expanded[index] ? 'unset' : 'ellipsis',
              }}
            >
              {expanded[index] ? product.description : truncateText(product.description, 3)}
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Price: ${product.price}</p>
            <p style={{ fontSize: '1rem' }}>Category: {product.category}</p>
            <p style={{ fontSize: '1rem' }}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            {expanded[index] && <button>ADD TO CART</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Electronics;
