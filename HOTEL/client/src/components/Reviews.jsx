import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import { Star, User } from 'lucide-react';
import './Reviews.css';

const Reviews = ({ restaurantId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}/reviews`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.post(`http://localhost:5000/api/restaurants/${restaurantId}/reviews`, { rating, comment }, config);
      setReviews([res.data, ...reviews]);
      setComment('');
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please login.");
    }
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2 className="reviews-title">Reviews</h2>
        {user && !showForm && (
          <button onClick={() => setShowForm(true)} className="write-review-btn">Write a Review</button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-select">
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Bad</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="review-input"
          />
          <div className="form-actions">
            <button type="submit" className="submit-review-btn">Submit</button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <div className="review-user-header">
                <div className="review-avatar">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div className="review-meta">
                  <p className="review-username">{review.userName}</p>
                  <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <div className={`review-rating rating-${review.rating}`}>
                  {review.rating} <Star className="inline w-3 h-3 mb-0.5" />
                </div>
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
