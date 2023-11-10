import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './Components/firebase'; // Import your Firebase auth object
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
