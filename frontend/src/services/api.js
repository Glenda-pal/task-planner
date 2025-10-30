import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

async function getTasks(params = {}) {
  try {
    const response = await api.get('/tasks', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

async function getTask(id) {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
}

async function createTask(taskData) {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

async function updateTask(id, taskData) {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
}

async function deleteTask(id) {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
}

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
