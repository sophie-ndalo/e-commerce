import React, { useState, useEffect, useRef } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaUser,
  FaRegHeart,
  FaCartArrowDown,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../AuthContext";

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

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "5px",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  const listStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "black",
    zIndex: 1,
    listStyle: "none",
    width: "220px",
    backgroundColor: "white",
    height: "180px",
  };

  return (
    <div
      style={{ position: "relative", marginTop: "5px", marginRight: "30px" }}
    >
      <button style={buttonStyle} onClick={toggleList}>
        <FaUser style={iconStyle} />
        {userDisplayName || "Account"}
        {showList ? (
          <FaAngleUp style={iconStyle} />
        ) : (
          <FaAngleDown style={iconStyle} />
        )}
      </button>
      {showList && (
        <ul style={listStyle} ref={dropdownRef}>
          {authUser ? (
            <li>
              <button
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  height: "30px",
                  width: "70px",
                }}
                onClick={closeDropdown}
              >
                {/* {userDisplayName && `Signed In as ${authUser.email}`} */}
                {userDisplayName && (
                  <Link to="/saveditems"> {/* Use Link for navigation */}
                    <li
                      style={{
                        marginTop: "20px",
                        width: "110px",
                        height: "30px",
                        borderRadius: "5px",
                        borderColor: "transparent",
                      }}
                    >
                       <FaHeart style={{marginRight: "15px", marginTop: "5px"}}/>
                      Saved Items
                    </li>
                  </Link>
                )}
                {userDisplayName && (
                  <button
                    onClick={userSignOut}
                    style={{
                      marginTop: "20px",
                      width: "100px",
                      height: "30px",
                      borderRadius: "5px",
                      borderColor: "transparent",
                    }}
                  >
                    Sign Out
                  </button>
                )}
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    backgroundColor: "red",
                    height: "30px",
                    width: "70px",
                  }}
                  onClick={closeDropdown}
                >
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
