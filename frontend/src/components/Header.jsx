import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button"; // Import the Button component

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Click handlers to navigate to Login and Signup pages
  const handleLogin = () => {
    navigate("/signin"); // Navigate to Signin page
    toggleMenu();
  };

  const handleSignup = () => {
    navigate("/signup"); // Navigate to Signup page
    toggleMenu();
  };

  return (
    <header className="bg-red-600 text-white p-4">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="max-md:w-full max-md:flex max-md:justify-between">
          {/* Brand Logo */}
          <div className="text-lg font-bold md:w-1/2">
            <NavLink to="/" className="hover:text-gray-300">
              MyWebsite
            </NavLink>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`max-md:${!isOpen && 'hidden'}`}>
          <ul className={`flex max-md:flex-col gap-3`}>
            <li className="py-2 md:py-0 md:mr-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="py-2 md:py-0 md:mr-4">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
                onClick={toggleMenu}
              >
                About
              </NavLink>
            </li>
            <li className="py-2 md:py-0 md:mr-4">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
            </li>
            <li className="py-2 md:py-0 md:mr-4">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300" : "hover:text-gray-300"
                }
                onClick={toggleMenu}
              >
                Services
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className={`${isOpen ? "" : "hidden"} md:flex space-x-4 max-md:mt-4`}
        >
          <Button
            text="Login"
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
            
          />
          <Button
            text="Signup"
            onClick={handleSignup}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
