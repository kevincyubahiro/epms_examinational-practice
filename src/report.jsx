import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navigation from './navigation';

const Report = () => {
  const [employees] = useState([
    { id: 1, name: 'Alice', department: 'HR', salary: 50000 },
    { id: 2, name: 'Bob', department: 'Engineering', salary: 80000 },
    { id: 3, name: 'Charlie', department: 'Marketing', salary: 60000 },
    { id: 4, name: 'David', department: 'Engineering', salary: 75000 },
    { id: 6, name: 'kevin', department: 'HR', salary: 55000 },
    { id: 7, name: 'keza', department: 'developer ', salary: 55000 },
    { id: 8, name: 'teta', department: 'designer', salary: 2000 },
    { id: 9, name: 'bayingana', department: 'photo editer', salary: 1000 },
    { id: 10, name: 'isimbi', department: 'firm directer', salary: 7000 },
    { id: 11, name: 'yvan', department: 'manager', salary: 78000 },
    { id: 12, name: 'alice', department: 'employee', salary: 22000 },
    { id: 13, name: 'emma', department: 'mackup', salary: 89000 },
    { id: 14, name: 'jonathan', department: 'hygiene', salary: 500 },
  ]);

  // Calculate total salary
  const totalSalary = employees.reduce((total, emp) => total + emp.salary, 0);

  const renderTableRows = () =>
    employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.department}</td>
        <td>${employee.salary.toLocaleString()}</td>
      </tr>
    ));

  return (
    <div className="container mt-5">
      <Link to='/navigation'>.</Link>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">
          <i className="bi bi-bar-chart-line-fill me-2"></i>
          Department and Salary Report
        </h3>
        <button className="btn btn-outline-dark" onClick={() => window.print()}>
          <i className="bi bi-printer me-2"></i> Print
        </button>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th><i className="bi bi-hash me-1"></i>ID</th>
              <th><i className="bi bi-person-fill me-1"></i>Name</th>
              <th><i className="bi bi-building me-1"></i>Department</th>
              <th><i className="bi bi-currency-dollar me-1"></i>Salary</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
            <tr className="table-white fw-bold">
              <td colSpan="3" className="text-end">Total Salary</td>
              <td>${totalSalary.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
