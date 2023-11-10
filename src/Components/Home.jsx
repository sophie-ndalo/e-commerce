import React from 'react';
import Items from './Items';
import Cart from './Cart';
import Login from './auth/LogIn';
import SignIn from './auth/SignIn';
import AuthDetails from './AuthDetails';
import SignUp from './auth/SignUp';

function Home() {
  

  return (
    <div>
      {/* <Cart/> */}
     {/* <SignIn/>
      <SignUp/>
      <AuthDetails/> */}
      <Items />
    </div>
  );
}

export default Home;
