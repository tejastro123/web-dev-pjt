import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import './Filters.css';

const Filters = ({ activeFilters, setFilters }) => {
  const handleSort = (sortType) => {
    setFilters(prev => ({ ...prev, sort: prev.sort === sortType ? '' : sortType }));
  };

  return (
    <div className="filters-container sticky-filters">
      <div className="max-w-7xl mx-auto flex items-center space-x-4 overflow-x-auto no-scrollbar py-2">
        {/* Filter Chips */}
        <button className="filter-chip">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </button>

        <button
          className={`filter-chip ${activeFilters.sort === 'rating' ? 'active' : ''}`}
          onClick={() => handleSort('rating')}
        >
          Rating: 4.0+
        </button>

        <button
          className={`filter-chip ${activeFilters.sort === 'cost_low' ? 'active' : ''}`}
          onClick={() => handleSort('cost_low')}
        >
          Cost: Low to High
        </button>

        <button
          className={`filter-chip ${activeFilters.sort === 'cost_high' ? 'active' : ''}`}
          onClick={() => handleSort('cost_high')}
        >
          Cost: High to Low
        </button>

        <button
          className={`filter-chip ${activeFilters.sort === 'delivery' ? 'active' : ''}`}
          onClick={() => handleSort('delivery')}
        >
          Fast Delivery
        </button>
      </div>
    </div>
  );
};

export default Filters;
