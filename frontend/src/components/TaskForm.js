import React, { useState, useEffect } from 'react';

const emptyForm = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
  status: 'Pending',
};

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'Medium',
        dueDate: editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '',
        status: editingTask.status || 'Pending',
      });
      setErrors({});
    } else {
      setFormData(emptyForm);
    }
  }, [editingTask]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.trim().length > 100) newErrors.title = 'Title cannot exceed 100 characters';

    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length > 1000)
      newErrors.description = 'Description cannot exceed 1000 characters';

    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    if (!formData.priority) newErrors.priority = 'Priority is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    if (!editingTask) setFormData(emptyForm);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Finish assignment"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details about the task"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority *</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <span className="error-text">{errors.priority}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date *</label>
          <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
        </div>
      </div>

      {editingTask && (
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
