import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    glosssarary: '',
    totaldededuction: '',
    netsalary: '',
    month: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchSalaries = async () => {
    try {
      const res = await axios.get('http://localhost:1000/salaries');
      setSalaries(res.data);
    } catch (err) {
      console.error('Error fetching salaries:', err);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:1000/salaries/${editId}`, form);
      } else {
        await axios.post('http://localhost:1000/salaries', form);
      }
      setForm({ glosssarary: '', totaldededuction: '', netsalary: '', month: '' });
      setEditId(null);
      fetchSalaries();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (salary) => {
    setForm(salary);
    setEditId(salary.sid);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/salaries/${id}`);
      fetchSalaries();
    } catch (err) {
      console.error('Error deleting salary:', err);
    }
  };

  return (
    <div className="container mt-5 salary-container">
      <h2 className="salary-header text-center">Salary Management</h2>
<Link to='/navigation' className=' btn btn-info m-2'>Back</Link>
      <form onSubmit={handleSubmit} className="salary-form mb-4 ">
        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <input type="number" className="form-control" placeholder="Gross Salary" name="glosssarary" value={form.glosssarary} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" placeholder="Total Deduction" name="totaldededuction" value={form.totaldededuction} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" placeholder="Net Salary" name="netsalary" value={form.netsalary} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" name="month" value={form.month} onChange={handleChange} required />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover salary-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Gross Salary</th>
            <th>Total Deduction</th>
            <th>Net Salary</th>
            <th>Month</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((s) => (
            <tr key={s.sid}>
              <td>{s.sid}</td>
              <td>{s.glosssarary}</td>
              <td>{s.totaldededuction}</td>
              <td>{s.netsalary}</td>
              <td>{s.month}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.sid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Salary;
