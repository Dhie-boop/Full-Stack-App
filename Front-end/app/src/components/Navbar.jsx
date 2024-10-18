import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext"; // Import AuthContext

const Navbar = () => {
  const location = useLocation(); // Hook to get current location
  const { isAuthenticated } = useContext(AuthContext); // Get auth state from context

  const isActive = (path) => location.pathname === path; // Helper function to check active route

  return (
    <nav className="bg-white shadow-sm">
      <div className="py-4 px-5 flex justify-between items-center">
        <Link className="text-3xl font-bold no-underline text-gray-700" to="/">
          ProjectM
        </Link>

        <div className="">
          <ul className="flex justify-between items-center gap-5 no-underline font-semibold">
            {/* Show links for both authenticated and non-authenticated users */}
            <li className="hover:scale-105 transition-all duration-300">
              <Link
                className={`${
                  isActive("/") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="hover:scale-105 transition-all duration-300">
              <Link
                className={`${
                  isActive("/about") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="hover:scale-105 transition-all duration-300">
              <Link
                className={`${
                  isActive("/projects") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                to="/projects"
              >
                Projects
              </Link>
            </li>

            {/* Links for non-authenticated users only */}
            {!isAuthenticated && (
              <>
                <li className="hover:scale-105 transition-all duration-300">
                  <Link
                    className={`${
                      isActive("/login") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                    } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="hover:scale-105 transition-all duration-300">
                  <Link
                    className={`${
                      isActive("/signup") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                    } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}

            {/* Links for authenticated users only */}
            {isAuthenticated && (
              <>
                <li className="hover:scale-105 transition-all duration-300">
                  <Link
                    className={`${
                      isActive("/dashboard") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                    } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="hover:scale-105 transition-all duration-300">
                  <Link
                    className={`${
                      isActive("/user-projects") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                    } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                    to="/user-projects"
                  >
                    User Projects
                  </Link>
                </li>
                <li className="hover:scale-105 transition-all duration-300">
                  <Link
                    className={`${
                      isActive("/create-project") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                    } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                    to="/create-project"
                  >
                    Create Project
                  </Link>
                </li>
                <li className="hover:scale-105 transition-all duration-300">
                  <Link
                    className={`${
                      isActive("/logout") ? "bg-gray-700 text-white" : "text-blue-500 border-2"
                    } px-3 py-2 rounded-full text-gray-700 border-gray-300`}
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
