import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import User from '../data/User';
import cookie from "js-cookie"
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  function getUserFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const userJSON = cookie.get("user");
      return userJSON ? JSON.parse(userJSON) : null;
    }
    return null;
  }

  const [user, setUser] = useState(getUserFromLocalStorage() || null);

  function updateUser(user) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    setUser(user);
  }

  function clearUserFromLocalStorage() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
    }
    setUser(null);
    setIsLoggedIn(false);
  }

  function login(userData) {
    updateUser(userData);
    setIsLoggedIn(true);

    // Clear user data from local storage after 30 minutes
    setTimeout(() => {
      clearUserFromLocalStorage();
      setIsLoggedIn(false);
    }, 1800000); // 30 minutes in milliseconds

    router.push('/'); // Redirect to home page after successful login
    
  }

  useEffect(() => {
    let userFromLocalStorage = getUserFromLocalStorage();
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push('/');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, clearUserFromLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};
