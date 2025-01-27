import React, { createContext, useState } from "react";

// Create the Context
export const ContextData = createContext();

const UserContext = ({ children }) => {
  // Define state for user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ContextData.Provider value={{ user, setUser }}>
      {children}
    </ContextData.Provider>
  );
};

export default UserContext;
