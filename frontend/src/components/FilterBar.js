import React from 'react';

function FilterBar({ filters, onFilterChange, onClearFilters }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="priorityFilter">Priority</label>
        <select
          id="priorityFilter"
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="statusFilter">Status</label>
        <select
          id="statusFilter"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {(filters.priority || filters.status) && (
        <button type="button" className="btn btn-clear" onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
