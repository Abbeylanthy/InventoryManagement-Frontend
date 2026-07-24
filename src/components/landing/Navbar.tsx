import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Inventory Management System
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <a href="#home" className="hover:text-blue-600">
            Home
          </a>

          <a href="#features" className="hover:text-blue-600">
            Features
          </a>

          <a href="#about" className="hover:text-blue-600">
            About
          </a>

          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">

          <div className="flex flex-col">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-gray-100"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-gray-100"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-gray-100"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-gray-100"
            >
              Contact
            </a>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 bg-blue-600 text-white"
            >
              Register
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}