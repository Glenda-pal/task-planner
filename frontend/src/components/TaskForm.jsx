import React, { useState, useEffect } from 'react';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'postponed', label: 'Postponed' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const formContainerStyle = {
  background: '#fff',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '2px 4px 8px rgba(0,0,0,0.05)',
  maxWidth: '400px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const labelStyle = {
  fontWeight: 500,
  marginBottom: '4px',
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '7px 10px',
  borderRadius: '4px',
  border: '1px solid #ced4da',
  fontSize: '1em',
  marginBottom: '10px',
  boxSizing: 'border-box',
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '10px',
};

const submitButtonStyle = {
  background: '#228be6',
  color: '#fff',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 600,
};

const cancelButtonStyle = {
  background: '#f1f3f5',
  color: '#495057',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 500,
};

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'todo',
    priority: 'medium',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date ? task.due_date.slice(0, 10) : '', // yyyy-mm-dd
        status: task.status || 'todo',
        priority: task.priority || 'medium',
      });
    }
  }, [task]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      <div>
        <label style={labelStyle} htmlFor="title">Title *</label>
        <input
          style={inputStyle}
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          autoFocus
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="description">Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: '64px' }}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="due_date">Due Date *</label>
        <input
          style={inputStyle}
          id="due_date"
          name="due_date"
          type="date"
          required
          value={formData.due_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="status">Status</label>
        <select
          style={inputStyle}
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {statusOptions.map(opt => (
            <option value={opt.value} key={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle} htmlFor="priority">Priority</label>
        <select
          style={inputStyle}
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          {priorityOptions.map(opt => (
            <option value={opt.value} key={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div style={buttonRowStyle}>
        <button
          type="button"
          style={cancelButtonStyle}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={submitButtonStyle}
        >
          {task ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
