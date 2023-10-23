import React, { useEffect, useState } from 'react';
import Items from './Items';
import Cart from './Cart';

function Home() {
  const apiUrl = 'https://fakestoreapi.com/products';

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    // Retrieve cart data from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    // Fetch products when the component mounts
    fetchProducts();
  }, []);

  // Filter products to exclude items in the cart
  const productsNotInCart = products.filter(
    (product) => !cart.find((item) => item.id === product.id)
  );

  return (
    <div>
      <Items products={productsNotInCart} cart={cart} setCart={setCart} />
    </div>
  );
}

export default Home;
