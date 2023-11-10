import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthDetails from '../AuthDetails'; // Update the import path to match the actual location of AuthDetails
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // New state to store errors
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
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
    <div style={{height: "900px"}} >
    <div style={{ backgroundColor: 'white', height: "400px", width: "600px", marginLeft: "600px", marginTop: "150px" }}>
      <main>
        <section>
          <div>
            <p>FocusApp</p>
             <form style={{marginTop: "50px"}}>
              <div style={{marginLeft: "50px" }}>
                <label htmlFor="email-address">Email address : </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ height: "30px", width: "400px", borderRadius: "5px", borderColor: "#7A4988" }}
                />
              </div>

              <div style={{marginLeft: "80px" }}>
                <label htmlFor="password" >Password : </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: "30px", width: "400px", marginTop: "40px",borderRadius: "5px", borderColor: "#7A4988"}}
                />
                <button type="button" onClick={togglePasswordVisibility} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                      {showPassword ?<FaEye /> : <FaEyeSlash /> }
                    </button>
              </div>

              <div style={{marginLeft: "250px", marginTop: '20px'}}>
                <button style={{height: "30px", width: '60px', borderRadius: "5px", backgroundColor: "#7A4988", color: "white"}} onClick={onLogin}>Login</button>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

            </form>

            <p style={{marginLeft: "200px" }} className="text-sm text-white text-center">
              No account yet?{' '}
              <NavLink to="/signup">Sign up</NavLink>
            </p>
          
          </div>
        </section>
      </main>
    </div>
    </div>
  );
};

export default Login;
