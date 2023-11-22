import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from 'react-icons/fa';

const UserInformationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSaveUserInfo = () => {
    // Save user information to local storage or any backend
    const userInfo = {
      firstName,
      lastName,
      birthDate,
      shippingAddress,
      phoneNumber,
    };
    // Example: Saving to local storage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields are filled before submission
    if (firstName && lastName && birthDate && shippingAddress && phoneNumber) {
      // Save user information
      handleSaveUserInfo();

      // Redirect to the delivery details page
      navigate("/deliverydetails");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginLeft: "455px", marginTop: "100px"}}>
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ marginLeft: "55px", width: "40%", height: "40px", borderRadius: "5px",marginTop: "50px" }}
          />
        </div>

        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ marginLeft: "55px", width: "40%", height: "40px", borderRadius: "5px",marginTop: "50px" }}
          />
        </div>

        <div>
          <label htmlFor="birth-date">Birth Date:</label>
          <input
            type="date"
            id="birth-date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            style={{ marginLeft: "55px", width: "40%", height: "40px", borderRadius: "5px",marginTop: "50px" }}
          />
        </div>

        <div>
          <label htmlFor="shipping-address">Shipping Address:</label>
          <textarea
            id="shipping-address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            style={{ marginLeft: "50px", width: "40%", borderRadius: "5px", marginTop: "50px" }}
          />
        </div>
        <div>
             <label htmlFor="phone-number">Phone Number</label>
             <input 
             type="text" 
             id="phone-number"
             value={phoneNumber}
             onChange={(e) => setPhoneNumber(e.target.value)}
             required
             style={{ marginLeft: "55px", width: "40%", height: "40px", borderRadius: "5px",marginTop: "50px" }}
         />

        </div>
        
      
        <div>
          <button
            type="submit"
            style={{
              marginLeft: "355px",
              width: "5%",
              height: "40px",
              borderRadius: "5px",
              backgroundColor: "#7A4988",
              color: "white",
              marginTop: "50px",
            }}
          >
            Submit
          </button>
        </div>
       {/* Add a Link to the home page */}
        <Link to="/">
          <p style={{color: "red"}}>
            <FaAngleLeft /> Back & Continue Shopping
          </p>
        </Link>
      </form>
    </div>
  );
};

export default UserInformationForm;
