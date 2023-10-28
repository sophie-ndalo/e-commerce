import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cart from './Cart';

const apiUrl = 'https://fakestoreapi.com/products';
function SingleItem() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
      });

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, [id]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingCartItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
    setCart(updatedCart);

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  // Function to increment the quantity of an item in the cart
  const incrementItem = (itemId) => {
    const updatedCart = [...cart];
    const cartItem = updatedCart.find((item) => item.id === itemId);
    if (cartItem) {
      cartItem.quantity++;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    window.location.reload();
  };

  // Function to decrement the quantity of an item in the cart
  const decrementItem = (itemId) => {
    const updatedCart = [...cart];
    const cartItem = updatedCart.find((item) => item.id === itemId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    window.location.reload();
  };

  return (
    <div> 
      <Cart/>
      {product ? (
        <div>
          <div>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '100%', height: '200px' }}
            />
          </div>
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            {cart.find((cartItem) => cartItem.id === product.id) ? (
              <div>
                 <button onClick={() => decrementItem(product.id)} style={{backgroundColor: "#7A4988"}}>-</button>
                <span>{cart.find((cartItem) => cartItem.id === product.id).quantity}</span>
                <button onClick={() => incrementItem(product.id)} style={{backgroundColor: "#7A4988"}}>+</button>
                <p>item (s) added</p>
                </div>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleItem;
