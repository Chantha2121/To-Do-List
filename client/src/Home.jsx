import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Navbar from './Narbar';
import Footer from './Footer';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = {
      text: newTodo,
      completed: false,
      dueDate: newTodoDueDate,
      createdDate: new Date().toISOString().split('T')[0]
    };
    axios.post('http://localhost:5000/api/todos', newTodoItem)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error(error));
    setNewTodo('');
    setNewTodoDueDate('');
  };

  const handleCompleteTodo = (index) => {
    const updatedTodo = { ...todos[index], completed: !todos[index].completed };
    axios.put(`http://localhost:5000/api/todos/${todos[index]._id}`, updatedTodo)
      .then(response => {
        const newTodos = [...todos];
        newTodos[index] = response.data;
        setTodos(newTodos);
      })
      .catch(error => console.error(error));
  };

  const handleDeleteTodo = (index) => {
    axios.delete(`http://localhost:5000/api/todos/${todos[index]._id}`)
      .then(() => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      })
      .catch(error => console.error(error));
  };

  const handleEditTodo = (index) => {
    setIsEditing(true);
    setCurrentTodo({
      index,
      ...todos[index]
    });
  };

  const handleUpdateTodo = () => {
    if (currentTodo.text.trim() === '') return;
    axios.put(`http://localhost:5000/api/todos/${currentTodo._id}`, currentTodo)
      .then(response => {
        const newTodos = [...todos];
        newTodos[currentTodo.index] = response.data;
        setTodos(newTodos);
        setIsEditing(false);
        setCurrentTodo(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className=' bg-black h-auto'>
      <Navbar/>
      <section className="" >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card" id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
                <div className="card-body py-4 px-4 px-md-5" style={{backgroundColor:'#CCFFFF'}}>
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <i className="fas fa-check-square me-1"></i>
                    <u>My Do list</u>
                  </p>
                  <div className="pb-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            id="exampleFormControlInput1"
                            placeholder="Add new..."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                          />
                          <input
                            type="date"
                            className="form-control form-control-lg mx-2"
                            value={newTodoDueDate}
                            onChange={(e) => setNewTodoDueDate(e.target.value)}
                          />
                          <div>
                            <button 
                              type="button" 
                              data-mdb-button-init 
                              data-mdb-ripple-init 
                              className="btn btn-primary"
                              onClick={handleAddTodo}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4"/>
                  {isEditing && (
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            value={currentTodo.text}
                            onChange={(e) => setCurrentTodo({
                              ...currentTodo,
                              text: e.target.value
                            })}
                          />
                          <input
                            type="date"
                            className="form-control form-control-lg mx-2"
                            value={currentTodo.dueDate || ''}
                            onChange={(e) => setCurrentTodo({
                              ...currentTodo,
                              dueDate: e.target.value
                            })}
                          />
                          <div>
                            <button 
                              type="button" 
                              data-mdb-button-init 
                              data-mdb-ripple-init 
                              className="btn btn-success"
                              style={{fontSize:'10px'}}
                              onClick={handleUpdateTodo}
                            >
                              Update
                            </button>
                            <button 
                              type="button" 
                              data-mdb-button-init 
                              data-mdb-ripple-init 
                              className="btn btn-secondary mt-2"
                              onClick={() => setIsEditing(false)}
                              style={{fontSize:'10px'}}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select data-mdb-select-init className="form-select me-2">
                      <option value="1">All</option>
                      <option value="2">Completed</option>
                      <option value="3">Active</option>
                      <option value="4">Has due date</option>
                    </select>
                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select data-mdb-select-init className="form-select">
                      <option value="1">Added date</option>
                      <option value="2">Due date</option>
                    </select>
                    <a href="#!" style={{ color: '#23af89' }} data-mdb-tooltip-init title="Ascending">
                      <i className="fas fa-sort-amount-down-alt ms-2"></i>
                    </a>
                  </div>
                  {todos.map((todo, index) => (
                    <ul className="list-group list-group-horizontal rounded-0 bg-transparent mb-2" key={index}>
                      <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                        <div className="form-check">
                          <input 
                            className="form-check-input me-0" 
                            type="checkbox" 
                            value="" 
                            id={`flexCheckChecked${index}`}
                            checked={todo.completed} 
                            onChange={() => handleCompleteTodo(index)}
                          />
                        </div>
                      </li>
                      <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                        <p className={`lead fw-normal mb-0 ${todo.completed ? 'text-decoration-line-through' : ''}`}>{todo.text}</p>
                      </li>
                      {todo.dueDate && (
                        <li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                          <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-body-tertiary">
                            <p className="small mb-0">
                              <a href="#!" data-mdb-tooltip-init title="Due on date">
                                <i className="fas fa-hourglass-half me-2 text-warning"></i>
                              </a>
                              {todo.dueDate}
                            </p>
                          </div>
                        </li>
                      )}
                      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                        <div className="d-flex flex-row justify-content-end mb-1">
                          <a href="#!" className="text-info" data-mdb-tooltip-init title="Edit todo" onClick={() => handleEditTodo(index)}>
                            <i className="fas fa-pencil-alt me-3"></i>
                          </a>
                          <a href="#!" className="text-danger" data-mdb-tooltip-init title="Delete todo" onClick={() => handleDeleteTodo(index)}>
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </div>
                        <div className="text-end text-muted">
                          <a href="#!" className="text-muted" data-mdb-tooltip-init title="Created date">
                            <p className="small mb-0">
                              <i className="fas fa-info-circle me-2"></i>
                              {todo.createdDate}
                            </p>
                          </a>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Home;
