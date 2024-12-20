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

  // Track the active key for the accordion
  const [activeKey, setActiveKey] = useState('0'); // Default to '0' (Dashboard)

  // Track the current location (URL) using React Router
  const location = useLocation();

  // Handle logo file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewLogo(file);
  };

  // Handle logo upload
  const handleLogoUpload = () => {
    if (!newLogo) {
      alert('Please select an image to upload');
      return;
    }
    setLogo(URL.createObjectURL(newLogo));
    setShowModal(false);
  };

  // Update activeKey based on the current location (URL path)
  useEffect(() => {
    if (location.pathname.includes('dashboard')) {
      setActiveKey('0');
    } else if (location.pathname.includes('personal-details') || location.pathname.includes('academic') || location.pathname.includes('professional') || location.pathname.includes('language') || location.pathname.includes('working-experience') || location.pathname.includes('skills') || location.pathname.includes('referees') || location.pathname.includes('change-password')) {
      setActiveKey('1'); // My Profile section should remain open
    } else if (location.pathname.includes('build-cv') || location.pathname.includes('view-cv')) {
      setActiveKey('2');
    } else if (location.pathname.includes('applied-jobs') || location.pathname.includes('saved-jobs')) {
      setActiveKey('3');
    }
  }, [location]);

  return (
    <div>
      <Card style={{ marginBottom: '0.1rem' }}>
        <Card.Body>
          <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '100px', borderRadius: '0.5rem' }} />
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
      <Accordion activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
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
              <Link to="/applicant/build-cv">Start Building Your CV</Link>
            </div>
            <div className="pb-1">
              <Link to="/applicant/view-cv">View My CV</Link>
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
