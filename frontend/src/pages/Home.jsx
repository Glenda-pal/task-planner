import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CalendarView from '../components/CalendarView';

const headerStyle = {
  textAlign: 'center',
  margin: '30px 0 18px 0',
  fontSize: '2.2em',
  fontWeight: 700,
  letterSpacing: '1px',
  color: '#4263eb',
};

const topBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '18px',
  marginBottom: '28px',
  flexWrap: 'wrap',
};

const buttonStyle = {
  padding: '8px 18px',
  border: 'none',
  borderRadius: '5px',
  background: '#4263eb',
  color: '#fff',
  fontWeight: 600,
  fontSize: '1em',
  cursor: 'pointer',
  boxShadow: '0 1px 4px #eef1ff',
};

const toggleButtonStyle = (active) => ({
  ...buttonStyle,
  background: active ? '#1c7ed6' : '#e7f5ff',
  color: active ? '#fff' : '#4263eb',
  border: active ? '2px solid #4263eb' : '1px solid #d0d7df',
  boxShadow: active ? '0 2px 8px #e7f1ff' : 'none',
});

const selectStyle = {
  padding: '8px 14px',
  borderRadius: '4px',
  border: '1px solid #cfd8df',
  fontSize: '1em',
  minWidth: '130px',
  background: '#f8fafc',
  color: '#333',
  outline: 'none',
};

const formContainerStyle = {
  maxWidth: 480,
  margin: '0 auto 32px auto',
  padding: '25px',
  background: '#f8fafc',
  borderRadius: '12px',
  boxShadow: '0 2px 12px #f1f3f8',
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'todo' | ...

  // Carica tasks dal server/apply filter
  const loadTasks = async () => {
    try {
      let allTasks = await api.getTasks();
      if (filterStatus !== 'all') {
        allTasks = allTasks.filter((t) => t.status === filterStatus);
      }
      setTasks(allTasks);
    } catch (err) {
      setTasks([]); // fallback
      // Optionally handle/display error
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, [filterStatus]);

  // Mostra form vuoto per nuovo task
  const handleCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Mostra form per editare task esistente
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Crea o aggiorna il task, poi ricarica la lista
  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await api.updateTask(editingTask.id, taskData);
      } else {
        await api.createTask(taskData);
      }
      setShowForm(false);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      // Optionally handle/display error
    }
  };

  // Cancella il task, ricarica
  const handleDelete = async (task) => {
    if (window.confirm('Sei sicuro di voler eliminare questo task?')) {
      try {
        await api.deleteTask(task.id);
        await loadTasks();
      } catch (err) {
        // Optionally handle/display error
      }
    }
  };

  // Chiude il form senza salvare
  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Selettore stato tasks
  const statusOptions = [
    { value: 'all', label: 'Tutti' },
    { value: 'todo', label: 'Da fare' },
    { value: 'in_progress', label: 'In corso' },
    { value: 'done', label: 'Completati' },
    { value: 'postponed', label: 'Rinviati' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', paddingBottom: '44px' }}>
      <div style={headerStyle}>Task Planner</div>
      <div style={topBarStyle}>
        <button style={buttonStyle} onClick={handleCreate}>
          Nuovo Task
        </button>
        <select
          style={selectStyle}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statusOptions.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button
            style={toggleButtonStyle(viewMode === 'list')}
            onClick={() => setViewMode('list')}
          >
            Lista
          </button>
          <button
            style={toggleButtonStyle(viewMode === 'calendar')}
            onClick={() => setViewMode('calendar')}
          >
            Calendario
          </button>
        </div>
      </div>
      {showForm && (
        <div style={formContainerStyle}>
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
      <div>
        {viewMode === 'list' ? (
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <CalendarView
              tasks={tasks}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
