// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch { return null; }
  });

  // on mount, if token exists but no user, try to fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      API.get("/profile")
        .then(res => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => {
          // invalid token: clear
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, [user]);

  const setAuthUser = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  // clear auth (used by logout)
  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
