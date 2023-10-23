// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
const UserContext = createContext();
import Cookies from 'js-cookie';


export function UserProvider({ children }) {


  const [user, setUser] = useState({});
  // Function to update user data

  const serializedUserObject = JSON.stringify(user);

  Cookies.set("userCookie",serializedUserObject)
  const updateUser = (newData) => {
    setUser(newData);
  };
  

  return (
    <UserContext.Provider value={{ user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}