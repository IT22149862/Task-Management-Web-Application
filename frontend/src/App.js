import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import * as taskApi from './api/taskApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: '', status: '' });

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await taskApi.fetchTasks(filters);
      setTasks(res.data.data);
    } catch (err) {
      setError('Failed to load tasks. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddOrUpdateTask = async (formData) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask._id, formData);
      } else {
        await taskApi.createTask(formData);
      }
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      setError('Failed to save task. Please check your input and try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskApi.deleteTask(id);
      loadTasks();
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskApi.updateTask(id, { status });
      loadTasks();
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => setFilters({ priority: '', status: '' });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p>Organize your daily tasks efficiently</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="app-main">
        <section className="form-section">
          <TaskForm
            onSubmit={handleAddOrUpdateTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </section>

        <section className="list-section">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
