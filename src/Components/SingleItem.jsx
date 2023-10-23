import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleItem() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartCount, setCartCount] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false); // Control visibility of the increment buttons

  useEffect(() => {
    // Fetch the product data by ID when the component mounts
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
        console.error("Fetch error:", error);
      });
  }, [id]);

  const addToCart = (productId, quantity) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCartIndex = existingCart.findIndex((item) => item.id === productId);

    if (productInCartIndex !== -1) {
      // The product is already in the cart, update its quantity
      existingCart[productInCartIndex].quantity += quantity;
    } else {
      // Create an object for the product to add to the cart
      const productToAdd = {
        id: productId,
        title: product.title,
        price: product.price,
        quantity: quantity,
        // Add other product details such as image here
      };
      existingCart.push(productToAdd); // Add the new product to the existing cart
    }

    // Update local storage with the updated cart
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setIsInCart(true); // Set isInCart to true after adding the product
    setShowIncrement(true); // Show the increment buttons after adding to cart
  };

  const handleIncrement = () => {
    setCartCount(cartCount + 1);
    // Update the cart count when the + button is clicked
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCartIndex = updatedCart.findIndex((item) => item.id === id);
    if (productInCartIndex !== -1) {
      updatedCart[productInCartIndex].quantity = cartCount + 1; // Update the quantity
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = () => {
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
    }
  };

  return (
    <div
      className="card"
      style={{
        width: "700px",
        margin: "50px auto",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      {product ? (
        <div>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "50%", height: "auto", marginLeft: "150px" }}
          />
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            {product.title}
          </h2>
          <p style={{ fontSize: "1rem" }}>Price: ${product.price}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "2px solid red",
              width: "268px",
              height: "30px",
            }}
          >
            {showIncrement ? ( // Show increment buttons when showIncrement is true
              <>
                <button onClick={handleDecrement} style={{ height: "30px" }}>
                  -
                </button>
                <p style={{ margin: "0 8px" }}>{cartCount}</p>
                <button
                  onClick={handleIncrement}
                  style={{ height: "30px" }}
                >
                  +
                </button>
              </>
            ) : (
              <button onClick={() => addToCart(id, cartCount)}>
                ADD TO CART
              </button>
            )}
          </div>
          <p style={{ fontSize: "1rem" }}>{product.description}</p>
          <p style={{ fontSize: "1rem" }}>Category: {product.category}</p>
          {isInCart ? (
            <button style={{ background: "red", color: "white" }}>
              Added to Cart
            </button>
          ) : null}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SingleItem;
