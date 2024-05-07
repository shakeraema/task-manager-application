// const express = require('express');
// const app = express();
// // const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');
// const PORT = 3000;

// const router = express.Router();

// const mysql = require('mysql');
// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database:'tasks'
// });

// con.connect((err)=>{
//     if(err) {
//         console.error('Error connecting to database:', err);
//         process.exit(1);
//         return;
//     }
//     console.log('Connected');
//     // con.query("Create Database nodemysql", function(err,result){
//     //     if(err) throw err;
//     //     console.log("Database is Created");
//     // })
// });
// // Handle MySQL connection errors
// // connection.on('error', (err) => {
// //     console.error('MySQL error:', err);
// // });

// con.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//         console.error('Error executing query:', err);
//         // Handle query execution error
//         return;
//     }
//     // Process query results
//     console.log('Query results:', results);
// });

// // Close the connection when the application exits
// process.on('exit', () => {
//     console.log('Closing MySQL connection');
//     con.end(); // Close the MySQL connection
// });

// // Middleware to parse JSON requests
// app.use(express.json());



// // In-memory storage for tasks
// let tasks = [];

// // Routes
// app.use('/auth', authRoutes);
// // Create a new task
// app.post('/tasks', (req, res) => {
//     const { title, description, status } = req.body;
//     const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
//     con.query(sql, [title, description, status], (err, result) => {
//       if (err) {
//         console.error('Error creating task:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       res.status(201).json({ id: result.insertId, title, description, status });
//     });
//   });
  
//   // Get all tasks
//   app.get('/tasks', (req, res) => {
//     const sql = 'SELECT * FROM tasks';
//     con.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error fetching tasks:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       res.json(results);
//     });
//   });
  
//   // Update a task by ID
//   app.put('/tasks/:id', (req, res) => {
//     const taskId = req.params.id;
//     const { title, description, status } = req.body;
//     const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
//     con.query(sql, [title, description, status, taskId], (err, result) => {
//       if (err) {
//         console.error('Error updating task:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'Task not found' });
//         return;
//       }
//       res.json({ id: taskId, title, description, status });
//     });
//   });
  
//   // Delete a task by ID
//   app.delete('/tasks/:id', (req, res) => {
//     const taskId = req.params.id;
//     const sql = 'DELETE FROM tasks WHERE id = ?';
//     con.query(sql, taskId, (err, result) => {
//       if (err) {
//         console.error('Error deleting task:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'Task not found' });
//         return;
//       }
//       res.status(204).end();
//     });
//   });
  
// // Start the server
// // const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log('Server is running on port '+ PORT);
// });
const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasks'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Database is connected');
});

// Routes
// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
  connection.query(sql, [title, description, status], (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ id: result.insertId, title, description, status });
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  connection.query(sql, [title, description, status, taskId], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ id: taskId, title, description, status });
  });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  connection.query(sql, taskId, (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).end();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});