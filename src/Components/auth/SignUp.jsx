import React, { useState } from "react";
import {auth} from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e)=> {
     e.preventDefault();
     createUserWithEmailAndPassword(auth,email,password)
     .then ((userCredential)=> {
        console.log(userCredential);
     })
     .catch((error)=> {
        console.log(error);
     });
  }

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create an account</h1>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
