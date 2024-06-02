// src/ToDoList.js
import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ToDoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        description: taskDescription.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setTaskDescription('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask(task.text);
    setTaskDescription(task.description);
  };

  const handleUpdateTask = () => {
    setTasks(
      tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, text: newTask, description: taskDescription }
          : task
      )
    );
    setEditingTask(null);
    setNewTask('');
    setTaskDescription('');
  };

  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (editingTask ? handleUpdateTask() : handleAddTask())}
        />
        <textarea
          placeholder="Add a task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
          {editingTask ? 'Update' : 'Add'}
        </button>
      </div>
      <TransitionGroup className="task-list">
        {tasks.map((task) => (
          <CSSTransition
            key={task.id}
            timeout={500}
            classNames="task-item"
          >
            <li className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div onClick={() => handleToggleComplete(task.id)}>
                <h3>{task.text}</h3>
                <p>{task.description}</p>
              </div>
              <div>
                <button onClick={() => handleEditTask(task)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default TodoList;
