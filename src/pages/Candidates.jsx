// Candidates.js
import React, { useState, useEffect } from 'react';
import './Candidates.css';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaSyncAlt } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const initialCandidates = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    status: 'Applied',
    appliedDate: '2024-04-15',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg', // Thumbnails for smaller size
    cv: '',
    interviewDate: '2024-05-10',
    interviewTime: '10:00',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Product Manager',
    status: 'Interviewing',
    appliedDate: '2024-04-20',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
    cv: '',
    interviewDate: '2024-05-12',
    interviewTime: '14:30',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    position: 'Designer',
    status: 'Hired',
    appliedDate: '2024-03-30',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
    cv: '',
    interviewDate: '2024-04-25',
    interviewTime: '09:00',
  },
  {
    id: 4,
    name: 'Bob Williams',
    position: 'Software Engineer',
    status: 'Rejected',
    appliedDate: '2024-04-10',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/men/4.jpg',
    cv: '',
    interviewDate: '',
    interviewTime: '',
  },
  {
    id: 5,
    name: 'Emily Davis',
    position: 'Product Manager',
    status: 'Applied',
    appliedDate: '2024-04-18',
    profilePicture: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
    cv: '',
    interviewDate: '',
    interviewTime: '',
  },
];

export default function Candidates() {
  // State hooks
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position: '',
    status: '',
    appliedDate: '',
    profilePicture: '',
    cv: '',
    interviewDate: '',
    interviewTime: '',
  });
  const [updateStatus, setUpdateStatus] = useState('');

  // State for editing candidate
  const [editCandidate, setEditCandidate] = useState({
    id: null,
    name: '',
    position: '',
    status: '',
    appliedDate: '',
    profilePicture: '',
    cv: '',
    interviewDate: '',
    interviewTime: '',
  });

  // Load candidates from localStorage or use initial data
  useEffect(() => {
    const storedCandidates = localStorage.getItem('candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    } else {
      setCandidates(initialCandidates);
    }
  }, []);

  // Update localStorage whenever candidates, sortConfig, or filterValue change
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
    applyFilterAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates, sortConfig, filterValue]);

  // Apply filter and sort to candidates
  const applyFilterAndSort = () => {
    let updatedCandidates = [...candidates];

    // Filter
    if (filterValue) {
      updatedCandidates = updatedCandidates.filter((candidate) => {
        return (
          candidate.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          candidate.position.toLowerCase().includes(filterValue.toLowerCase()) ||
          candidate.status.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
    }

    // Sort
    if (sortConfig !== null) {
      updatedCandidates.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // For interviewDate and interviewTime, combine them for sorting
        if (sortConfig.key === 'interviewDate') {
          aValue = a.interviewDate
            ? new Date(`${a.interviewDate}T${a.interviewTime || '00:00'}`)
            : new Date(0);
          bValue = b.interviewDate
            ? new Date(`${b.interviewDate}T${b.interviewTime || '00:00'}`)
            : new Date(0);
        } else if (sortConfig.key === 'appliedDate') {
          aValue = a.appliedDate ? new Date(a.appliedDate) : new Date(0);
          bValue = b.appliedDate ? new Date(b.appliedDate) : new Date(0);
        } else {
          // For other keys like name, position, status
          aValue = aValue.toString().toLowerCase();
          bValue = bValue.toString().toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredCandidates(updatedCandidates);
  };

  // Handle sorting
  const handleSortChange = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  // Handle filter input change
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle opening and closing modals
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewCandidate({
      name: '',
      position: '',
      status: '',
      appliedDate: '',
      profilePicture: '',
      cv: '',
      interviewDate: '',
      interviewTime: '',
    });
  };

  const openViewModal = (candidate) => {
    if (!candidate.cv) {
      generateDummyCV(candidate.id);
    } else {
      setSelectedCandidate(candidate);
      setIsViewModalOpen(true);
    }
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  const openUpdateModal = (candidate) => {
    setSelectedCandidate(candidate);
    setUpdateStatus(candidate.status);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const openEditModal = (candidate) => {
    setEditCandidate({ ...candidate });
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCandidate({
      id: null,
      name: '',
      position: '',
      status: '',
      appliedDate: '',
      profilePicture: '',
      cv: '',
      interviewDate: '',
      interviewTime: '',
    });
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        alert('Profile picture size should be less than 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditCandidate({ ...editCandidate, profilePicture: reader.result });
        } else {
          setNewCandidate({ ...newCandidate, profilePicture: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle CV upload and convert to Base64
  const handleCvUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        alert('CV size should be less than 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditCandidate({ ...editCandidate, cv: reader.result });
        } else {
          setNewCandidate({ ...newCandidate, cv: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate a dummy CV using jsPDF
  const generateDummyCV = (candidateId) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Curriculum Vitae', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${candidates.find(c => c.id === candidateId).name}`, 20, 40);
    doc.text(`Position Applied: ${candidates.find(c => c.id === candidateId).position}`, 20, 50);
    doc.text('Experience:', 20, 70);
    doc.text('- Developed scalable web applications.', 25, 80);
    doc.text('- Led a team of 5 software engineers.', 25, 90);
    doc.text('Education:', 20, 110);
    doc.text('- B.Sc. in Computer Science from XYZ University.', 25, 120);

    const pdfDataUri = doc.output('datauristring');

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId ? { ...candidate, cv: pdfDataUri } : candidate
    );
    setCandidates(updatedCandidates);

    const updatedCandidate = updatedCandidates.find(c => c.id === candidateId);
    setSelectedCandidate(updatedCandidate);
    setIsViewModalOpen(true);
  };

  // Handle adding a new candidate
  const handleAddCandidate = (e) => {
    e.preventDefault();
    // Validation: Ensure required fields are filled
    if (
      !newCandidate.name ||
      !newCandidate.position ||
      !newCandidate.status ||
      !newCandidate.appliedDate
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const newId = candidates.length > 0 ? Math.max(...candidates.map((c) => c.id)) + 1 : 1;
    const candidateToAdd = { id: newId, ...newCandidate };
    setCandidates([candidateToAdd, ...candidates]);
    closeAddModal();
  };

  // Handle updating candidate status
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!updateStatus) {
      alert('Please select a status.');
      return;
    }
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === selectedCandidate.id ? { ...candidate, status: updateStatus } : candidate
    );
    setCandidates(updatedCandidates);
    closeUpdateModal();
  };

  // Handle saving edited candidate
  const handleSaveEditCandidate = (e) => {
    e.preventDefault();
    // Validation: Ensure required fields are filled
    if (
      !editCandidate.name ||
      !editCandidate.position ||
      !editCandidate.status ||
      !editCandidate.appliedDate
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === editCandidate.id ? { ...editCandidate } : candidate
    );
    setCandidates(updatedCandidates);
    closeEditModal();
  };

  // Handle deleting a candidate
  const handleDeleteCandidate = (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      const updatedCandidates = candidates.filter((candidate) => candidate.id !== candidateId);
      setCandidates(updatedCandidates);
    }
  };

  return (
    <div className="candidates">
      {/* Header Section */}
      <div className="candidates-header">
        <h1 className="candidates-title">Candidates</h1>
        <div className="header-actions">
          <button className="button add-button" onClick={openAddModal}>
            <FaPlus /> Add New Candidate
          </button>
          <div className="search-container">
            
            <input
              type="search"
              placeholder="Search candidates..."
              value={filterValue}
              onChange={handleFilterChange}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <table className="candidates-table">
        <thead>
          <tr>
            <th>
              <button className="sortable" onClick={() => handleSortChange('name')}>
                Candidate's Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>
              <button className="sortable" onClick={() => handleSortChange('position')}>
                Position {sortConfig.key === 'position' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>
              <button className="sortable" onClick={() => handleSortChange('status')}>
                Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>
              <button className="sortable" onClick={() => handleSortChange('appliedDate')}>
                Applied Date {sortConfig.key === 'appliedDate' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            {/* Interview Date and Time Column */}
            <th>
              <button className="sortable" onClick={() => handleSortChange('interviewDate')}>
                Interview Date and Time {sortConfig.key === 'interviewDate' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidates.length > 0 ? (
            currentCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="candidate-name">
                  {candidate.profilePicture ? (
                    <img src={candidate.profilePicture} alt={candidate.name} className="profile-picture" />
                  ) : (
                    <div className="profile-picture-placeholder">No Image</div>
                  )}
                  {candidate.name}
                </td>
                <td>{candidate.position}</td>
                <td>{candidate.status}</td>
                <td>{candidate.appliedDate}</td>
                {/* Display Interview Date and Time */}
                <td>
                  {candidate.interviewDate && candidate.interviewTime ? (
                    <>
                      {candidate.interviewDate} at {candidate.interviewTime}
                    </>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  <button className="button view-button" onClick={() => openViewModal(candidate)}>
                    <FaEye /> View CV
                  </button>
                  <button className="button update-button" onClick={() => openUpdateModal(candidate)}>
                    <FaSyncAlt /> Update Status
                  </button>
                  <button className="button edit-button" onClick={() => openEditModal(candidate)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="button delete-button" onClick={() => handleDeleteCandidate(candidate.id)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-candidates">
                No candidates found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Candidate</h2>
            <form onSubmit={handleAddCandidate}>
              <label>Name<span className="required">*</span>:</label>
              <input
                type="text"
                required
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
              />

              <label>Position<span className="required">*</span>:</label>
              <select
                required
                value={newCandidate.position}
                onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
              >
                <option value="">Select Position</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Designer">Designer</option>
                {/* Add more positions as needed */}
              </select>

              <label>Status<span className="required">*</span>:</label>
              <select
                required
                value={newCandidate.status}
                onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>

              <label>Applied Date<span className="required">*</span>:</label>
              <input
                type="date"
                required
                value={newCandidate.appliedDate}
                onChange={(e) => setNewCandidate({ ...newCandidate, appliedDate: e.target.value })}
              />

              {/* Interview Date and Time Fields */}
              <label>Interview Date:</label>
              <input
                type="date"
                value={newCandidate.interviewDate}
                onChange={(e) => setNewCandidate({ ...newCandidate, interviewDate: e.target.value })}
              />

              <label>Interview Time:</label>
              <input
                type="time"
                value={newCandidate.interviewTime}
                onChange={(e) => setNewCandidate({ ...newCandidate, interviewTime: e.target.value })}
              />

              <label>Profile Picture:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />

              <label>CV:</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} />

              <div className="modal-actions">
                <button type="submit" className="button submit-button">
                  Add Candidate
                </button>
                <button type="button" className="button cancel-button" onClick={closeAddModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View CV Modal */}
      {isViewModalOpen && selectedCandidate && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCandidate.name}'s CV</h2>
            {selectedCandidate.cv ? (
              <iframe
                title="CV"
                src={selectedCandidate.cv}
                style={{ width: '100%', height: '450px' }}
                frameBorder="0"
              ></iframe>
            ) : (
              <p>No CV available.</p>
            )}
            <button className="button close-button" onClick={closeViewModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {isUpdateModalOpen && selectedCandidate && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Status for {selectedCandidate.name}</h2>
            <form onSubmit={handleUpdateStatus}>
              <label>Status<span className="required">*</span>:</label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
              <div className="modal-actions">
                <button type="submit" className="button submit-button">
                  Update Status
                </button>
                <button type="button" className="button cancel-button" onClick={closeUpdateModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Candidate Modal */}
      {isEditModalOpen && editCandidate.id && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Candidate</h2>
            <form onSubmit={handleSaveEditCandidate}>
              <label>Name<span className="required">*</span>:</label>
              <input
                type="text"
                required
                value={editCandidate.name}
                onChange={(e) => setEditCandidate({ ...editCandidate, name: e.target.value })}
              />

              <label>Position<span className="required">*</span>:</label>
              <select
                required
                value={editCandidate.position}
                onChange={(e) => setEditCandidate({ ...editCandidate, position: e.target.value })}
              >
                <option value="">Select Position</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Designer">Designer</option>
                {/* Add more positions as needed */}
              </select>

              <label>Status<span className="required">*</span>:</label>
              <select
                required
                value={editCandidate.status}
                onChange={(e) => setEditCandidate({ ...editCandidate, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>

              <label>Applied Date<span className="required">*</span>:</label>
              <input
                type="date"
                required
                value={editCandidate.appliedDate}
                onChange={(e) => setEditCandidate({ ...editCandidate, appliedDate: e.target.value })}
              />

              {/* Interview Date and Time Fields */}
              <label>Interview Date:</label>
              <input
                type="date"
                value={editCandidate.interviewDate}
                onChange={(e) => setEditCandidate({ ...editCandidate, interviewDate: e.target.value })}
              />

              <label>Interview Time:</label>
              <input
                type="time"
                value={editCandidate.interviewTime}
                onChange={(e) => setEditCandidate({ ...editCandidate, interviewTime: e.target.value })}
              />

              <label>Profile Picture:</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />

              <label>CV:</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleCvUpload(e, true)} />

              <div className="modal-actions">
                <button type="submit" className="button submit-button">
                  Save Changes
                </button>
                <button type="button" className="button cancel-button" onClick={closeEditModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
