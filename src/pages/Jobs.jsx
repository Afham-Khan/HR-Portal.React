// // import React from 'react';
// // import './Jobs.css';

// // const jobs = [
// //   { id: 1, title: 'Senior Software Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 45 },
// //   { id: 2, title: 'Product Manager', department: 'Product', location: 'New York, NY', type: 'Full-time', applicants: 32 },
// //   { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco, CA', type: 'Contract', applicants: 28 },
// //   { id: 4, title: 'Data Analyst', department: 'Analytics', location: 'Chicago, IL', type: 'Full-time', applicants: 19 },
// //   { id: 5, title: 'Marketing Specialist', department: 'Marketing', location: 'Remote', type: 'Part-time', applicants: 37 },
// // ];

// // export default function Jobs() {
// //   return (
// //     <div className="jobs">
// //       <div className="jobs-header">
// //         <h1 className="jobs-title">Open Positions</h1>
// //         <button className="button">Post New Job</button>
// //       </div>
// //       <div className="jobs-grid">
// //         {jobs.map((job) => (
// //           <div key={job.id} className="job-card">
// //             <h2 className="job-title">{job.title}</h2>
// //             <p className="job-details">{job.department} • {job.location}</p>
// //             <span className="job-type">{job.type}</span>
// //             <p className="job-applicants">{job.applicants} applicants</p>
// //             <div className="job-actions">
// //               <button className="button button-small">View Details</button>
// //               <button className="button button-small">Edit</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState } from 'react';
// import PostJob from './PostJob';
// import './Jobs.css';

// // Sample job data
// const jobsData = [
//   { id: 1, title: 'Software Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 45, description: 'Responsible for building scalable software systems.' },
//   { id: 2, title: 'Product Manager', department: 'Product', location: 'Onsite', type: 'Part-time', applicants: 32, description: 'Manage product lifecycle and strategy.' },
//   { id: 3, title: 'UX Designer', department: 'Design', location: 'Onsite', type: 'Contract', applicants: 18, description: 'Design user-friendly interfaces.' },
//   { id: 4, title: 'BA Manager', department: 'Engineer', location: 'Hybraid', type: 'Part-time', applicants: 38, description: 'Mnage all the bussines deals.' },
//   { id: 5, title: 'SQA Engineer', department: 'Engineer', location: 'Onsite', type: 'Full-time', applicants: 8, description: 'Manage Quality of the software.' },
//   { id: 6, title: 'Graphic Designer', department: 'Design', location: 'Hybraid', type: 'Contract', applicants: 28, description: 'Design user-friendly interfaces.' },
//   { id: 7, title: 'Sales', department: 'Sales', location: 'Onsite', type: 'Contract', applicants: 28, description: 'Design user-friendly interfaces.' },
//   { id: 8, title: 'Frontend Developer', department: 'Developer', location: 'Remote', type: 'Contract', applicants: 28, description: 'Design user-friendly interfaces.' },
//   // Additional jobs...
// ];  

// export default function Jobs() {
//   const [jobs, setJobs] = useState(jobsData);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isApplying, setIsApplying] = useState(false);

//   const handlePostJobClick = () => {
//     setShowForm(!showForm);
//   };

//   const handleJobSubmit = (newJob) => {
//     const newJobWithId = { ...newJob, id: jobs.length + 1, applicants: 0 };
//     setJobs([...jobs, newJobWithId]);
//     setShowForm(false);
//   };

//   const handleViewDetails = (job) => {
//     setSelectedJob(job); // Set the selected job for viewing
//   };

//   const handleApply = (job) => {
//     setSelectedJob(job);
//     setIsApplying(true); // Show application form
//   };

//   const handleApplicationSubmit = (e) => {
//     e.preventDefault();

//     // Update the applicants count for the selected job
//     const updatedJobs = jobs.map((job) =>
//       job.id === selectedJob.id ? { ...job, applicants: job.applicants + 1 } : job
//     );

//     setJobs(updatedJobs); // Update the state with the new job list
//     setIsApplying(false); // Hide the form after application
//     setSelectedJob(null); // Reset the selected job
//     alert(`Applied for ${selectedJob.title}!`);
//   };

//   return (
//     <div className="jobs">
//       <div className="jobs-header">
//         <h1 className="jobs-title">Open Positions</h1>
//         <button className="button" onClick={handlePostJobClick}>
//           Post New Job
//         </button>
//       </div>

//       {/* Show the PostJob form */}
//       {showForm && <PostJob onSubmit={handleJobSubmit} />}

//       <div className="jobs-grid">
//         {jobs.map((job) => (
//           <div key={job.id} className="job-card">
//             <h2 className="job-title">{job.title}</h2>
//             <p className="job-details">{job.department} • {job.location}</p>
//             <span className="job-type">{job.type}</span>
//             <p className="job-applicants">{job.applicants} applicants</p>
//             <div className="job-actions">
//               <button className="button button-small" onClick={() => handleViewDetails(job)}>View Details</button>
//               <button className="button button-small" onClick={() => handleApply(job)}>Apply</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for viewing job details */}
//       {selectedJob && !isApplying && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>{selectedJob.title}</h2>
//             <p><strong>Department:</strong> {selectedJob.department}</p>
//             <p><strong>Location:</strong> {selectedJob.location}</p>
//             <p><strong>Type:</strong> {selectedJob.type}</p>
//             <p>{selectedJob.description}</p>
//             <button onClick={() => setSelectedJob(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Modal for applying to a job */}
//       {selectedJob && isApplying && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Apply for {selectedJob.title}</h2>
//             <form onSubmit={handleApplicationSubmit}>
//               <div>
//                 <label>Full Name</label>
//                 <input type="text" required />
//               </div>
//               <div>
//                 <label>Email</label>
//                 <input type="email" required />
//               </div>
//               <div>
//                 <label>Resume</label>
//                 <input type="file" required />
//               </div>
//               <button type="submit">Submit Application</button>
//             </form>
//             <button onClick={() => setIsApplying(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// import React, { useState, useEffect } from 'react';
// import PostJob from './PostJob'; // Import the PostJob component
// import './Jobs.css'; // Import the corresponding CSS file

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [isPostJobVisible, setPostJobVisible] = useState(false); // State to toggle PostJob form visibility
//   const [editJobIndex, setEditJobIndex] = useState(null); // State for editing job index

