import React from 'react';
import TaskItem from './TaskItem';

const containerStyle = {
  maxWidth: '460px',
  margin: '0 auto',
  padding: '24px 0',
  display: 'flex',
  flexDirection: 'column',
};

const emptyStyle = {
  color: '#868e96',
  textAlign: 'center',
  padding: '32px 0',
  fontSize: '1.12em',
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div style={containerStyle}>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))
      ) : (
        <div style={emptyStyle}>Nessun task trovato</div>
      )}
    </div>
  );
};

export default TaskList;
