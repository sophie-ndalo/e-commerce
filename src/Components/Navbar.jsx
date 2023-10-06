import React from 'react'
import Search from './Search'
import Account from './Account'

function Navbar() {
  return (
    <nav>
        <div>
            <h1>Jumia Clone</h1>
            <Search/>
            <Account/>
        </div>
        
    </nav>
  )
}

export default Navbar