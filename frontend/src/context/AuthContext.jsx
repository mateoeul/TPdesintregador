import { createContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
