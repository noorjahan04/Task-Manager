// AI-generated, reviewed and modified
import React from 'react';
import './FilterButtons.css';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'active', label: 'Active', icon: '⏳' },
    { value: 'completed', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          aria-label={`Filter by ${filter.label} tasks`}
        >
          <span className="filter-icon">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;