import { Link } from "react-router-dom";
import { FaBrain, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Navbar({ setBackground }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleBackground = () => {
    setIsOpen(!isOpen);
    setBackground((prev) => !prev);
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
              onClick={toggleBackground} // Call the toggle function
              className="px-4 py-2 rounded-md "
            >
              {isOpen ? (
                <FaToggleOn className="h-10 w-10 text-neon-blue" />
              ) : (
                <FaToggleOff className="h-10 w-10 text-neon-blue" />
              )}
            </button>
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
