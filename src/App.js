import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Electronics from './Components/Electronics';
import Admin from './Components/Admin';
import SingleItem from './Components/SingleItem';
import SingleitemAdmin from './Components/SingleitemAdmin';
import Cart from './Components/Cart';

function App() {
  return (
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
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default App;
