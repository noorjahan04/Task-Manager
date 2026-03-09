// AI-generated, reviewed and modified
import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > 100) {
      setError('Title must be less than 100 characters');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const result = await onAddTask({ title, priority });

    if (result.success) {
      setTitle('');
      setPriority('medium');

      // ✅ Popup message
      alert("✅ Task added successfully!");
    } else {
      setError(result.error || 'Failed to add task');
    }

    setIsSubmitting(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          disabled={isSubmitting}
          className="task-input"
        />
      </div>

      <div className="form-group">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isSubmitting}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-btn"
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;