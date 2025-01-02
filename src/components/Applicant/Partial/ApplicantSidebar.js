import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ApplicantSidebar = () => {
  const [jobCounts] = useState({
    applied: 5,
    saved: 3,
  });
  const [showModal, setShowModal] = useState(false);
  const [newLogo, setNewLogo] = useState(null);
  const [logo, setLogo] = useState('https://via.placeholder.com/100');
  const [applicantName] = useState('John Doe');
  const applicantId = localStorage.getItem('applicantId'); // Correctly fetch applicantId

  // Track the active key for the accordion
  const [activeKey, setActiveKey] = useState('0'); // Default to '0' (Dashboard)

  // Track the current location (URL) using React Router
  const location = useLocation();

  // Handle logo file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewLogo(file);
  };

  // Fetch applicant logo from the server
  const fetchApplicantLogo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/logo/${applicantId}`);
      const data = await response.json();
      if (data.logo) {
        setLogo(data.logo); // Set the logo if returned from the server
      }
    } catch (error) {
      console.error('Error fetching applicant logo:', error);
    }
  };

  // Handle logo upload
  const handleLogoUpload = async () => {
    if (!newLogo) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('logo', newLogo); // Append the file to the form data

    try {
      const response = await fetch(`http://localhost:4000/api/applicant/upload-logo/${applicantId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setLogo(data.logoPath); // Update the logo state with the new logo path
        setShowModal(false); // Close the modal
      } else {
        alert('Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };



  // Handle the accordion item click
  const handleAccordionSelect = (selectedKey) => {
    // If the selectedKey is the same as activeKey, we should prevent it from collapsing
    setActiveKey(prevKey => (selectedKey === prevKey ? prevKey : selectedKey));
  };

  return (
    <div>
      <Card style={{ marginBottom: '0.1rem' }}>
        <Card.Body>
          <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={logo ? `http://localhost:4000${logo}` : 'https://via.placeholder.com/100'}
              alt="Logo"
              style={{ width: '100px', borderRadius: '0.5rem' }}
            />
          </div>
          <div className="text-center mt-2">
            <a href="#" className="small" style={{ color: '#0a66c2' }} onClick={() => setShowModal(true)}>
              Edit Logo
            </a>
          </div>
          <div className="mt-3 fw-bold text-capitalize mb-3">
            Welcome, {applicantName}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogoUpload}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Controlled Accordion */}
      <Accordion activeKey={activeKey} onSelect={handleAccordionSelect}>
        <Accordion.Item eventKey="0" className="mt-2">
          <Accordion.Header>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Accordion.Header>
          <Accordion.Body>
            <Link to="/applicant/dashboard" className="accordion-button2 fw-bold drop-padd card-dashboard2">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="bi bi-person-bounding-box me-2" style={{ color: '#808080' }}></i> My Profile
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/applicant/personal-details">Personal Details</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/academic">Academic Qualifications</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/professional">Professional Qualifications</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/language">Language Proficiency</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/working-experience">Work Experience</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/skills">Skills</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/referees">Referees</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/change-password">Change Password</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <i className="bi bi-file-earmark-text me-2" style={{ color: '#808080' }}></i> Build My CV
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/applicant/build-cv">Select Cv Template</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/view-cv">My CV</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <i className="bi bi-briefcase-fill me-2" style={{ color: '#808080' }}></i> My Applications
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/applicant/applied-jobs">Applied Jobs ({jobCounts.applied})</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/saved-jobs">Saved Jobs ({jobCounts.saved})</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ApplicantSidebar;
