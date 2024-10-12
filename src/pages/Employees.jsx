import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Employee.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Generate random employees
const generateRandomEmployees = (count) => {
  const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown', 
    'David Lee', 'Chris Evans', 'Tom Hardy', 'Natalie Portman', 
    'Scarlett Johansson', 'Robert Downey Jr.'
  ];
  const positions = [
    'Software Engineer', 'HR Manager', 
    'Sales Representative', 'Marketing Specialist', 
    'Financial Analyst'
  ];
  const departments = [
    'Engineering', 'Human Resources', 
    'Sales', 'Marketing', 
    'Finance'
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: names[Math.floor(Math.random() * names.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    joinDate: new Date(Date.now() - Math.random() * 1e10).toISOString().split('T')[0],
    profilePicture: '',
  }));
};

// Modal for adding/editing employee
const EmployeeModal = ({ employee, onSave, onClose }) => {
  const [formData, setFormData] = useState(employee || { name: '', position: '', department: '', joinDate: '', profilePicture: '' });

  const positions = [
    'Software Engineer', 'HR Manager', 
    'Sales Representative', 'Marketing Specialist', 
    'Financial Analyst'
  ];

  const departments = [
    'Engineering', 'Human Resources', 
    'Sales', 'Marketing', 
    'Finance'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          
          {/* Department Dropdown */}
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Position Dropdown */}
          <select name="position" value={formData.position} onChange={handleChange} required>
            <option value="">Select Position</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>

          <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit" className="button">Save</button>
        </form>
      </div>
    </div>
  );
};

// Modal for viewing employee details
const EmployeeDetails = ({ employee, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Employee Details</h2>
        {employee.profilePicture && <img src={employee.profilePicture} alt={`${employee.name}'s Profile`} />}
        <p style={{ color: '#333', fontSize: '1.1em' }}><strong>Name:</strong> {employee.name}</p>
        <p  style={{ color: '#333', fontSize: '1.1em' }}><strong>Position:</strong> {employee.position}</p>
        <p  style={{ color: '#333', fontSize: '1.1em' }}><strong>Department:</strong> {employee.department}</p>
        <p  style={{ color: '#333', fontSize: '1.1em' }}><strong>Join Date:</strong> {employee.joinDate}</p>
      </div>
    </div>
  );
};


// Main Employees component
export default function Employees() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    }
    
    // If no employees exist in local storage, generate random employees
    return generateRandomEmployees(10);
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({ department: '', position: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filter.department ? employee.department === filter.department : true;
    const matchesPosition = filter.position ? employee.position === filter.position : true;
    return matchesSearch && matchesDepartment && matchesPosition;
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'ascending') ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setModalVisible(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setModalVisible(true);
  };

  const handleViewEmployee = (employee) => {
    setViewingEmployee(employee);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleSaveEmployee = (employee) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
    } else {
      setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
    }
    setModalVisible(false);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newEmployees = results.data.map(emp => ({
            ...emp,
            id: employees.length + 1,
          }));
          setEmployees([...employees, ...newEmployees]);
        },
      });
    }
  };

  const generateReport = () => {
    const report = {};
    employees.forEach(emp => {
      report[emp.department] = (report[emp.department] || 0) + 1;
    });
    setReportData(report);
  };

  const chartData = {
    labels: Object.keys(reportData),
    datasets: [{
      label: 'Number of Employees by Department',
      data: Object.values(reportData),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

 // Inside the Employees component, update the search and filter elements
return (
  <div className="employees">
    <div className="employees-header">
      <h1 className="employees-title">Employees</h1>
      <button className="btn-add" onClick={handleAddEmployee}>Add New Employee</button>
      <input type="file" className="btn-import" onChange={handleImport} />
      <CSVLink data={employees} filename={"employees.csv"} className="btn-export">
        Export CSV
      </CSVLink>
      <button className="btn-generate" onClick={generateReport}>Generate Report</button>
      
      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Centered Filter Options */}
      <div className="filter-container">
        <select className="filter" onChange={e => setFilter({ ...filter, department: e.target.value })}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>

        <select className="filter" onChange={e => setFilter({ ...filter, position: e.target.value })}>
          <option value="">All Positions</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Sales Representative">Sales Representative</option>
          <option value="Marketing Specialist">Marketing Specialist</option>
          <option value="Financial Analyst">Financial Analyst</option>
        </select>
      </div>
    </div>
    


      {/* Employee Cards */}
      <div className="employee-cards">
        {sortedEmployees.map(employee => (
          <div key={employee.id} className="employee-card" onClick={() => handleViewEmployee(employee)}>
            {employee.profilePicture && <img src={employee.profilePicture} alt={`${employee.name}'s Profile`} className="profile-image" />}
            <h3>{employee.name}</h3>
            <p>{employee.position}</p>
            <p>{employee.department}</p>
            <button className="btn-edit" onClick={(e) => { e.stopPropagation(); handleEditEmployee(employee); }}>Edit</button>
            <button className="btn-delete" onClick={(e) => { e.stopPropagation(); handleDeleteEmployee(employee.id); }}>Delete</button>
          </div>
        ))}
      </div>

      {/* Modals for Adding/Editing Employee and Viewing Details */}
      {modalVisible && (
        <EmployeeModal
          employee={editingEmployee}
          onSave={handleSaveEmployee}
          onClose={() => setModalVisible(false)}
        />
      )}

      {viewingEmployee && (
        <EmployeeDetails
          employee={viewingEmployee}
          onClose={() => setViewingEmployee(null)}
        />
      )}

      {/* Chart Display */}
      {Object.keys(reportData).length > 0 && (
        <div className="chart-container">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
}

