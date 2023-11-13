import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = (e) => {
    e.preventDefault();
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          setError('User not found. Please check your email or sign up.');
        } else {
          setError(error.message);
        }
        console.error(errorCode, error.message);
      });
  };

  return (
    <div style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}>
      <div style={{ height: '400px', width: '600px', backgroundColor: '#F8F6F0', borderRadius: '10px', padding: '20px' }}>
        <p>FocusApp</p>
        <form style={{ marginTop: '50px' }}>
          <div style={{ marginLeft: '50px' }}>
            <label htmlFor="email-address">Email address : </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: '30px', width: '400px', borderRadius: '5px', borderColor: '#7A4988' }}
            />
          </div>

          <div style={{ marginLeft: '80px' }}>
            <label htmlFor="password">Password : </label>
            <input
              id="password"
              name="password"
              type="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: '30px', width: '400px', marginTop: '40px', borderRadius: '5px', borderColor: '#7A4988' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? <FaEye style={{ fontSize: '15px' }} /> : <FaEyeSlash style={{ fontSize: '15px' }} />}
            </button>
          </div>

          <div style={{ marginLeft: '250px', marginTop: '20px' }}>
            <button style={{ height: '30px', width: '60px', borderRadius: '5px', backgroundColor: '#7A4988', color: 'white' }} onClick={onLogin}>
              Login
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>

        <p style={{ marginLeft: '200px' }} className="text-sm text-white text-center">
          No account yet?{' '}
          <NavLink to="/signup">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
