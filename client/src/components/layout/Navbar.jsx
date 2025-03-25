/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaBrain, FaToggleOff, FaToggleOn, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function Navbar({ setBackground }) {
  const [isOn, setIsOn] = useState(true);
  const { user, logout } = useAuth();

  const toggleBackground = () => {
    setIsOn(!isOn);
    setBackground((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-cyber-light border-b border-neon-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <FaBrain className="h-8 w-8 text-neon-blue" />
            <span className="text-2xl font-bold neon-text">NEURAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleBackground}
              className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 hover:text-neon-blue"
            >
              {isOn ? (
                <FaToggleOn className="h-8 w-8 text-neon-blue transition-all duration-300" />
              ) : (
                <FaToggleOff className="h-8 w-8 text-gray-500 transition-all duration-300" />
              )}
              <span className="text-sm font-medium">Particles</span>
            </button>
            {user ? (
              <>
                <span className="text-neon-blue">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-cyber-light border border-neon-pink hover:shadow-neon-pink transition-shadow"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-md bg-cyber-light border border-neon-pink hover:shadow-neon-pink transition-shadow"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-neon-blue text-cyber-dark hover:shadow-neon transition-shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
