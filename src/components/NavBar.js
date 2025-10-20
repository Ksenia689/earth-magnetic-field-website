import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExperimentsDropdownOpen, setIsExperimentsDropdownOpen] = useState(false);
  const [isTestsDropdownOpen, setIsTestsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const experimentsDropdownRef = useRef(null);
  const testsDropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsExperimentsDropdownOpen(false);
    setIsTestsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleExperimentsDropdown = () => {
    setIsExperimentsDropdownOpen(!isExperimentsDropdownOpen);
  };

  const toggleTestsDropdown = () => {
    setIsTestsDropdownOpen(!isTestsDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (experimentsDropdownRef.current && !experimentsDropdownRef.current.contains(event.target)) {
        setIsExperimentsDropdownOpen(false);
      }
      if (testsDropdownRef.current && !testsDropdownRef.current.contains(event.target)) {
        setIsTestsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Магнітне поле Землі</h2>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item dropdown" ref={dropdownRef}>
            <a 
              href="#knowledge-base" 
              className="navbar-link dropdown-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
            >
              База знань ▼
            </a>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
              <li className="dropdown-item">
                <a 
                  href="#origin" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Походження магнітного поля
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#measurement" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Методи вимірювання
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#topic3" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Магнітні аномалії
                </a>
              </li>
            </ul>
          </li>
          <li className="navbar-item dropdown" ref={experimentsDropdownRef}>
            <a 
              href="#experiments" 
              className="navbar-link dropdown-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleExperimentsDropdown();
              }}
            >
              Експерименти онлайн ▼
            </a>
            <ul className={`dropdown-menu ${isExperimentsDropdownOpen ? 'active' : ''}`}>
              <li className="dropdown-item">
                <a 
                  href="#horizon" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Симулятор горизонту
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#magnetic-anomalies-map" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Карта магнітних аномалій
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#mission-aurora" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Місія Аврора (Гра)
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#earth-magnetic-field" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Магнітне поле Землі
                </a>
              </li>
            </ul>
          </li>
          <li className="navbar-item dropdown" ref={testsDropdownRef}>
            <a 
              href="#tests" 
              className="navbar-link dropdown-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleTestsDropdown();
              }}
            >
              Тести та завдання ▼
            </a>
            <ul className={`dropdown-menu ${isTestsDropdownOpen ? 'active' : ''}`}>
              <li className="dropdown-item">
                <a 
                  href="#test1" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Тест 1
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#test2" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Тест 2
                </a>
              </li>
              <li className="dropdown-item">
                <a 
                  href="#test3" 
                  className="dropdown-link"
                  onClick={closeMenu}
                >
                  Тест 3
                </a>
              </li>
            </ul>
          </li>
          <li className="navbar-item">
            <a 
              href="#account" 
              className="navbar-link"
              onClick={closeMenu}
            >
              Особистий кабінет
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#mission-aurora" 
              className="navbar-link"
              onClick={closeMenu}
            >
               Гра
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
