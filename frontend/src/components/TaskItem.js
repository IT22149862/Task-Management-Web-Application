import React from 'react';

const priorityClass = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high',
};

const statusClass = {
  Pending: 'status-pending',
  'In Progress': 'status-in-progress',
  Completed: 'status-completed',
};

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className={`task-card ${statusClass[task.status] || ''}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${priorityClass[task.priority] || ''}`}>{task.priority}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span>📅 Due: {formattedDate}</span>
      </div>

      <div className="task-status-row">
        <label htmlFor={`status-${task._id}`}>Status:</label>
        <select
          id={`status-${task._id}`}
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
