import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import JobList from '../../../components/Job/JobList';
import JobForm from '../../../components/Job/JobForm';
import { Modal, Button } from 'react-bootstrap';

const JobManagement = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', description: 'Develop applications' },
    { id: 2, title: 'Data Analyst', description: 'Analyze data trends' },
  ]);

  const [modalShow, setModalShow] = useState(false);
  const [editJobData, setEditJobData] = useState(null);  // For editing a job

  // Handle job creation
  const handleCreateJob = () => {
    setEditJobData(null);  // Reset the form for new job
    setModalShow(true);    // Show the modal
  };

  // Handle job editing
  const handleEditJob = (job) => {
    setEditJobData(job);   // Set the form with job data for editing
    setModalShow(true);    // Show the modal
  };

  // Save job (create or edit)
  const handleSaveJob = (jobData) => {
    if (editJobData) {
      setJobs(jobs.map(job => (job.id === editJobData.id ? { ...job, ...jobData } : job)));  // Edit existing job
    } else {
      setJobs([...jobs, { ...jobData, id: jobs.length + 1 }]);  // Add new job
    }
    setModalShow(false);   // Close the modal after save
  };

  // Handle job deletion
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  return (
    <AdminLayout>
      <div className="content">
        <h2>Manage Jobs</h2>

        {/* Button to open the modal for creating a new job */}
        <Button variant="primary" onClick={handleCreateJob}>
          Create Job
        </Button>

        {/* Job List component */}
        <JobList jobs={jobs} onDelete={handleDeleteJob} onEdit={handleEditJob} />

        {/* Modal for JobForm */}
        <Modal show={modalShow} onHide={() => setModalShow(false)} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>{editJobData ? 'Edit Job' : 'Create Job'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobForm onSubmit={handleSaveJob} initialData={editJobData} />
          </Modal.Body>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default JobManagement;
