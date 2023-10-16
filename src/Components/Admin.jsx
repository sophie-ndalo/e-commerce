import React, { useState, useEffect } from 'react';
import Search from './Search';
import Delete from './Delete';
import Edit from './Edit';

function Admin() {
  const apiUrl = 'https://fakestoreapi.com/products';
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState([]); // Keep track of card expansion state
  const [searchQuery, setSearchQuery] = useState('');
  const [itemId, setItemId] = useState(null);
  const [itemData, setItemData] = useState(null);

  const handleEdit = (itemId, newData) => {
    // Implement the logic for handling edits here
    // You can update the item data in the frontend based on the itemId and newData.
  };

  const handleDelete = (itemIdToDelete) => {
    // Implement the logic to delete the item with the given itemIdToDelete
    // You can use the fetch API to send a DELETE request to the server.
  };

  const handleClose = () => {
    setItemId(null);
    setItemData(null);
  };

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
        setExpanded(new Array(data.length).fill(false)); // Initialize expansion state
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const toggleCardExpansion = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index]; // Toggle expansion state
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

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const productListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '100px',
  };

  return (
    <div className="product-listings">
      <Search onSearch={handleSearch} />
      <div style={productListStyle}>
        {filteredProducts.map((product, index) => (
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
            onClick={() => {
              setItemId(product.id);
              setItemData(product);
              toggleCardExpansion(index);
            }}
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
            <Delete onDelete={() => handleDelete(product.id)} />
            <button>Edit</button>
          </div>
        ))}
      </div>
      {itemId && (
        <Edit itemId={itemId} onEdit={handleEdit} initialData={itemData} onClose={handleClose} />
      )}
    </div>
  );
}

export default Admin;
