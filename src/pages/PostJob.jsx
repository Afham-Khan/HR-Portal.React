// import React, { useState } from 'react';
// import './PostJob.css';

// const PostJob = ({ onSubmit }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [salary, setSalary] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Call the onSubmit function with form data
//     onSubmit({ title, description, location, salary });

//     // Reset form fields
//     setTitle('');
//     setDescription('');
//     setLocation('');
//     setSalary('');
//   };

//   return (
//     <form className="postjob-form" onSubmit={handleSubmit}>
//       <h2>Post a New Job</h2>
//       <div>
//         <label>Job Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Job Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Location</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Salary</label>
//         <input
//           type="number"
//           value={salary}
//           onChange={(e) => setSalary(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PostJob;



import React, { useState, useEffect } from 'react';
import './PostJob.css';

const PostJob = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  // Populate fields if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setLocation(initialData.location);
      setSalary(initialData.salary);
    } else {
      setTitle('');
      setDescription('');
      setLocation('');
      setSalary('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function with form data
    onSubmit({ title, description, location, salary });

    // Reset form fields
    setTitle('');
    setDescription('');
    setLocation('');
    setSalary('');
  };

  return (
    <form className="postjob-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Job' : 'Post a New Job'}</h2>
      <div>
        <label>Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Job Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Salary</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </div>
      <button type="submit">{initialData ? 'Update' : 'Submit'}</button>
    </form>
  );
};

export default PostJob;

