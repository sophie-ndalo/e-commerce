import React from 'react'
import Search from './Search'
import Account from './Account'
import Cart from './Cart'


function Navbar() {
  return (
    <nav>
        <div>
            <h1>Jumia Clone</h1>
            <Search/>
            <Account/>
            <Cart/>
        </div>
        
    </nav>
  )
}

export default Navbar