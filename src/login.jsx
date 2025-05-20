import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:2000/user', {
        username,
        password,
      });

      if (res.status === 200) {
        alert('Registration successful');
        navigate('/'); // Navigate to home or dashboard
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      alert('An error occurred during registration');
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        className="p-4 rounded shadow bg-white"
        style={{ width: '100%', maxWidth: '400px' }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4">Register</h3>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
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

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
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

        <button type="submit" className="btn btn-success w-100">
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
