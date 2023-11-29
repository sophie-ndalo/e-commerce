import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cart from './Cart';
import { FaCartPlus, FaHeart } from 'react-icons/fa';

const apiUrl = 'https://fakestoreapi.com/products';

function SingleItem() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

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

    const storedSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(storedSavedItems);
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

  // Function to add an item to savedItems and toggle its heart icon
  const addToSavedItems = (item) => {
    const updatedSavedItems = [...savedItems];
    const isItemSaved = updatedSavedItems.some((savedItem) => savedItem.id === item.id);

    if (isItemSaved) {
      // If the item is already saved, remove it from savedItems
      const index = updatedSavedItems.findIndex((savedItem) => savedItem.id === item.id);
      updatedSavedItems.splice(index, 1);
    } else {
      // If the item is not saved, add it to savedItems
      updatedSavedItems.push(item);
    }

    setSavedItems(updatedSavedItems);

    // Update savedItems in local storage
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
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
      <Cart />
      {product ? (
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          width: '700px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          marginTop: '50px',
          marginLeft: '500px',
        }}>
          <div>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '50%', height: '50%', marginLeft: '150px' }}
            />
          </div>
          <FaHeart
            onClick={() => addToSavedItems(product)}
            style={{
              marginBottom: '',
              marginLeft: '600px',
              color: savedItems.some((savedItem) => savedItem.id === product.id)
                ? 'purple'
                : 'gray',
              cursor: 'pointer',
            }}
          />
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            {cart.find((cartItem) => cartItem.id === product.id) ? (
              <div>
                <button onClick={() => decrementItem(product.id)} style={{ backgroundColor: '#7A4988',fontWeight: "bold", width: "20px" }}>
                  -
                </button>
                <span>{cart.find((cartItem) => cartItem.id === product.id).quantity}</span>
                <button onClick={() => incrementItem(product.id)} style={{ backgroundColor: '#7A4988',fontWeight: "bold", width: "20px" }}>
                  +
                </button>
                <p>item(s) added</p>
              </div>
            ) : (
              <button
              onClick={() => addToCart(product)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '40px',
                borderRadius: '5px',
                backgroundColor: '#7A4988',
                fontSize: '18px',
                color: 'white',
              }}
            >
              <FaCartPlus style={{ marginRight: '10px' }} />
              Add to Cart
            </button>
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
