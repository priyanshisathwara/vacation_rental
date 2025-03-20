import React from "react";
import "./Navbar.css"; // Ensure your CSS file is linked

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
        <a className="navbar-brand" href="#">VR</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>

          {/* Search form moved to the right */}
          <form className="form-inline search-container ml-auto">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-custom" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </>
  );
}
