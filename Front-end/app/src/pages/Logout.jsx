import React, { useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();  // Call the logout function from context
      navigate("/");  // Redirect to the login page after logout
    };

    performLogout();
  }, [logout, navigate]);  // Include navigate in the dependency array

  return (
    <div className="container mt-5">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
