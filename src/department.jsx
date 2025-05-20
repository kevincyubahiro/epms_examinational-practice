import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:2000';

function Department() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ dcode: '', dname: '', gsalary: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/departments`);
      setDepartments(res.data);
    } catch (err) {
      alert('Error fetching departments');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/department/${editingId}`, formData);
        alert('Department updated!');
      } else {
        await axios.post(`${API_BASE}/department`, formData);
        alert('Department created!');
      }
      setFormData({ dcode: '', dname: '', gsalary: '' });
      setEditingId(null);
      fetchDepartments();
    } catch (err) {
      alert('Error saving department');
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      dcode: dept.dcode,
      dname: dept.dname,
      gsalary: dept.gsalary
    });
    setEditingId(dept.did);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`${API_BASE}/department/${id}`);
        fetchDepartments();
      } catch (err) {
        alert('Error deleting department');
      }
    }
  };

  return (
    <div style={{ padding: '30px' }} >
        <Link to='/navigation' className=' btn btn-info m-2'>Back</Link>
      <h2 className='text-center'>{editingId ? 'Edit Department' : 'Add Department' }</h2>
      
      <form onSubmit={handleSubmit} className='text-center container '  style={{width:'600px',height:'300px'}} >
        <input
         className='form-control m-2 '
         style={{height:'40px'}}
          name="dcode"
          type="number"
          placeholder="Department Code"
          value={formData.dcode}
          onChange={handleChange}
          required
        />
        <input
        className='form-control m-2'
         style={{height:'40px'}}
          name="dname"
          type="text"
          placeholder="Department Name"
          value={formData.dname}
          onChange={handleChange}
          required
        />
        <input
        className='form-control  m-2'
         style={{height:'50px'}}
          name="gsalary"
          type="number"
          placeholder="Gross Salary"
          value={formData.gsalary}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setFormData({ dcode: '', dname: '', gsalary: '' });
          }}></button>
        )}
      </form>

      <h2>Departments</h2>
      <table border="1" cellPadding="8" className=' table table-striped'>
        <thead>
          <tr>
            <th className='text-white bg-dark'>ID</th>
            <th className='text-white bg-dark'>Code</th>
            <th className='text-white bg-dark'>Name</th>
            <th className='text-white bg-dark'>Gross Salary</th>
            <th className='text-white bg-dark'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept.did}>
              <td>{dept.did}</td>
              <td>{dept.dcode}</td>
              <td>{dept.dname}</td>
              <td>{dept.gsalary}</td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
                <button onClick={() => handleDelete(dept.did)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Department;
