import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  return (
    
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="black-text">Vacation</span>
        <span className="blue-text">Rental.</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-link-detail">
      <ul className="nav-links">
        <a href="/"> <li className="active">Home</li></a>
        <Link to="/about-us">About Us</Link>

        <li
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          Destinations <IoMdArrowDropdown className="dropdown-icon" />
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="/destinations/beach">Beach Resorts</a></li>
              <li><a href="/destinations/mountain">Mountain Cabins</a></li>
              <li><a href="/destinations/city">City Apartments</a></li>
            </ul>
          )}
        </li>

        <a href="/experiences"><li>Experiences</li></a>
        <a href="/blog"><li>Blog</li></a>
        <a href="/faqs"><li>FAQs</li></a>
      </ul>
      </div>

      {/* Register Button */}
      <div className="nav-actions">
      <button className="register-btn" onClick={() => navigate("/register")}>
        Register
      </button>
      </div>
    </nav>
  );
}