//   // Load jobs from local storage when the component mounts
//   useEffect(() => {
//     const savedJobs = localStorage.getItem('jobs');
//     if (savedJobs) {
//       setJobs(JSON.parse(savedJobs));
//     }
//   }, []);

//   // Handle job submission
//   const handleJobSubmit = (newJob) => {
//     if (editJobIndex !== null) {
//       // If editing an existing job
//       const updatedJobs = [...jobs];
//       updatedJobs[editJobIndex] = newJob; // Update the job at the edit index
//       localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//       setJobs(updatedJobs);
//       setEditJobIndex(null); // Reset the edit index
//     } else {
//       // If adding a new job
//       const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
//       existingJobs.push(newJob);
//       localStorage.setItem('jobs', JSON.stringify(existingJobs));
//       setJobs(existingJobs); // Update the state to reflect the new job
//     }
//     setPostJobVisible(false); // Hide the post job form after submission
//   };

//   // Handle editing a job
//   const handleEdit = (index) => {
//     setEditJobIndex(index); // Set the index of the job to edit
//     setPostJobVisible(true); // Show the post job form
//   };

//   // Handle deleting a job
//   const handleDelete = (index) => {
//     const updatedJobs = jobs.filter((_, jobIndex) => jobIndex !== index);
//     localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//     setJobs(updatedJobs); // Update the state to reflect the deletion
//   };

//   return (
//     <div className="jobs-page">
//       <h1>Jobs Page</h1>
      
//       <button onClick={() => {
//         setPostJobVisible(!isPostJobVisible);
//         setEditJobIndex(null); // Reset edit index when adding new job
//       }}>
//         {isPostJobVisible ? 'Cancel' : 'Post a Job'}
//       </button>

//       {/* PostJob form is rendered conditionally */}
//       {isPostJobVisible && <PostJob onSubmit={handleJobSubmit} initialData={editJobIndex !== null ? jobs[editJobIndex] : null} />}

//       <h2>Job Listings</h2>
//       <div className="job-listings">
//         {jobs.length > 0 ? (
//           jobs.map((job, index) => (
//             <div key={index} className="job-card">
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Salary:</strong> ${job.salary}</p>
//               <button onClick={() => handleEdit(index)}>Edit</button>
//               <button onClick={() => handleDelete(index)}>Delete</button>
//             </div>
//           ))
//         ) : (
//           <p>No jobs available. Click "Post a Job" to add a new job listing.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Jobs;



import React, { useState, useEffect } from 'react';
import PostJob from './PostJob'; // Import the PostJob component
import './Jobs.css'; // Import the corresponding CSS file

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isPostJobVisible, setPostJobVisible] = useState(false); // State to toggle PostJob form visibility
  const [editJobIndex, setEditJobIndex] = useState(null); // State for editing job index

  // Load jobs from local storage when the component mounts
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Handle job submission
  const handleJobSubmit = (newJob) => {
    if (editJobIndex !== null) {
      // If editing an existing job
      const updatedJobs = [...jobs];
      updatedJobs[editJobIndex] = newJob; // Update the job at the edit index
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
      setEditJobIndex(null); // Reset the edit index
    } else {
      // If adding a new job
      const existingJobs = [...jobs, newJob]; // Add new job to existing jobs
      localStorage.setItem('jobs', JSON.stringify(existingJobs));
      setJobs(existingJobs); // Update the state to reflect the new job
    }
    setPostJobVisible(false); // Hide the post job form after submission
  };

  // Handle editing a job
  const handleEdit = (index) => {
    setEditJobIndex(index); // Set the index of the job to edit
    setPostJobVisible(true); // Show the post job form
  };

  // Handle deleting a job
  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, jobIndex) => jobIndex !== index);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs); // Update the state to reflect the deletion
  };

  // Handle applying for a job
  const handleApply = (job) => {
    alert(`You have applied for the position of ${job.title}.`); // You can customize this behavior
  };

  return (
    <div className="jobs-page">
      <h1>Job Page</h1>
      
      <button onClick={() => {
        setPostJobVisible(!isPostJobVisible);
        setEditJobIndex(null); // Reset edit index when adding new job
      }}>
        {isPostJobVisible ? 'Cancel' : 'Post a Job'}
      </button>

      {/* PostJob form is rendered conditionally */}
      {isPostJobVisible && <PostJob onSubmit={handleJobSubmit} initialData={editJobIndex !== null ? jobs[editJobIndex] : null} />}

      <h2>Job Listings</h2>
      <div className="job-listings">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ${job.salary}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleApply(job)}>Apply for Job</button> {/* Apply button */}
            </div>
          ))
        ) : (
          <p>No jobs available. Click "Post a Job" to add a new job listing.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
