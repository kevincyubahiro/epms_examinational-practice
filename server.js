import mysql from 'mysql'
import cors from 'cors'
import express from 'express'
const app=express();
app.use(express.json());
app.use(cors());
 // conntect
 const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'epms',
    password:'',
 })
 db.connect((error)=>{
    if(error){
        console.log('failed')
    }
    else{
        console.log('connected')
    }
 })
 // insert
 app.post('/user',(req,res)=>{
    const{username,password}=req.body;
    const sql="INSERT INTO user(username,password)VALUES(?,?)"
    db.query(sql,[username,password],(error, result)=>{
        if(error)  return res.status(500).json('failed')
             return res.status(200).json(result)
    })
 })
 // login
 app.post('/userlogin',(req,res)=>{
    const{username,password}=req.body;
    const sql="SELECT * FROM user WHERE username=? AND password=?"
    db.query(sql,[username,password],(error, result)=>{
        if(error)  {
            return res.status(500).json('failed')
        }
        if(result.length===0){
            return res.status(401).json('Invalid Credentail')
        } return res.status(200).json('Login successfully')
            
    })
 }) ////////  employees ///////////////
 // Get all employees
app.get('/', (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new employee
app.post('/', (req, res) => {
  const { fname, lname, position, tel, gender, hdate } = req.body;
  const sql = `INSERT INTO employee (fname, lname, position, tel, gender, hdate) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [fname, lname, position, tel, gender, hdate], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Employee added', id: result.insertId });
  });
});

// Get single employee
app.get('/:id', (req, res) => {
  const sql = `SELECT * FROM employee WHERE e_n = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(result[0]);
  });
});

// Update employee
app.put('/:id', (req, res) => {
  const { fname, lname, position, tel, gender, hdate } = req.body;
  const sql = `UPDATE employee SET fname=?, lname=?, position=?, tel=?, gender=?, hdate=? WHERE e_n=?`;
  db.query(sql, [fname, lname, position, tel, gender, hdate, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee updated' });
  });
});

// Delete employee
app.delete('/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE e_n=?`;
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee deleted' });
  });
});



// Create salary record

// ✅ Get all salary records
app.get('/salaries', (req, res) => {
  const sql = 'SELECT * FROM salary';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch salaries' });
    res.status(200).json(results);
  });
});

// ✅ Add a new salary record
app.post('/salaries', (req, res) => {
  const { glosssarary, totaldededuction, netsalary, month } = req.body;

  if (!glosssarary || !totaldededuction || !netsalary || !month) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO salary (glosssarary, totaldededuction, netsalary, month) VALUES (?, ?, ?, ?)';
  db.query(sql, [glosssarary, totaldededuction, netsalary, month], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add salary' });
    res.status(201).json({ sid: result.insertId, glosssarary, totaldededuction, netsalary, month });
  });
});

// ✅ Update a salary record
app.put('/salaries/:sid', (req, res) => {
  const { id } = req.params;
  const { glosssarary, totaldededuction, netsalary, month } = req.body;

  if (!glosssarary || !totaldededuction || !netsalary || !month) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'UPDATE salary SET glosssarary = ?, totaldededuction = ?, netsalary = ?, month = ? WHERE sid = ?';
  db.query(sql, [glosssarary, totaldededuction, netsalary, month, sid], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update salary' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Salary record not found' });
    res.status(200).json({ message: 'Salary updated successfully' });
  });
});

// ✅ Delete a salary record
app.delete('/salaries/:sid', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM salary WHERE sid = ?';

  db.query(sql, [sid], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete salary' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Salary record not found' });
    res.status(200).json({ message: 'Salary deleted successfully' });
  });
});



// CREATE department
app.post('/department', (req, res) => {
  const { dcode, dname, gsalary } = req.body;
  const sql = 'INSERT INTO department (dcode, dname, gsalary) VALUES (?, ?, ?)';
  db.query(sql, [dcode, dname, gsalary], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, dcode, dname, gsalary });
  });
});

// READ all departments
app.get('/departments', (req, res) => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// READ one department by id
app.get('/department/:did', (req, res) => {
  const sql = 'SELECT * FROM department WHERE did = ?';
  db.query(sql, [req.params.did], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Not found');
    res.send(result[0]);
  });
});

// UPDATE department
app.put('/department/:did', (req, res) => {
  const { dcode, dname, gsalary } = req.body;
  const sql = 'UPDATE department SET dcode = ?, dname = ?, gsalary = ? WHERE did = ?';
  db.query(sql, [dcode, dname, gsalary, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Updated successfully');
  });
});

// DELETE department
app.delete('/department/:did', (req, res) => {
  const sql = 'DELETE FROM department WHERE did = ?';
  db.query(sql, [req.params.did], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Deleted successfully');
  });
});


/////////////////////////report ///////////
app.get('/salary/report', (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required' });
  }

  const sql = `
    SELECT 
      d.dname AS department,
      SUM(s.netsalary) AS total_salary,
      AVG(s.netsalary) AS average_salary,
      COUNT(e.e_n) AS total_employees
    FROM department d
    LEFT JOIN employee e ON e.department_id = d.did
    LEFT JOIN salary s ON s.e_n = e.e_n
    WHERE MONTH(s.month) = ? AND YEAR(s.month) = ?
    GROUP BY d.dname
    ORDER BY total_salary DESC;
  `;

  db.query(sql, [month, year], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});
app.listen(2000,()=>{
    console.log('http://localhost:2000')
})