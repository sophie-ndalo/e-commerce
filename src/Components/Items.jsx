import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';


function Items() {

  const apiUrl = 'https://fakestoreapi.com/products';
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // useEffect(() => {
  //   // Load the cart from local storage when the component mounts
  //   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  //   setCart(storedCart);
  // }, []);

  return (
    <div>
      <div className="product-listings">
        <Search />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
            marginTop: '100px',
          }}
        >
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}> {/* Use Link to create a link */}
              <div
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
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: '100%', height: '100px' }}
                />
                <h2
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}
                >
                  {product.title}
                </h2>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Price: ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Items;
