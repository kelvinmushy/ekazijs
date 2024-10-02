import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import JobList from '../../../components/Job/JobList';


// Static job data
// const jobs = [
//   { id: 1, title: 'Software Engineer', description: 'Develop software applications.' },
//   { id: 2, title: 'Product Manager', description: 'Manage product development.' },
//   { id: 3, title: 'UX Designer', description: 'Design user experiences.' },
// ];

const JobManagement = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', description: 'Develop applications' },
    { id: 2, title: 'Data Analyst', description: 'Analyze data trends' },
    // More jobs here
  ]);

  const handleDelete = (jobId) => {
    // Logic to delete a job by id
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleEdit = (job) => {
    // Logic to edit the job
    console.log(`Editing job:`, job);
  };
  return (
    <AdminLayout>
      <div className="content">
        <h2>Manage Jobs</h2>
    
          <JobList jobs={jobs} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </AdminLayout>
  );
};

export default JobManagement;
