import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Electronics from './Components/Electronics';
import Admin from './Components/Admin';
import SingleItem from './Components/SingleItem';
import SingleitemAdmin from './Components/SingleitemAdmin'; // Import SingleitemAdmin component
import Cart from './Components/Cart';
function App() {
  return (
    <div className="App" style={{ backgroundColor: "" }}>
      <p>sell on jumia clone</p>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/product/:id" element={<SingleItem />} />
        <Route path="/productAdmin/:id" element={<SingleitemAdmin />} /> {/* Add SingleitemAdmin route */}
        {/* Add more routes here */}
      </Routes>
    </div>
  );
}

export default App;
