import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';

const Header = () => (
  <>
    <style>
      {`
        /* Add custom styles for the navbar buttons */
        .nav-link-custom {
          border-radius: 30px; /* Rounded corners for the buttons */
          padding: 10px 20px; /* Add some padding for a better appearance */
          font-weight: 600; /* Make the text bold */
          transition: all 0.3s ease; /* Smooth transition for hover effect */
          color: white; /* Default color for the links */
        }

        /* Hover effect for the buttons */
        .nav-link-custom:hover {
          background-color: black; /* Black background on hover */
          color: white; /* Text color changes to white */
          transform: scale(1.05); /* Slight scaling effect */
        }

        /* Additional styling for the navbar */
        .navbar {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for a sleek look */
        }

        /* Ensure the navbar toggle icon is visible on mobile */
        .navbar-toggle {
          border-color: white;
        }

        /* Optional: Add white color for navbar text links */
        .navbar-nav .nav-link {
          color: white !important;
        }
      `}
    </style>

    <Navbar expand="lg" fixed="top" style={{ background: '#276795' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
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
          <Nav className="ms-auto me-auto"> {/* Center-aligning links */}
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/all-jobs" className="nav-link-custom">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/post-job" className="nav-link-custom text-warning" > Free Post a Job</Nav.Link>
           
          </Nav>
          <Nav className="ms-auto"> {/* Aligning login/register to the right */}
            <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="nav-link-custom">Register</Nav.Link>
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
);

export default Header;
