import React, { createContext, useReducer } from "react";

// Create Context
export const ContextData = createContext();

// Reducer function for managing user state
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { name: "", email: "", userId: "", token: "", isAuthenticated: false };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  name: "",
  email: "",
  userId: "",
  token: "",
  isAuthenticated: false,
};

// Context Provider Component
const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <ContextData.Provider value={{ ...state, dispatch }}>
      {children}
    </ContextData.Provider>
  );
};

export default UserContext;
