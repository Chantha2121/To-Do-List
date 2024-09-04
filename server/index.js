const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URIs
const mongoURITodo = 'mongodb://127.0.0.1:27017/Todo_list';
const mongoURIEmployee = 'mongodb://127.0.0.1:27017/employee';

// Connect to Todo database
const todoConnection = mongoose.createConnection(mongoURITodo, { useNewUrlParser: true, useUnifiedTopology: true });
todoConnection.on('connected', () => console.log('Connected to Todo database'));

// Connect to Employee database
const employeeConnection = mongoose.createConnection(mongoURIEmployee, { useNewUrlParser: true, useUnifiedTopology: true });
employeeConnection.on('connected', () => console.log('Connected to Employee database'));

app.use(cors());
app.use(bodyParser.json());

// Todo Schema and Model
const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  dueDate: String,
  createdDate: String
});
const Todo = todoConnection.model('Todo', TodoSchema);

// Employee Schema and Model
const EmployeeSchema = new mongoose.Schema({
  email: String,
  password: String
});
const EmployeeModel = employeeConnection.model('Employee', EmployeeSchema);

// Todo Routes
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
      dueDate: req.body.dueDate,
      createdDate: req.body.createdDate
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Employee Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json('Success');
        } else {
          res.json('The password is incorrect');
        }
      } else {
        res.json('No record exists');
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
