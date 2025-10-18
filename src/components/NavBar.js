import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Earth Magnetic Field</h2>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a 
              href="#home" 
              className="navbar-link"
              onClick={closeMenu}
            >
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#about" 
              className="navbar-link"
              onClick={closeMenu}
            >
              About
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#magnetic-field" 
              className="navbar-link"
              onClick={closeMenu}
            >
              Magnetic Field
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#visualization" 
              className="navbar-link"
              onClick={closeMenu}
            >
              Visualization
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#data" 
              className="navbar-link"
              onClick={closeMenu}
            >
              Data
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#contact" 
              className="navbar-link"
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>
        </ul>
        
        <div 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
