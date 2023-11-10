import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserInformationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a user object with the collected data
    const user = {
      firstName,
      lastName,
      birthDate,
      shippingAddress,
    };

    // You can do something with the user data here (e.g., submit it to a server)
   
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
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
        />
      </div>

      <div>
        <label htmlFor="shipping-address">Shipping Address:</label>
        <textarea
          id="shipping-address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>

      {/* Add a Link to the login page */}
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
};

export default UserInformationForm;
