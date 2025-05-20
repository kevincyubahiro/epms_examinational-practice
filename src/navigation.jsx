import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('bg-dark', savedMode);
    document.body.classList.toggle('text-white', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('bg-dark', newMode);
    document.body.classList.toggle('text-white', newMode);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark' : 'bg-success'} p-3`}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <i className="bi bi-briefcase-fill me-2"></i> Employee Payroll MS
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-3 align-items-center">
          <li className="nav-item">
            <Link to="/employee" className="nav-link text-white">
              <i className="bi bi-people-fill me-1"></i> Employee
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/department" className="nav-link text-white">
              <i className="bi bi-building me-1"></i> Department
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/salary" className="nav-link text-white">
              <i className="bi bi-cash-coin me-1"></i> Salary
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/report" className="nav-link text-white">
              <i className="bi bi-clipboard-data me-1"></i> Report
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </Link>
          </li>

          {/* Dark mode toggle button */}
          <li className="nav-item">
            <div className="form-check form-switch d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label htmlFor="darkModeToggle" className="form-check-label text-white ms-2">
                {darkMode ? (
                  <i className="bi bi-sun-fill"></i>
                ) : (
                  <i className="bi bi-moon-fill"></i>
                )}
              </label>
            </div>
            
          </li>
        </ul>
      </div>

    </nav>
    
  );
};

export default Navigation;
