import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State to store error message

  const handleContinue = async () => {
    if (email && password) {
      try {
        // Attempt to create a new user with the provided email and password
        await createUserWithEmailAndPassword(auth, email, password);
        // If successful, navigate to the UserInformationForm
        navigate("/userinformationform");
      } catch (error) {
        // Handle the error and display a relevant message
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email address is already registered. Please sign in.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      }
    } else {
      // Display an error message if email or password is not provided
      setErrorMessage("Please provide both email and password.");
    }
  };
//   const handleUserInformationSubmit = (user) => {
//     // Handle the submission of user details here, e.g., send data to the server
//     // After successful submission, you can navigate to the login or another page
//     // Example:
//     // sendUserDataToServer(user)
//     // navigate("/login");
//   };
  
  const handleUserInformationSubmit = () => {
    // Handle user information submission here
    navigate("/login");
  };


  return (
    <div style={{ height: "900px" }}>
      <div
        style={{
          backgroundColor: "white",
          height: "400px",
          width: "600px",
          marginLeft: "600px",
          marginTop: "150px",
        }}
      >
        <main>
          <section>
            <div>
              <div>
                <p> FocusApp </p>
                <form style={{ marginTop: "50px" }}>
                  <div style={{ marginLeft: "50px" }}>
                    <label htmlFor="email-address">Email address : </label>
                    <input
                      type="email"
                      label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email address"
                      style={{ height: "30px", width: "400px", borderRadius: "5px", borderColor: "#7A4988" }}
                    />
                  </div>

                  <div style={{ marginLeft: "80px" }}>
                    <label htmlFor="password">Password : </label>
                    <input
                      type="password"
                      label="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                      style={{ height: "30px", width: "400px", marginTop: "40px", borderRadius: "5px", borderColor: "#7A4988" }}
                    />
                  </div>
                </form>
                <div style={{ marginLeft: "250px", marginTop: '20px' }}>
                  <button onClick={handleContinue} style={{ height: "30px", width: '100px', borderRadius: "5px", backgroundColor: "#7A4988", color: "white" }}>Continue</button>
                </div>
                {errorMessage && (
                  <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
                )}
                <p style={{ marginLeft: "100px" }}>
                  Already have an account?{" "}
                  <NavLink to="/login" onSubmit={handleUserInformationSubmit}>Sign in</NavLink>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Signup;
