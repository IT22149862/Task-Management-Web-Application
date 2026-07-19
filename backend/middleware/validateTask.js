const validateTask = (req, res, next) => {
  const { title, description, priority, dueDate, status } = req.body;
  const errors = [];

  if (!title || !title.trim()) errors.push('Title is required');
  else if (title.trim().length > 100) errors.push('Title cannot exceed 100 characters');

  if (!description || !description.trim()) errors.push('Description is required');
  else if (description.trim().length > 1000) errors.push('Description cannot exceed 1000 characters');

  const validPriorities = ['Low', 'Medium', 'High'];
  if (!priority || !validPriorities.includes(priority)) {
    errors.push('Priority must be one of Low, Medium, High');
  }

  if (!dueDate || isNaN(Date.parse(dueDate))) {
    errors.push('A valid due date is required');
  }

  if (status) {
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      errors.push('Status must be one of Pending, In Progress, Completed');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

module.exports = validateTask;
