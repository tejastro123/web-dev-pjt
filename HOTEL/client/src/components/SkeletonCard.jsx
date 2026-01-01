import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-text title"></div>
        <div className="skeleton-text subtitle"></div>
        <div className="skeleton-footer">
          <div className="skeleton-text price"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
