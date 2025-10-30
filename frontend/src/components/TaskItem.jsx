import React from 'react';

const statusColors = {
  todo: '#ffe066', // giallo
  in_progress: '#74c0fc', // blu
  done: '#69db7c', // verde
  postponed: '#adb5bd', // grigio
};

const TaskItem = ({ task, onEdit, onDelete }) => {
  const {
    title,
    description,
    due_date,
    status,
    priority
  } = task;

  const cardStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '2px 4px 8px rgba(0,0,0,0.03)',
    background: '#fff',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const descStyle = {
    color: '#6c757d',
    margin: '4px 0',
  };

  const badgeStyle = {
    display: 'inline-block',
    background: statusColors[status] || '#adb5bd',
    color: '#222',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: '0.85em',
    fontWeight: 600,
    minWidth: '70px',
    textAlign: 'center',
    marginRight: '8px'
  };

  const buttonStyle = {
    marginLeft: '8px',
    padding: '4px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500
  };

  const editButtonStyle = {
    ...buttonStyle,
    background: '#e7f5ff',
    color: '#1c7ed6'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: '#ffe3e3',
    color: '#fa5252'
  };

  return (
    <div style={cardStyle}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <h3 style={{margin: 0}}>{title}</h3>
        <div>
          <button style={editButtonStyle} onClick={() => onEdit(task)}>Edit</button>
          <button style={deleteButtonStyle} onClick={() => onDelete(task)}>Delete</button>
        </div>
      </div>
      <p style={descStyle}>{description}</p>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'}}>
        <span style={badgeStyle}>{status.replace('_', ' ')}</span>
        <span style={{color: '#495057', fontSize: '0.95em'}}>Due: {due_date ? new Date(due_date).toLocaleDateString() : '-'}</span>
        <span style={{marginLeft: 'auto', color: '#868e96'}}>Priority: <b>{priority}</b></span>
      </div>
    </div>
  );
};

export default TaskItem;
