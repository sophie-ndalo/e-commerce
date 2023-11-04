// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd2vXytKw3xZOWciZRPX7vctjPmBhzS0Y",
  authDomain: "jumia-clone-55d52.firebaseapp.com",
  projectId: "jumia-clone-55d52",
  storageBucket: "jumia-clone-55d52.appspot.com",
  messagingSenderId: "272695609456",
  appId: "1:272695609456:web:55e7c57a36ab6d1f1d8cb5",
  measurementId: "G-FXBBC9987H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export default app;