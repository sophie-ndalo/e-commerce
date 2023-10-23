import React, {useState} from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import SingleItem from './SingleItem';
import Cart from './Cart';

function Items({ products, cart, setCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    // Add the selected product to the cart
    setCart([...cart, product]);
  };

  const handleSearch = (query) => {
    // Handle search functionality if needed
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length <= maxLength) {
      return text;
    }
    return words.slice(0, maxLength).join(' ') + '...';
  };

  const productListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '100px',
  };

  return (
    <div>
      <Cart cart={cart} setCart={setCart} />
      <div className="product-listings">
        <Search onSearch={handleSearch} />
        <div style={productListStyle}>
          {products.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
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
                onClick={() => handleProductClick(product)}
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
                  {truncateText(product.title, 3)}
                </h2>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Price: ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {selectedProduct && <SingleItem />}
    </div>
  );
}

export default Items;
