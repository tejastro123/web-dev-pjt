import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import './Collections.css';

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/collections');
        setCollections(res.data);
      } catch (error) {
        console.error("Error loading collections", error);
      }
    };
    fetchCollections();
  }, []);

  if (collections.length === 0) return null;

  return (
    <div className="collections-section">
      <div className="collections-header">
        <h2 className="collections-title">Collections</h2>
        <div className="collections-subtitle-row">
          <p className="collections-subtitle">
            Explore curated lists of top restaurants, cafes, pubs, and bars in Mumbai, based on trends
          </p>
          <a href="#" className="collections-link">
            All collections in Mumbai <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="collections-grid">
        {collections.map((item) => (
          <div key={item._id} className="collection-card">
            <img src={item.image} alt={item.title} className="collection-img" />
            <div className="collection-overlay"></div>
            <div className="collection-info">
              <h3 className="collection-card-title">{item.title}</h3>
              <div className="collection-places">
                {item.places} Places <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
