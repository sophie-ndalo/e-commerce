import React, { useState, useEffect, useRef } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaUser,
  FaHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../AuthContext";
import "./Account.css";

function Account() {
  const [authUser, setAuthUser] = useState(null);
  const [showList, setShowList] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const dropdownRef = useRef(null);

  const auth = getAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [auth]);

  useEffect(() => {
    if (currentUser) {
      setUserDisplayName(currentUser.displayName || currentUser.email);
    } else {
      setUserDisplayName("");
    }
  }, [currentUser]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setShowList(false);
  };

  return (
    <div className="account-wrapper">
      <button className="button-style" onClick={toggleList}>
        <FaUser className="icon-style" />
        {userDisplayName || "Account"}
        {showList ? (
          <FaAngleUp className="icon-style" />
        ) : (
          <FaAngleDown className="icon-style" />
        )}
      </button>
      {showList && (
        <ul className="list-style" ref={dropdownRef}>
          {authUser ? (
            <li>
              <button onClick={closeDropdown}>
                {userDisplayName && (
                  <Link to="/saveditems" style={{display:"flex", alignItems:"center"}}>
                    <FaHeart className="inner-icon" />
                    Saved Items
                  </Link>
                )}
                {userDisplayName && (
                  <Link to="/orders" style={{display:"flex", alignItems:"center"}}>
                    <FaShoppingBag className="inner-icon" />
                    Orders
                  </Link>
                )}
                {userDisplayName && (
                  <button className="sign-out" onClick={userSignOut}>
                    Sign Out
                  </button>
                )}
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button onClick={closeDropdown}>
                  SIGN IN
                </button>
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Account;
