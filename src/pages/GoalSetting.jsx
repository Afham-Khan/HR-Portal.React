// GoalSetting.jsx
import React, { useState, useEffect } from 'react';

const GoalSetting = () => {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState('');
  const [goalCategory, setGoalCategory] = useState('Individual');
  const [goalMetrics, setGoalMetrics] = useState('');
  const [goalTimeframe, setGoalTimeframe] = useState('');

  // Load goals from local storage or generate random goals
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(storedGoals.length > 0 ? storedGoals : generateRandomGoals());
  }, []);

  // Function to generate random goals with random progress
  const generateRandomGoals = () => {
    const randomGoals = [
      {
        id: Date.now() + 1,
        text: 'Increase team productivity by 20%',
        category: 'Team',
        metrics: 'Team performance metrics',
        timeframe: '6 months',
        progress: Math.floor(Math.random() * 101),
      },
      {
        id: Date.now() + 2,
        text: 'Complete certification course in React',
        category: 'Individual',
        metrics: 'Completion of course and exam',
        timeframe: '3 months',
        progress: Math.floor(Math.random() * 101),
      },
      {
        id: Date.now() + 3,
        text: 'Develop a new marketing strategy',
        category: 'Organizational',
        metrics: 'Increased sales by 15%',
        timeframe: '1 month',
        progress: Math.floor(Math.random() * 101),
      },
      {
        id: Date.now() + 4,
        text: 'Launch new company website',
        category: 'Organizational',
        metrics: 'Website traffic and engagement',
        timeframe: '2 months',
        progress: Math.floor(Math.random() * 101),
      },
      {
        id: Date.now() + 5,
        text: 'Improve customer feedback response time',
        category: 'Team',
        metrics: 'Reduction in response time by 50%',
        timeframe: '3 months',
        progress: Math.floor(Math.random() * 101),
      },
    ];
    localStorage.setItem('goals', JSON.stringify(randomGoals)); // Save random goals to local storage
    return randomGoals;
  };

  // Save goals to local storage
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (goalText && goalMetrics && goalTimeframe) {
      const newGoal = {
        id: Date.now(),
        text: goalText,
        category: goalCategory,
        metrics: goalMetrics,
        timeframe: goalTimeframe,
        progress: 0,
      };
      setGoals([...goals, newGoal]);
      setGoalText('');
      setGoalCategory('Individual');
      setGoalMetrics('');
      setGoalTimeframe('');
    }
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleProgressChange = (id, newProgress) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, progress: newProgress } : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Goal Setting</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          placeholder="Enter new goal"
          style={styles.input}
        />
        <select
          value={goalCategory}
          onChange={(e) => setGoalCategory(e.target.value)}
          style={styles.select}
        >
          <option value="Individual">Individual</option>
          <option value="Team">Team</option>
          <option value="Organizational">Organizational</option>
        </select>
        <input
          type="text"
          value={goalMetrics}
          onChange={(e) => setGoalMetrics(e.target.value)}
          placeholder="Metrics for success"
          style={styles.input}
        />
        <input
          type="text"
          value={goalTimeframe}
          onChange={(e) => setGoalTimeframe(e.target.value)}
          placeholder="Timeframe (e.g., 3 months)"
          style={styles.input}
        />
        <button onClick={handleAddGoal} style={styles.button}>
          Add Goal
        </button>
      </div>

      <ul style={styles.goalList}>
        {goals.length === 0 ? (
          <p>No goals set.</p>
        ) : (
          goals.map((g) => (
            <li key={g.id} style={styles.goalItem}>
              <h4 style={styles.goalText}>{g.text}</h4>
              <p>Category: {g.category}</p>
              <p>Metrics: {g.metrics}</p>
              <p>Timeframe: {g.timeframe}</p>
              <div style={styles.progressContainer}>
                <label htmlFor={`progress-${g.id}`} style={styles.progressLabel}>
                  Progress: {g.progress}%
                </label>
                <input
                  type="range"
                  id={`progress-${g.id}`}
                  min="0"
                  max="100"
                  value={g.progress}
                  onChange={(e) => handleProgressChange(g.id, parseInt(e.target.value))}
                  style={styles.rangeInput}
                />
                <div style={styles.progressBarContainer}>
                  <div style={{ ...styles.progressBar, width: `${g.progress}%` }}></div>
                </div>
              </div>
              <button onClick={() => handleDeleteGoal(g.id)} style={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Inline styles with enhanced visuals
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: 'auto',
    border: '1px solid #444',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    backgroundColor: '#f9f9f9',
    color: '#000000',
  },
  header: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #666',
    width: '100%',
    maxWidth: '300px',
    backgroundColor: '#f9f9f9',
    color: '#000000',
    transition: 'all 0.3s ease',
  },
  select: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #666',
    width: '100%',
    maxWidth: '300px',
    backgroundColor: '#f1f1f1',
    color: '#000000',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
    fontSize: '16px',
  },
  goalList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  goalItem: {
    background: '#f0f8ff',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  goalText: {
    color: '#007bff',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  progressLabel: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  rangeInput: {
    width: '100%',
    margin: '10px 0',
  },
  progressBarContainer: {
    background: '#444',
    borderRadius: '4px',
    overflow: 'hidden',
    width: '100%',
    height: '10px',
    marginTop: '5px',
  },
  progressBar: {
    height: '100%',
    background: '#007bff',
    transition: 'width 0.4s ease',
  },
  deleteButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'transform 0.2s, background-color 0.3s',
  },

  
};



// Export the component
export default GoalSetting;
