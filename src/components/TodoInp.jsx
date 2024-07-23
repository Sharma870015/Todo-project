import React, { useEffect, useState } from 'react';
import './TodoInp.css';

function TodoInp(props) {
  const [inputText, setInputText] = useState('');
  const [totalTodos, setTotalTodos] = useState(20);
  const [pendingTodos, setPendingTodos] = useState(9);
  const [completedTodos, setCompletedTodos] = useState(20);
  const [todos, setTodos] = useState([]); // State to store fetched todos

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleIncrementTotal = () => {
    setTotalTodos(totalTodos + 1);
    setPendingTodos(pendingTodos + 1);
    setCompletedTodos(completedTodos);
  };
// This is just apply for showing our latest Todo on top.
  const handleAddTodo = () => {
    const newTodo = {
      id: todos.top + 1,
      title: inputText,
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
    handleIncrementTotal();
  };

  return (
    <div className='main-div'>
      <header className='todo-head'>
        <h2 className='todo-title1'>{props.title}</h2>
      </header>
      <p className='todo-desc1'>{props.description}</p>
      <div className='for-input'>
        <input 
          className='for-input'
          type="text"
          placeholder='Enter todo here...'
          value={inputText}
          onChange={t => setInputText(t.target.value)}
        />
      </div>
      <div className='for-btn'>
        <button 
          className='Add-btn' 
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <span className='for-counting'>
        <h3 className='for-todos'>Total todos: {totalTodos}</h3>
        <h3 className='for-todos'>Pending todos: {pendingTodos}</h3>
        <h3 className='for-todos'>Completed todos: {completedTodos}</h3>
      </span>
      <div className='todo-list'>
        <ul>
          {todos.map(todo => (
            <li className='for-css' key={todo.id}>
              {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoInp;
