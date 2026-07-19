import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange }) {
  if (loading) return <p className="info-text">Loading tasks...</p>;

  if (!tasks || tasks.length === 0) {
    return <p className="info-text">No tasks found. Add a new task to get started.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
