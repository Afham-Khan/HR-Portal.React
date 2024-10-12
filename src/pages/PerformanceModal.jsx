import React, { useState } from 'react';

const PerformanceModal = ({ review, onSave, onClose }) => {
  const [formData, setFormData] = useState(review || {
    employeeName: '',
    rating: '',
    feedback: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="pm-modal" style={modalStyle}>
      <div className="pm-modal-content" style={modalContentStyle}>
        <span className="pm-close" onClick={onClose} style={closeButtonStyle}>&times;</span>
        <h2 style={headerStyle}>{review ? 'Edit Performance Review' : 'Add Performance Review'}</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            required
            min="1"
            max="5"
            style={inputStyle}
          />
          <textarea
            name="feedback"
            placeholder="Feedback"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            required
            style={textareaStyle}
          />
          <button type="submit" className="pm-button" style={buttonStyle}>Save</button>
        </form>
      </div>
    </div>
  );
};

// CSS for the Performance Modal (in JS)
const styles = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slideIn {
    0% { transform: translateY(-30px); }
    100% { transform: translateY(0); }
  }

  .pm-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    animation: fadeIn 0.3s ease-in-out;
    z-index: 9999; /* Ensure modal is on top */
  }

  .pm-modal-content {
    background-color: #343a40; /* Dark gray */
    border-radius: 12px; /* Slightly larger border radius for a softer look */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    animation: slideIn 0.3s ease-in-out;
    color: #f5f5f5; /* Light text */
    width: 90%; /* Use a percentage for width */
    max-width: 600px; /* Maximum width for larger screens */
    margin: auto; /* Centering */
    overflow: hidden; /* Prevents content overflow */
    transition: all 0.3s ease; /* Smooth transition for hover effects */
  }

  .pm-modal-content:hover {
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px); /* Subtle lift effect on hover */
  }

  .pm-modal-content h2 {
    font-size: 1.8rem; /* Adjusted header font size */
    margin-bottom: 15px; /* Space below the header */
    color: #e0e0e0; /* Lighten the header text color */
  }

  .pm-modal-content input,
  .pm-modal-content textarea {
    background-color: #495057; /* Darker input background */
    border: 1px solid #6c757d; /* Lighter border */
    color: #f5f5f5; /* Input text color */
    border-radius: 6px; /* Rounded corners */
    padding: 10px; /* Padding for inputs */
    width: 100%; /* Full width for inputs */
    margin-bottom: 15px; /* Space below inputs */
    font-size: 1rem; /* Font size for better readability */
    transition: border-color 0.3s ease; /* Transition for focus effect */
  }

  .pm-modal-content input:focus, 
  .pm-modal-content textarea:focus {
    border-color: #007bff; /* Blue border on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Blue shadow on focus */
    outline: none; /* Remove default outline */
  }

  .pm-modal-content .pm-button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 100%; /* Full width button */
    font-size: 1rem; /* Adjust button font size */
  }

  .pm-modal-content .pm-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: scale(1.05); /* Slightly enlarge on hover */
  }

  .pm-modal-content .pm-button:active {
    transform: scale(0.95); /* Shrink slightly on click */
  }

  .pm-modal-content .pm-close {
    cursor: pointer;
    font-size: 24px;
    color: #ff4d4d; /* Close button color */
  }

  .pm-modal-content .pm-close:hover {
    color: #ff1a1a; /* Darker red on hover */
  }

  /* Media Query for devices up to 768px */
  @media (max-width: 768px) {
    .pm-modal-content {
      padding: 15px; /* Adjust padding for smaller screens */
    }

    .pm-modal-content h2 {
      font-size: 1.6rem; /* Adjust header font size */
    }
    
    .pm-modal-content input,
    .pm-modal-content textarea {
      font-size: 0.9rem; /* Smaller font for inputs */
      padding: 8px; /* Adjust padding */
    }
    
    .pm-modal-content .pm-button {
      padding: 8px 12px; /* Adjust button padding */
    }
  }

  /* Media Query for devices up to 480px */
  @media (max-width: 480px) {
    .pm-modal-content {
      padding: 10px; /* Further adjust padding */
    }
    
    .pm-modal-content h2 {
      font-size: 1.4rem; /* Further adjust header font size */
    }
    
    .pm-modal-content input,
    .pm-modal-content textarea {
      font-size: 0.8rem; /* Smaller font for inputs */
      padding: 6px; /* Adjust padding */
    }
    
    .pm-modal-content .pm-button {
      padding: 6px 10px; /* Further adjust button padding */
    }
  }
`;

const modalStyle = { /* Additional styles if needed */ };
const modalContentStyle = { /* Additional styles if needed */ };
const closeButtonStyle = { /* Additional styles if needed */ };
const headerStyle = { /* Additional styles if needed */ };
const formStyle = { /* Additional styles if needed */ };
const inputStyle = { 
    backgroundColor: '#000000',
    color: '#f5f5f5',
    border: '1px solid #444',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
};
const textareaStyle = { 
    backgroundColor: '#495057',
    color: '#f5f5f5',
    border: '1px solid #444',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
};
const buttonStyle = { /* Additional styles if needed */ };

// Injecting the CSS into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PerformanceModal;
