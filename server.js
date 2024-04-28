const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage for tasks
let tasks = [];

// Routes
// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description, status };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
