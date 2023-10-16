import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Electronics from './Components/Electronics';
import Admin from './Components/Admin';
import SingleItem from './Components/SingleItem';



function App() {
  return (
    <div className="App" style={{  backgroundColor: ""}}>
      <p>sell on jumia clone</p>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/electronics" element={<Electronics/>}/>
      <Route path="/Admin" element={<Admin/>}/>
      <Route path="/product/:id" element = { <SingleItem />} />
      {/* Add more routes here */}
    </Routes>
    </div>
  );
}

export default App;
