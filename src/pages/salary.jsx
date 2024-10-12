import React, { useState, useEffect } from 'react';
import './salary.css';

const SalaryPage = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', salary: 0 });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);

  useEffect(() => {
    generateRandomEmployees();
  }, []);

  const generateRandomEmployees = () => {
    const employees = [];
    for (let i = 0; i < 10; i++) {
      const employee = {
        id: i + 1,
        name: `Employee ${i + 1}`,
        salary: Math.floor(Math.random() * 100000),
        leave: Math.floor(Math.random() * 10),
        absent: Math.floor(Math.random() * 5),
        overtime: Math.floor(Math.random() * 10),
      };
      employees.push(employee);
    }
    setEmployees(employees);
  };

  const handleAddEmployee = () => {
    const newEmployeeData = { ...newEmployee, id: employees.length + 1 };
    setEmployees([...employees, newEmployeeData]);
    setNewEmployee({ name: '', salary: 0 });
    setAddEmployeeModal(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEditModal(true);
  };

  const handleSaveEmployee = () => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === editingEmployee.id) {
        return editingEmployee;
      }
      return emp;
    });
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
    setShowEditModal(false);
  };

  const handleDeleteEmployee = (employee) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== employee.id);
    setEmployees(updatedEmployees);
  };

  const handleIncrementSalary = (employee) => {
    const updatedEmployee = { ...employee, salary: employee.salary + 1000 };
    setEmployees(
      employees.map((emp) => {
        if (emp.id === employee.id) {
          return updatedEmployee;
        }
        return emp;
      })
    );
  };

  const handleDecrementSalary = (employee) => {
    const updatedEmployee = { ...employee, salary: employee.salary - 1000 };
    setEmployees(
      employees.map((emp) => {
        if (emp.id === employee.id) {
          return updatedEmployee;
        }
        return emp;
      })
    );
  };

  const handleInputChange = (e) => {
    setEditingEmployee({ ...editingEmployee, [e.target.name]: e.target.value });
  };

  return (
    <div className="salary-page">
      <h1>Salary Page</h1>
      <div className='addemp'>
      <button onClick={() => setAddEmployeeModal(true)}>Add Employee</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Leave</th>
            <th>Absent</th>
            <th>Overtime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.leave}</td>
              <td>{employee.absent}</td>
              <td>{employee.overtime}</td>
              <td>
                <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Employee</h2>
            <h3>Name</h3>
            <input
              type="text"
              placeholder='name'
              name="name"
              value={editingEmployee.name}
              onChange={handleInputChange}
            />
            <h3>Salary</h3>
            <input
              type="number"
              placeholder='salary'
              name="salary"
              value={editingEmployee.salary}
              onChange={handleInputChange}
            />
            <h3>Leave</h3>
            <input
              type="number"
              placeholder='leave'
              name="leave"
              value={editingEmployee.leave}
              onChange={handleInputChange}
            />
            <h3>Absent</h3>
            <input
              type="number"
              placeholder='absent'
              name="absent"
              value={editingEmployee.absent}
              onChange={handleInputChange}
            />
            <h3>Overtime</h3>
            <input
              type="number"
              placeholder='overtime'
              name="overtime"
              value={editingEmployee.overtime}
              onChange={handleInputChange}
            />
            <br />
            <button onClick={handleSaveEmployee}>Save</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      {addEmployeeModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Employee</h2>
            <label htmlFor="">Name:</label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <br />
            <label htmlFor="">Salary:</label>
            <input
              type="number"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({ ...newEmployee, salary: parseInt(e.target.value) })}
            />
            <br />
            <label htmlFor="">Leave:</label>
            <input
              type="number"
              value={newEmployee.leave}
              onChange={(e) => setNewEmployee({ ...newEmployee, leave: parseInt(e.target.value) })}
            />
            <br />
            <label htmlFor="">Absent:</label>
            <input
              type="number"
              value={newEmployee.absent}
              onChange={(e) => setNewEmployee({ ...newEmployee, absent: parseInt(e.target.value) })}
            />
            <br />
            <label htmlFor="">Overtime:</label>
            <input
              type="number"
              value={newEmployee.overtime}
              onChange={(e) => setNewEmployee({ ...newEmployee, overtime: parseInt(e.target.value) })}
            />
            <br />
            <button onClick={handleAddEmployee}>Add</button>
            <button onClick={() => setAddEmployeeModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryPage;