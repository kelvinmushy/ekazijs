import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import JobList from '../../../components/Job/JobList';
import JobForm from '../../../components/Job/JobForm';
import { Modal, Button } from 'react-bootstrap';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editJobData, setEditJobData] = useState(null);  // For editing a job

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to add a new job
  const addJob = async (job) => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error('Failed to save the job');
      }

      const savedJob = await response.json();
      setJobs((prevJobs) => [...prevJobs, savedJob]);
      setModalShow(false); // Close the modal

    } catch (error) {
      console.error('Error adding job:', error.message);
    }
  };

  // Function to update an existing job
  const updateJob = async (job) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/job/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error('Failed to update the job');
      }

      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === updatedJob.id ? updatedJob : j))
      );
      setModalShow(false); // Close the modal

    } catch (error) {
      console.error('Error updating job:', error.message);
    }
  };

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
      updateJob({ ...editJobData, ...jobData }); // Update existing job
      setModalShow(false);  
    } else {
      addJob(jobData); // Add new job
      setModalShow(false);  
    }
  };

  // Handle job deletion
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  return (
    <AdminLayout>
      <div className="content">
        <h2>Manage Jobs</h2>

        <Button variant="primary" onClick={handleCreateJob}>
          Create Job
        </Button>

        <JobList jobs={jobs} onDelete={handleDeleteJob} onEdit={handleEditJob} />

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
