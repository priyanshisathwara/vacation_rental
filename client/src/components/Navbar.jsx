import React from "react";
import { Link } from 'react-router-dom'
import "./navbar.css"; // Ensure your CSS file is linked

export default function Navbar() {
  return (
    <>
    <nav className="navbar">
    <div className="container">
        <div className="nav-left">
          <h1 className="logo">Vacation Rental</h1>
        </div>
        <div className="nav-center">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-item">Home</Link>
            </li>
            <li>
              <Link to="/about" className="nav-item">About</Link>
            </li>
            <li>
              <Link to="/services" className="nav-item">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-item">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <Link to="/register" className="signup-button">SignUp</Link>
        </div>
      </div>
    </nav>
    </>
  );
}
