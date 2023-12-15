import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Update the path accordingly

function PaymentMethods() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cart, setCart] = useState([]);
  const auth = useAuth(); // Assuming you have a useAuth hook to check authentication status
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  
  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const redirectTo = auth.currentUser ? "/userinformationform" : "/login";
    navigate(redirectTo);
  };

  return (
    <div>
      <h2>Payment Methods</h2>

      <div>
        <label>
          <input
            type="radio"
            value="Mobile Money"
            checked={selectedPayment === 'Mobile Money'}
            onChange={handlePaymentChange}
          />
          Mobile Money
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="Bank Card"
            checked={selectedPayment === 'Bank Card'}
            onChange={handlePaymentChange}
          />
          Bank Card
        </label>
      </div>

      <p>Selected Payment Method: {selectedPayment}</p>

      <div style={{ display: "flex", marginTop: "100px" }}>

        <div style={{ display: "flex", flexDirection: "column", width: "30%", height: "300px", backgroundColor: "white", borderRadius: "10px", marginLeft: "10px", justifyContent: "space-between" }}>
          <p style={{ textAlign: "right", marginRight: "400px" }}>ORDER SUMMARY</p>
          <p style={{ textAlign: "right", marginRight: "450px" }}>Subtotal:</p>
          <p style={{ marginLeft: "450px", marginTop: "-125px" }}>${totalCartPrice.toFixed(2)}</p>
          <button style={{ marginLeft: "180px", width: "200px", height: "60px", marginBottom: "20px", borderRadius: "5px", backgroundColor: "#7A4988", fontSize: "18px", color: "white", fontFamily: "'Roboto Slab', serif" }}>Confirm Order (${totalCartPrice.toFixed(2)})</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;
