import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignup = async () => {
    if (email && confirmEmail && password && confirmPassword) {
      if (email !== confirmEmail) {
        setErrorMessage("Emails do not match. Please confirm your email.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please confirm your password.");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // You can add any additional logic here after successful signup
        // For example, redirect to another page or display a success message
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email address is already registered. Please sign in.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    } else {
      setErrorMessage("Please provide all required information.");
    }
  };

  return (
    <div style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
      <div style={{ height: '400px', width: '600px', backgroundColor: '#F8F6F0', borderRadius: '10px', padding: '20px' }}>
        <form style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', marginLeft: '50px' }}>
            <label htmlFor="email" style={{ marginBottom: '5px' }}>Email : </label>
            <input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{ height: '30px', width: '400px', borderRadius: '5px', borderColor: '#7A4988' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', marginLeft: '50px' }}>
            <label htmlFor="password" style={{ marginBottom: '5px' }}>Password : </label>
            <input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ height: '30px', width: '400px', borderRadius: '5px', borderColor: '#7A4988' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', marginLeft: '50px' }}>
            <label htmlFor="confirm-password" style={{ marginBottom: '5px' }}>Confirm Password : </label>
            <input
              type="password"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              style={{ height: '30px', width: '400px', borderRadius: '5px', borderColor: '#7A4988' }}
            />
          </div>

          <div style={{ marginLeft: '250px', marginTop: '20px' }}>
            <button style={{ height: '30px', width: '60px', borderRadius: '5px', backgroundColor: '#7A4988', color: 'white' }} onClick={handleSignup}>
              Signup
            </button>
          </div>

          {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
        </form>

        <p style={{ marginLeft: '200px', marginTop: '10px' }} className="text-sm text-white text-center">
          Already have an account?{' '}
          <NavLink to="/login">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
