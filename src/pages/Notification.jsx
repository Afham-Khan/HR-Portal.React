import React, { useState, useEffect } from 'react';
import './Notifications.css'; // Custom CSS for styling (if needed)
import { FaBell } from 'react-icons/fa'; // Example icon for notification
import { getNotifications } from '../services/notificationsService.js'; // Example service to fetch notifications

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications (you can use an API call here)
    const fetchNotifications = async () => {
      const data = await getNotifications(); // Replace with your API call
      setNotifications(data);
    };
    
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-page">
      <h1>Notifications <FaBell /></h1>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification, index) => (
            <li key={index} className={`notification-item ${notification.type}`}>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <span className="notification-date">{notification.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications at the moment.</p>
      )}
    </div>
  );
};

export default Notifications;
