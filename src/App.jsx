import React, { useState } from 'react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { FaBell } from 'react-icons/fa';
import Layout from './Components/Layout/Layout.jsx';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Candidates from './pages/Candidates';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Attendance from './pages/Attendance.jsx';
import './App.css';
// import Notifications from './pages/Notification'; 
import SignUp from './pages/SignUp.jsx';
import Login from './pages/login.jsx';

// Employee Performance Management Components
const PerformanceReview = ({ reviews, onAddReview }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ review, rating });
    setReview('');
    setRating(1);
  };

  return (
    <div>
      <h2>Performance Reviews</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={review}
          placeholder="Enter review"
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Add Review</button>
      </form>
      <ul>
        {reviews.map((r, index) => (
          <li key={index}>
            {r.review} - Rating: {r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EmployeePerformanceManagement = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div>
      <h1>Employee Performance Management</h1>
      <PerformanceReview reviews={reviews} onAddReview={addReview} />
    </div>
  );
};

// const NotificationButton = () => {
//   const navigate = useNavigate();

//   const handleNotificationClick = () => {
//     navigate('/notifications');
//   };

//   return (
//     <button className="notifications" onClick={handleNotificationClick}>
//       <FaBell className="notification-icon" />
//     </button>
//   );
// };

function App() {
  return (
    <Router>
      <Layout>
        {/* <NotificationButton /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/performance" element={<EmployeePerformanceManagement />} />
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
