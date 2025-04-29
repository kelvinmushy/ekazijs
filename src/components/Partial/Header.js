import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const [applicantFirstname, setApplicantFirstname] = useState('');
  const [applicantLastname, setApplicantLastname] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [logo, setLogo] = useState(localStorage.getItem('employerLogo') || null); // Initialize logo from localStorage

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.userType);
        setApplicantFirstname(localStorage.getItem('applicantFirstname') || '');
        setApplicantLastname(localStorage.getItem('applicantLastname') || '');
        setEmployerName(localStorage.getItem('employerName') || '');
        setLogo(localStorage.getItem('logo') || null);
      } catch (error) {
        console.error('Invalid token:', error);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'employer':
        return '/employer/dashboard';
      case 'applicant':
        return '/applicant/dashboard';
      default:
        return '/';
    }
  };

  const renderUserName = () => {
    if (userRole === 'applicant') {
      return `${applicantFirstname} ${applicantLastname}`;
    }
    if (userRole === 'employer') {
      return employerName;
    }
    return 'My Account';
  };

  const getProfileImage = () => {
    if (userRole === 'employer' && logo) {
      return logo; // Use employer's uploaded logo
    }
    return 'https://via.placeholder.com/30'; // Default placeholder for applicants or if no logo
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
              {userRole === 'employer' && (
                <Nav.Link href="/employer/manage-jobs" className="nav-link-custom">
                  Manage Jobs
                </Nav.Link>
              )}
            </Nav>

            <Nav className="ms-auto">
              {!userRole ? (
                <>
                  <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
                  <Nav.Link href="/register" className="nav-link-custom">Register</Nav.Link>
                </>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="nav-link-custom"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <img
                      src={logo ? `http://localhost:4000${logo}` : 'https://via.placeholder.com/100'}
                      alt="Profile"
                      width="30"
                      height="30"
                      className="rounded-circle me-2"
                      style={{ objectFit: 'cover' }}
                    />
                    {renderUserName()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href={getDashboardLink()}>Dashboard</Dropdown.Item>
                    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
