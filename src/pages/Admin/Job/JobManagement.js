import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import JobList from '../../../components/Job/JobList';
import JobForm from '../../../components/Job/JobForm';
import { Modal, Button } from 'react-bootstrap';
import PreviewModal from '../../Job/PreviewModal';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const [editJobData, setEditJobData] = useState(null);  // For editing a job

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/jobs');
      const data = await response.json();
      setJobs(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

 


  // Handle job creation
  const handleCreateJob = () => {
    setEditJobData(null);  // Reset the form for new job
    setModalShow(true);    // Show the modal
  };
// Handle job creation
const handleViewJob = (job) => {
   // Show the modal
     console.log("view Job",job);
     setSelectedJob(job);
      setModalView(true);
};

const closeModal = () => {
  setModalView(false);
  setSelectedJob(null); // Clear the selected job
};
  // Handle job editing
  const handleEditJob = (job) => {
    setEditJobData(job);   // Set the form with job data for editing
    setModalShow(true);    // Show the modal
  };

  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/job/${jobId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
  
      return true; // Return true on success
    } catch (error) {
      console.error("Error deleting job:", error);
      return false; // Return false on failure
    }
  };
  
  const handleSaveJob = async (jobData) => {
    try {
      let success;
  
      if (editJobData) {
        success = await updateJob({ ...editJobData, ...jobData });
        if (success) {
          setJobs(jobs.map(job => job.id === editJobData.id ? { ...job, ...jobData } : job));
        }
      } else {
        success = await addJob(jobData);
        if (success) {
          setJobs([...jobs, jobData]);
        }
      }
  
      if (success) {
        setModalShow(false);
      } else {
        console.error("Failed to save job.");
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };
  

  const handleDeleteJob = async (jobId) => {
    const success = await deleteJob(jobId); // Call the deleteJob function
  
    if (success) {
      // If deletion was successful, update the state
      setJobs(jobs.filter(job => job.id !== jobId));
      console.log(`Job with id ${jobId} deleted successfully.`);
    } else {
      console.error(`Failed to delete job with id ${jobId}.`);
    }
  };
  
  return (
    <AdminLayout>
      <div className="content">
        <h2>Manage Jobs</h2>

        <Button variant="primary" onClick={handleCreateJob}>
          Create Job
        </Button>

        <JobList jobs={jobs} onDelete={handleDeleteJob} onEdit={handleEditJob} onView={handleViewJob} />

        <Modal show={modalShow} onHide={() => setModalShow(false)} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>{editJobData ? 'Edit Job' : 'Create Job'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobForm onSubmit={handleSaveJob} initialData={editJobData}  setModalShow={setModalShow} fetchJobs={fetchJobs}  />
          </Modal.Body>
        </Modal>

        <PreviewModal

        show={modalView} 
        handleClose={closeModal} 
        job={selectedJob} 
        
        />
      </div>
    </AdminLayout>
  );
};

export default JobManagement;
