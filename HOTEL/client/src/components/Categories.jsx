import React from 'react';
import { categories } from '../data/categories';
import './Categories.css';

const Categories = ({ onSelect, activeCategory }) => {
  return (
    <div className="categories-section">
      <h3 className="categories-title">Eat what makes you happy</h3>
      <div className="categories-carousel">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-item-card ${activeCategory === cat.name ? 'active' : ''}`}
            onClick={() => onSelect(cat.name === activeCategory ? '' : cat.name)}
          >
            <div className="category-img-container">
              <img src={cat.image} alt={cat.name} className="category-img" />
            </div>
            <p className="category-name">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
