import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Electronics from './Components/Electronics';
import Admin from './Components/Admin';
import SingleItem from './Components/SingleItem';
import SingleitemAdmin from './Components/SingleitemAdmin';
import Cart from './Components/Cart';
import Login from './Components/LogIn';
import SignUp from './Components/SignUp';
import UserInformationForm from './Components/UserInformationForm';
import { AuthProvider } from './AuthContext';
import Footer from './Components/Footer';
import SavedItems from './Components/SavedItems';
import Orders from './Components/Orders';

function App() {
  const location = useLocation();

  // Function to check if the current route is the login, signup, or userinformationform route
  const isSpecialRoute = () => {
    return location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/userinformationform';
  };

  return (
    <AuthProvider>
      <div className="App" style={{ backgroundColor: '#FAF9F6' }}>
        {!isSpecialRoute() && <Navbar />} {/* Render Navbar if not on special routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/product/:id" element={<SingleItem />} />
          <Route path="/productAdmin/:id" element={<SingleitemAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/saveditems" element={<SavedItems />} />
          <Route path="/myaccount" element={<Login />} />
          <Route path="/userinformationform" element={<UserInformationForm />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/authdetails" element={<AuthDetails />} /> */}
          {/* Add more routes here */}
        </Routes>
        {!isSpecialRoute() && <Footer />} {/* Render Footer if not on special routes */}
      </div>
    </AuthProvider>
  );
}

export default App;
