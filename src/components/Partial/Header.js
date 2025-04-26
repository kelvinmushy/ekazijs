import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get employerId from localStorage
  const employerId = localStorage.getItem('employerId');
  
  console.log('Employer ID:', employerId);

  // Check if the employer is logged in based on the employerId in localStorage
  useEffect(() => {
    // Make sure that the employerId is valid and not set to 'null' or an empty string
    if (employerId && employerId !== 'null' && employerId !== '') {
      // You can also validate the employerId on the server (optional)
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [employerId]);

  const handleManageJobsClick = () => {
    if (!isLoggedIn) {
      // If not logged in, redirect to login page with the current location to redirect back after login
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      // Proceed to manage jobs if logged in
      navigate('/employer/manage-jobs');
    }
  };

  return (
    <>
      <style>
        {`
          .nav-link-custom {
            border-radius: 30px;
            padding: 10px 20px;
            font-weight: 600;
            transition: all 0.3s ease;
            color: #f0ad4e;
          }

          .nav-link-custom:hover {
            background-color: black;
            color: #f0ad4e !important;
            transform: scale(1.05);
          }

          .navbar {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .navbar-toggle {
            border-color: white;
          }

          .navbar-nav .nav-link {
            color: white !important;
          }
        `}
      </style>

      <Navbar expand="lg" fixed="top" style={{ background: '#276795' }}>
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://ejobsitesoftware.com/jobboard_demo/img/logo.png"
              width="149"
              height="25"
              alt="Jobboard Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" className="text-white">
            <BsList />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto me-auto">
              <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="/all-jobs" className="nav-link-custom">Jobs</Nav.Link>

              {/* Manage Jobs link */}
              <Nav.Link
                onClick={handleManageJobsClick} // Check login status and either redirect to login or manage jobs
                className="nav-link-custom"
              >
                Manage Jobs
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
              <Nav.Link href="/register" className="nav-link-custom">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
