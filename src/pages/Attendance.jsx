// import React, { useState, useEffect } from 'react';

// import './Attendance.css'; // Import the CSS file

// const Attendance = () => {
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [attendanceRecords, setAttendanceRecords] = useState([]);

//   // Load attendance records from local storage on component mount
//   useEffect(() => {
//     const savedRecords = localStorage.getItem('attendanceRecords');
//     if (savedRecords) {
//       setAttendanceRecords(JSON.parse(savedRecords));
//     }
//   }, []);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newRecord = { name, date };
//     const updatedRecords = [...attendanceRecords, newRecord];

//     // Save to local storage
//     localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
//     setAttendanceRecords(updatedRecords);
//     setName(''); // Reset input fields
//     setDate('');
//   };

//   return (
//     <div className="attendance-page">
//       <h1>Attendance Management</h1>
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <input
//           type="text"
//           placeholder="Employee Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <button type="submit">Mark Attendance</button>
//       </form>

//       <h2>Attendance Records</h2>
//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceRecords.length > 0 ? (
//             attendanceRecords.map((record, index) => (
//               <tr key={index}>
//                 <td>{record.name}</td>
//                 <td>{record.date}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2">No attendance records available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Attendance;









// import React, { useState, useEffect } from 'react';

// import './Attendance.css'; // Import the CSS file

// const Attendance = () => {
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [totalAttendance, setTotalAttendance] = useState({});

//   // Load attendance records from local storage on component mount
//   useEffect(() => {
//     const savedRecords = localStorage.getItem('attendanceRecords');
//     if (savedRecords) {
//       const parsedRecords = JSON.parse(savedRecords);
//       setAttendanceRecords(parsedRecords);
//       calculateTotalAttendance(parsedRecords); // Calculate total attendance on load
//     }
//   }, []);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newRecord = { name, date };
    
//     // Avoid adding duplicate attendance for the same person on the same day
//     const isDuplicate = attendanceRecords.some(
//       (record) => record.name === name && record.date === date
//     );

//     if (!isDuplicate) {
//       const updatedRecords = [...attendanceRecords, newRecord];

//       // Save to local storage
//       localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
//       setAttendanceRecords(updatedRecords);
//       calculateTotalAttendance(updatedRecords); // Recalculate total attendance after adding a record
//     } else {
//       alert('Attendance for this employee on the selected date already exists!');
//     }

//     setName(''); // Reset input fields
//     setDate('');
//   };

//   // Function to calculate the total attendance for each candidate
//   const calculateTotalAttendance = (records) => {
//     const totals = records.reduce((acc, record) => {
//       // If the name already exists in the accumulator, increase the count
//       acc[record.name] = (acc[record.name] || 0) + 1;
//       return acc;
//     }, {});
//     setTotalAttendance(totals);
//   };

//   // Function to remove an attendance record
//   const handleRemoveRecord = (indexToRemove) => {
//     const updatedRecords = attendanceRecords.filter((_, index) => index !== indexToRemove);

//     // Update local storage and state
//     localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
//     setAttendanceRecords(updatedRecords);
//     calculateTotalAttendance(updatedRecords); // Recalculate total attendance after removing a record
//   };

//   return (
//     <div className="attendance-page">
//       <h1>Attendance Management</h1>
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <input
//           type="text"
//           placeholder="Employee Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <button type="submit">Mark Attendance</button>
//       </form>

//       <h2>Attendance Records</h2>
//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceRecords.length > 0 ? (
//             attendanceRecords.map((record, index) => (
//               <tr key={index}>
//                 <td>{record.name}</td>
//                 <td>{record.date}</td>
//                 <td>
//                   <button onClick={() => handleRemoveRecord(index)}>Remove</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No attendance records available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <h2>Total Attendance per Candidate</h2>
//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Total Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(totalAttendance).length > 0 ? (
//             Object.entries(totalAttendance).map(([name, total], index) => (
//               <tr key={index}>
//                 <td>{name}</td>
//                 <td>{total}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2">No attendance data available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Attendance;





import React, { useState, useEffect } from 'react';

import './Attendance.css'; // Import the CSS file

// Mock function to get employee names (replace with actual data fetching)
const fetchEmployeeNames = () => {
  // This can be an API call or data passed from another component
  return ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis'];
};

const Attendance = () => {
  const [employeeNames, setEmployeeNames] = useState([]); // Holds the employee names
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Holds the selected employee from the dropdown
  const [date, setDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState({});

  // Load employee names when the component mounts
  useEffect(() => {
    const employees = fetchEmployeeNames();
    setEmployeeNames(employees); // Set employee names for the dropdown
  }, []);

  // Load attendance records from local storage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('attendanceRecords');
    if (savedRecords) {
      const parsedRecords = JSON.parse(savedRecords);
      setAttendanceRecords(parsedRecords);
      calculateTotalAttendance(parsedRecords); // Calculate total attendance on load
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { name: selectedEmployee, date };
    
    // Avoid adding duplicate attendance for the same person on the same day
    const isDuplicate = attendanceRecords.some(
      (record) => record.name === selectedEmployee && record.date === date
    );

    if (!isDuplicate) {
      const updatedRecords = [...attendanceRecords, newRecord];

      // Save to local storage
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
      setAttendanceRecords(updatedRecords);
      calculateTotalAttendance(updatedRecords); // Recalculate total attendance after adding a record
    } else {
      alert('Attendance for this employee on the selected date already exists!');
    }

    setSelectedEmployee(''); // Reset input fields
    setDate('');
  };

  // Function to calculate the total attendance for each candidate
  const calculateTotalAttendance = (records) => {
    const totals = records.reduce((acc, record) => {
      // If the name already exists in the accumulator, increase the count
      acc[record.name] = (acc[record.name] || 0) + 1;
      return acc;
    }, {});
    setTotalAttendance(totals);
  };

  // Function to remove an attendance record
  const handleRemoveRecord = (indexToRemove) => {
    const updatedRecords = attendanceRecords.filter((_, index) => index !== indexToRemove);

    // Update local storage and state
    localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
    setAttendanceRecords(updatedRecords);
    calculateTotalAttendance(updatedRecords); // Recalculate total attendance after removing a record
  };

  return (
    <div className="attendance-page">
      <h1>Attendance Management</h1>
      <form onSubmit={handleSubmit} className="attendance-form">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          required
        >
          <option value="" disabled>Select Employee</option>
          {employeeNames.map((employee, index) => (
            <option key={index} value={employee}>
              {employee}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Mark Attendance</button>
      </form>

      <h2>Attendance Records</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>
                  <button onClick={() => handleRemoveRecord(index)}>Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No attendance records available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Total Attendance per Candidate</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Attendance</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(totalAttendance).length > 0 ? (
            Object.entries(totalAttendance).map(([name, total], index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No attendance data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
