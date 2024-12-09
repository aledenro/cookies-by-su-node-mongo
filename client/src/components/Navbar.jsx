import React from "react";
import { Link } from "react-router-dom";
import { GiCookie } from "react-icons/gi";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth(); 

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-full px-8 py-3 z-50 border border-gray-200 w-11/12 max-w-6xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GiCookie className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-bold text-gray-800">Cookies by Su</span>
        </div>

        <ul className="flex space-x-8 text-sm font-medium text-gray-600">
          {!isAuthenticated && (
            <li>
              <Link to="/login" className="hover:text-gray-900 transition duration-300">
                Login
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link to="/order" className="hover:text-gray-900 transition duration-300">
                  Order
                </Link>
              </li>

              {user?.roles?.includes("Admin") && (
                <li>
                  <Link to="/admin-panel" className="hover:text-gray-900 transition duration-300">
                    Panel
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={logout}
                  className="hover:text-gray-900 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
