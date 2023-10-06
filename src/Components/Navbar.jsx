import React from 'react'
import Search from './Search'
import Account from './Account'
import Cart from './Cart'
import {AiOutlineStar} from 'react-icons/ai'

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#7A4988"}}>
        <div>
            <h1>JUMIA CLONE
              <AiOutlineStar style={{ marginLeft: "1%"}}/>
            </h1>
            <Search/>
            <Account/>
            <Cart/>
        </div>
        
    </nav>
  )
}

export default Navbar