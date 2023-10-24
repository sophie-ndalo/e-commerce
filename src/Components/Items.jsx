import React, { useEffect, useState } from 'react';
import Search from './Search';

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

  useEffect(() => {
    // Load the cart from local storage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    setProducts(products.filter((product) => product.id !== item.id));
    window.location.reload();
  };

  const productsNotInCart = products.filter(
    (product) => !cart.find((cartItem) => cartItem.id === product.id)
  );

  const productListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '100px',
  };

  return (
    <div>
      <div className="product-listings">
        <Search />
        <div style={productListStyle}>
          {productsNotInCart.map((product) => (
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
              {cart.find((cartItem) => cartItem.id === product.id) ? (
                <div>
                  <span>Quantity: {cart.find((cartItem) => cartItem.id === product.id).quantity}</span>
                </div>
              ) : (
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Items;
