import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function SingleItem() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data by ID
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [id]);

  return (
    <div className="card" style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        width: '700px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        marginTop: '50px',
        marginLeft: '500px',
      }}>
  {product ? (
    <div>
      <img src={product.image} alt={product.title} style={{ maxWidth: '50%', height: '50%' }} />
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{product.title}</h2>
      <p style={{ fontSize: '1rem' }}>{product.description}</p>
      <p style={{ fontSize: '1rem' }}>Price: ${product.price}</p>
      <p style={{ fontSize: '1rem' }}>Category: {product.category}</p>
      {/* Add other details as needed */}
      <button>ADD TO CART</button>
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

  );
}

export default SingleItem;
