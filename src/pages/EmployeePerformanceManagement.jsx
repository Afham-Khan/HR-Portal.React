// PerformanceManagement.jsx
import React, { useState, useEffect } from 'react';
import PerformanceModal from './PerformanceModal'; // Import modal
import GoalSetting from './GoalSetting'; // Import goal setting

const PerformanceManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Generate random ratings and load reviews from local storage on mount
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('performanceReviews')) || [];
    if (storedReviews.length === 0) {
      // Add random employee reviews if none exist
      const randomReviews = [
        { id: 1, employeeName: 'Alice', rating: Math.floor(Math.random() * 5) + 1, feedback: 'Great performance!', date: new Date() },
        { id: 2, employeeName: 'Bob', rating: Math.floor(Math.random() * 5) + 1, feedback: 'Needs improvement.', date: new Date() },
        { id: 3, employeeName: 'Charlie', rating: Math.floor(Math.random() * 5) + 1, feedback: 'Satisfactory work.', date: new Date() },
        { id: 4, employeeName: 'Diana', rating: Math.floor(Math.random() * 5) + 1, feedback: 'Exceptional skills!', date: new Date() },
        { id: 5, employeeName: 'Ethan', rating: Math.floor(Math.random() * 5) + 1, feedback: 'Good team player.', date: new Date() },
      ];
      setReviews(randomReviews);
      localStorage.setItem('performanceReviews', JSON.stringify(randomReviews));
    } else {
      setReviews(storedReviews);
    }
  }, []);

  const handleSaveReview = (newReview) => {
    let updatedReviews;
    if (editingReview) {
      updatedReviews = reviews.map(review => (review.id === editingReview.id ? { ...newReview, id: editingReview.id } : review));
    } else {
      const newReviewWithId = { ...newReview, id: Date.now(), date: new Date() };
      updatedReviews = [...reviews, newReviewWithId];
    }
    setReviews(updatedReviews);
    localStorage.setItem('performanceReviews', JSON.stringify(updatedReviews));
    setEditingReview(null);
    setIsModalOpen(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = reviews.filter(review => review.id !== id);
      setReviews(updatedReviews);
      localStorage.setItem('performanceReviews', JSON.stringify(updatedReviews));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  // Filter reviews based on search query and rating filter
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter ? review.rating.toString() === ratingFilter : true;
    return matchesSearch && matchesRating;
  });

  // Calculate average rating
  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2) : 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Performance Management</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search Employee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} style={styles.select}>
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map(rating => (
            <option key={rating} value={rating}>{rating} Star</option>
          ))}
        </select>
        <button onClick={() => { setIsModalOpen(true); setEditingReview(null); }} style={styles.button}>
          Add Performance Review
        </button>
      </div>

      {isModalOpen && (
        <PerformanceModal
          review={editingReview}
          onSave={handleSaveReview}
          onClose={handleCloseModal}
        />
      )}

      <h2 style={styles.subHeader}>Performance Reviews</h2>
      {reviews.length === 0 ? (
        <p>No performance reviews found.</p>
      ) : (
        <>
          <p style={styles.averageRating}>Average Rating: {averageRating} ⭐</p>
          <ul style={styles.reviewList}>
            {filteredReviews.map((review) => (
              <li key={review.id} style={styles.reviewItem}>
                <h3 style={styles.reviewItemHeader}>{review.employeeName}</h3>
                <p style={styles.reviewRating}>Rating: {review.rating} ⭐</p>
                <p style={styles.reviewFeedback}>Feedback: {review.feedback}</p>
                <p style={styles.reviewDate}>Date: {new Date(review.date).toLocaleDateString()}</p>
                <button onClick={() => handleEditReview(review)} style={styles.actionButton}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)} style={styles.actionButton}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}

      <GoalSetting />
    </div>
  );
};

// Inline styles with light visuals
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: '#f9f9f9', // Change to light background
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    color: '#333', // Darker text color for contrast
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50', // Darker color for the header
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '2.5rem',
    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.3)',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #bdc3c7', // Lighter border color
    flex: '1',
    marginRight: '10px',
    background: '#fff', // White background for input
    color: '#333', // Darker text color
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #bdc3c7', // Lighter border color
    marginRight: '10px',
    background: '#fff', // White background for select
    color: '#333', // Darker text color
  },
  button: {
    backgroundColor: '#2980b9', // Darker blue for button
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
  },
  subHeader: {
    marginTop: '20px',
    color: '#34495e', // Darker color for subheader
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  averageRating: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.2rem',
    color: '#2c3e50', // Darker color for average rating
  },
  reviewList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '10px',
  },
  reviewItem: {
    background: '#f0f8ff', // White background for review item
    margin: '10px 0',
    padding: '15px',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  reviewItemHeader: {
    color: '#2980b9', // Darker blue for review item header
  },
  reviewRating: {
    color: '#e67e22', // Orange color for ratings
  },
  reviewFeedback: {
    margin: '5px 0',
  },
  reviewDate: {
    fontStyle: 'italic',
    color: '#9932cc', // Lighter gray for date
  },
  actionButton: {
    marginRight: '10px',
    background: '#007bff', // Green color for buttons
    color: '#ffffff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default PerformanceManagement;
