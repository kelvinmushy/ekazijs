import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployerSidebar = () => {
  const [jobCounts, setJobCounts] = useState({
    active: 0,
    expired: 0,
    all: 0
  });

  // Fetch job counts (active, expired, all) from the API
  const fetchJobCounts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/counts/${employerId}`);

      
      const data = await response.json();
      setJobCounts(data); // Set the job counts for active, expired, and all
    } catch (error) {
      console.error('Error fetching job counts:', error);
    }
  };

  // Fetch counts when the component mounts
  useEffect(() => {
    fetchJobCounts();
  }, []);

  return (
    <div>
      <Card style={{ marginBottom: '0.1rem' }}>
        <Card.Body>
          <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240830075831logo-w__1_.jpg&amp;size=300"
              alt="Logo"
              style={{ width: '100px', borderRadius: '0.5rem' }}
            />
          </div>
          <div className="text-center mt-2">
            <a href="#" className="small" style={{ color: '#0a66c2' }}>
              Edit Logo
            </a>
          </div>
          <div className="mt-3 fw-bold text-capitalize mb-3">
            Welcome, Metagrowth Digital
          </div>
        </Card.Body>
      </Card>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="mt-2">
          <Accordion.Header>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Accordion.Header>
          <Accordion.Body>
            <Link to="/employer/dashboard" className="accordion-button2 fw-bold drop-padd card-dashboard2">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="bi bi-briefcase-fill me-2" style={{ color: '#808080' }}></i> Job Posting
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/employer/manage-jobs">Manage Jobs</Link>
            </div>
            <div className="pb-1">
  <Link 
    to="/employer/manage-jobs?status=all"
    style={{ color: '#0a66c2', fontWeight: 'bold' }} // Blue for all jobs
  >
    List of Jobs ({jobCounts.all})
  </Link>
</div>

<div className="pb-1">
  <Link 
    to="/employer/manage-jobs?status=active"
    style={{ color: '#28a745', fontWeight: 'bold' }} // Green for active jobs
  >
    Active Jobs ({jobCounts.active})
  </Link>
</div>

<div className="pb-1">
  <Link 
    to="/employer/manage-jobs?status=expired"
    style={{ color: '#dc3545', fontWeight: 'bold' }} // Red for expired jobs
  >
    Expired Jobs ({jobCounts.expired})
  </Link>
</div>

          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <i className="bi bi-search me-2" style={{ color: '#808080' }}></i> Search Resumes
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="#">Search Resume</a>
            </div>
            <div className="pb-1">
              <a href="#">Search Applicant</a>
            </div>
            <div className="pb-1">
              <a href="#">Resume Search Agents</a> (3)
            </div>
            <div className="pb-1">
              <a href="#">Saved Resumes</a> (28)
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <i className="bi bi-person-bounding-box me-2" style={{ color: '#808080' }}></i> Applicant Tracking
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="#">Applicant Tracking</a> (75)
            </div>
            <div className="pb-1">
              <a href="#">Direct Applicants</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <i className="bi bi-shield-lock-fill me-2" style={{ color: '#808080' }}></i> My Account
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/employer/profile">Employer Profile</Link>
            </div>
            <div className="pb-1">
              <Link to="/employer/manage/users">Manage Users (5)</Link>
            </div>
            <div className="pb-1">
              <Link to="/employer/change/password">Change Password</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EmployerSidebar;
