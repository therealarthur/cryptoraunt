import React, { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("Test User");
  const [balance, setBalance] = useState("100");

  const value = {
    user,
    setUser,
    balance,
    setBalance,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};
