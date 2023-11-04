import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // New state to store errors

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
    <div style={{ backgroundColor: 'red' }}>
      <main>
        <section>
          <div>
            <p>FocusApp</p>

            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button onClick={onLogin}>Login</button>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

            </form>

            <p className="text-sm text-white text-center">
              No account yet?{' '}
              <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
