import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import JobList from '../../../components/Job/JobList';
import JobForm from '../../../components/Job/JobForm';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import PreviewModal from '../../Job/PreviewModal';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editJobData, setEditJobData] = useState(null); // For editing a job
  const [jobStatus, setJobStatus] = useState('all'); // For job status filter

  const location = useLocation();
  const navigate = useNavigate();

  // Function to get the current status from URL query params
  const getStatusFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('status') || 'all'; // Default to 'all' if no status param exists
  };

  // Fetch jobs from the API based on the selected status
  const fetchJobs = async () => {
    try {
      const status = getStatusFromQuery();
      setJobStatus(status); // Update the status filter in the state

      const response = await fetch(`http://localhost:4000/api/admin/jobs?status=${status}`);
      const data = await response.json();
      setJobs(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Call fetchJobs when the component mounts or when the query params change
  useEffect(() => {
    fetchJobs();
  }, [location.search]); // This will trigger fetch when URL changes (i.e., when status filter is changed)

  // Handle job creation
  const handleCreateJob = () => {
    setEditJobData(null); // Reset the form for new job
    setModalShow(true);   // Show the modal
  };

  // Handle viewing a job
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setModalView(true); // Show the preview modal
  };

  const closeModal = () => {
    setModalView(false);
    setSelectedJob(null); // Clear the selected job
  };

  // Handle job editing
  const handleEditJob = (job) => {
    setEditJobData(job); // Set the form with job data for editing
    setModalShow(true);  // Show the modal
  };

  // Delete a job
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

  // Handle save job (create or update)
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

  // Handle delete job from the list
  const handleDeleteJob = async (jobId) => {
    const success = await deleteJob(jobId);
    if (success) {
      setJobs(jobs.filter(job => job.id !== jobId));
      console.log(`Job with id ${jobId} deleted successfully.`);
    } else {
      console.error(`Failed to delete job with id ${jobId}.`);
    }
  };

  // Handle status change and update URL query parameter
  const handleStatusChange = (status) => {
    setJobStatus(status);

    // Update the URL to reflect the selected status
    navigate({
      pathname: '/admin/manage-jobs',
      search: `?status=${status}`,
    });
  };

  return (
    <AdminLayout>
      <div className="content">
        <h2>Manage Jobs</h2>

        <div className="d-flex align-items-center mb-3">
          <Button variant="primary" onClick={handleCreateJob} className="mr-3">
            Create Job
          </Button>

          {/* Dropdown for filtering jobs by status */}
          <Dropdown className='m-1'>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {jobStatus === 'all' ? 'All Jobs' : jobStatus === 'active' ? 'Active Jobs' : 'Expired Jobs'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleStatusChange('all')}>All Jobs</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange('active')}>Active Jobs</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange('expired')}>Expired Jobs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <JobList jobs={jobs} onDelete={handleDeleteJob} onEdit={handleEditJob} onView={handleViewJob} />

        <Modal show={modalShow} onHide={() => setModalShow(false)} className='modal-lg'>
          <Modal.Header closeButton>
            <Modal.Title>{editJobData ? 'Edit Job' : 'Create Job'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobForm onSubmit={handleSaveJob} initialData={editJobData} setModalShow={setModalShow} fetchJobs={fetchJobs} />
          </Modal.Body>
        </Modal>

        <PreviewModal show={modalView} handleClose={closeModal} job={selectedJob} />
      </div>
    </AdminLayout>
  );
};

export default JobManagement;
