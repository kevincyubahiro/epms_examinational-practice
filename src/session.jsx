import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate, Link  } from 'react-router-dom';
import { useEffect } from 'react';

const Session = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 useEffect(() => window.onpopstate = () => history.go(1), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }
 window.onpopstate = () => history.go(1);
    axios.post('http://localhost:2000/userlogin', { username, password })
      .then(res => {
        navigate('/navigation');
      })
      .catch(error => {
        alert('Invalid credentials. Please create an account.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="p-4 rounded shadow bg-white" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Login</h3>

        {/* Username Field */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-success w-100 mb-2">
          <i className="bi bi-box-arrow-in-right me-2"></i>Login
        </button>

        {/* Signup Link */}
        <div className="text-center">
          <Link to="/login">Don't have an account? Create one</Link>
        </div>
      </form>
    </div>
  );
};

export default Session;
