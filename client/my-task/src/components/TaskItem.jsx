// AI-generated, reviewed and modified
import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const priorityColors = {
    high: '#ff6b6b',
    medium: '#feca57',
    low: '#48dbfb'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          className="task-checkbox"
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="task-details">
          <span className="task-title">{task.title}</span>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
        <span 
          className="task-priority"
          style={{ backgroundColor: priorityColors[task.priority] || '#999' }}
        >
          {task.priority}
        </span>
      </div>
      <button 
        onClick={() => onDelete(task._id)}
        className="delete-btn"
        aria-label="Delete task"
      >
        🗑️
      </button>
    </div>
  );
};

export default TaskItem;