import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';




function App() {
  return (
    <div className="App" style={{  backgroundColor: ""}}>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      
      
      {/* Add more routes here */}
    </Routes>
    </div>
  );
}

export default App;
