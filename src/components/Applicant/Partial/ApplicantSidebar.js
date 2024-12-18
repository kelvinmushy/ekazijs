import React, { useState } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ApplicantSidebar = () => {
  // Static data for the applicant
  const [jobCounts] = useState({
    applied: 5, // Static number of jobs applied
    saved: 3,   // Static number of jobs saved
  });
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [newLogo, setNewLogo] = useState(null); // State for new logo file
  const [logo, setLogo] = useState('https://via.placeholder.com/100'); // Static logo placeholder
  const [applicantName] = useState('John Doe'); // Static applicant name

  // Handle logo file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewLogo(file); // Update the newLogo state with the selected file
  };

  // Handle logo upload
  const handleLogoUpload = () => {
    if (!newLogo) {
      alert('Please select an image to upload');
      return;
    }

    // Normally here you'd upload to the server, but we just simulate the logo change for now
    setLogo(URL.createObjectURL(newLogo)); // Update the logo with the selected image
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <Card style={{ marginBottom: '0.1rem' }}>
        <Card.Body>
          <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Use the dynamic logo URL from state */}
            <img
              src={logo}
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
            Welcome, {applicantName} {/* Static applicant name */}
          </div>
        </Card.Body>
      </Card>

      {/* Modal for editing logo */}
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

      <Accordion defaultActiveKey="0">
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


      {/* New CV Builder Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="bi bi-file-earmark-text me-2" style={{ color: '#808080' }}></i> Build My CV
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/applicant/build-cv">Start Building Your CV</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/view-cv">View My CV</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
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

       

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <i className="bi bi-person-bounding-box me-2" style={{ color: '#808080' }}></i> My Profile
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link to="/applicant/profile">Edit Profile</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/change-password">Change Password</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
};

export default ApplicantSidebar;
