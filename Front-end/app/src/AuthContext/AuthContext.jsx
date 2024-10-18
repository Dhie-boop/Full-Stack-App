import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Manage auth state
  const navigate = useNavigate();  // For redirecting the user after logout

  // Login function (placeholder for your actual login logic)
  const login = () => {
    setIsAuthenticated(true);  // Simulate successful login
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/logout/");  // Make the API call to log out
      setIsAuthenticated(false);  // Update the auth state
      navigate("/login");  // Redirect the user to the login page
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
