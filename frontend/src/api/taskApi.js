import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

export const fetchTasks = (filters = {}) => {
  const params = {};
  if (filters.priority) params.priority = filters.priority;
  if (filters.status) params.status = filters.status;
  return axios.get(API_BASE_URL, { params });
};

export const createTask = (taskData) => axios.post(API_BASE_URL, taskData);

export const updateTask = (id, taskData) => axios.put(`${API_BASE_URL}/${id}`, taskData);

export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
