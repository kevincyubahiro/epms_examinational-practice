import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    position: '',
    tel: '',
    gender: '',
    hdate: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all employees
  const fetchEmployees = () => {
    axios.get('http://localhost:2000')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const request = editMode
      ? axios.put(`http://localhost:2000/${editId}`, form)
      : axios.post('http://localhost:2000', form);

    request.then(() => {
      setForm({ fname: '', lname: '', position: '', tel: '', gender: '', hdate: '' });
      setEditMode(false);
      setEditId(null);
      fetchEmployees();
    });
  };

  // Handle edit
  const handleEdit = (employee) => {
    setForm({
      fname: employee.fname,
      lname: employee.lname,
      position: employee.position,
      tel: employee.tel,
      gender: employee.gender,
      hdate: employee.hdate
    });
    setEditMode(true);
    setEditId(employee.e_n);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:2000/${id}`)
        .then(() => fetchEmployees());
    }
  };

  return (
    <div className="container mt-4">
      <Link to='/navigation' className=' btn btn-info m-2'>Back</Link>
      <h2 className="text-center mb-4"><i className="bi bi-people-fill me-2"></i>Employee Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3">
          <i className={`bi ${editMode ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
          {editMode ? 'Edit Employee' : 'Add Employee'}
        </h4>
        {["fname", "lname", "position", "tel", "gender", "hdate"].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type={field === 'hdate' ? 'date' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button type="submit" className={`btn ${editMode ? 'btn-primary' : 'btn-success'}`}>
          <i className={`bi ${editMode ? 'bi-save' : 'bi-plus-lg'} me-2`}></i>
          {editMode ? 'Update Employee' : 'Add Employee'}
        </button>
        {editMode && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditMode(false);
              setForm({ fname: '', lname: '', position: '', tel: '', gender: '', hdate: '' });
              setEditId(null);
            }}
          >
            <i className="bi bi-x-circle me-1"></i>
            Cancel
          </button>
        )}
      </form>

      {/* Employee List */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Tel</th>
            <th>Gender</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="7" className="text-center">No employees found.</td></tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.e_n}>
                <td>{emp.e_n}</td>
                <td>{emp.fname} {emp.lname}</td>
                <td>{emp.position}</td>
                <td>{emp.tel}</td>
                <td>{emp.gender}</td>
                <td>{emp.hdate}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(emp)}>
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.e_n)}> Delete
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManager;
