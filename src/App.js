import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Electronics from './Components/Electronics';
import Admin from './Components/Admin';
import SingleItem from './Components/SingleItem';
import SingleitemAdmin from './Components/SingleitemAdmin';
import Cart from './Components/Cart';
import Login from './Components/auth/LogIn';
import SignUp from './Components/SignUp';
import UserInformationForm from './Components/UserInformationForm';
import { AuthProvider } from './AuthContext';
import LogOut from './Components/LogOut';
import AuthDetails from './Components/AuthDetails';
import SavedItems from './Components/SavedItems';

function App() {
  return (
    <AuthProvider>
    <div className="App" style={{ backgroundColor: '#FAF9F6' }}>
      <p>sell on jumia clone</p>
      <Navbar />
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
        <Route path="/orders" element={<Login />} />
        <Route path="/myaccount" element={<Login />} />
        <Route path="/userinformationform" element={<UserInformationForm />} />
        {/* <Route path="/authdetails" element={<AuthDetails />} /> */}

        {/* Add more routes here */}
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
