import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './navigation';
import Login from './login';
import Session from './session'
import Department from './department';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Salary from './salary';
import EmployeeManager from './employee';

import Report from './report';


function App() {
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
    <div className="d-flex flex-column min-vh-100">
      <Router>
       
        <div className="flex-grow-1">
          <Routes>
            {/* The default (home) route */}
            <Route path="/" element={<Session />} />
            <Route path="/navigation" element={<Navigation />} />
            {/* Login page */}
            <Route path="/login" element={<Login />} />
            <Route path="/department" element={<Department/>} />
            <Route path="/employee" element={<EmployeeManager />} />
            <Route path="/report" element={<Report />} />
            <Route path="/salary" element={<Salary />} />
          </Routes>
        </div>
      </Router>

      <h1 className="text-center text-primary mt-2" style={{marginBottom:'290px'}}>Welcome to Employee Payroll Management System</h1>

      {/* Footer */}
      <footer
        className={`footer ${darkMode ? 'bg-dark' : 'bg-success'} text-center py-3 mt-5`}
        style={{ position: 'relative', bottom: 0 }}
      >
        <div className="container mt-2">
          <p className="text-white mb-0">© 2025 Employee Payroll Management System</p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <a
              href="https://www.facebook.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://www.twitter.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
