import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Electronics from './Components/Electronics';



function App() {
  return (
    <div className="App" style={{  backgroundColor: ""}}>
      <p>sell on jumia clone</p>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/electronics" element={<Electronics/>}/>
      
      {/* Add more routes here */}
    </Routes>
    </div>
  );
}

export default App;
