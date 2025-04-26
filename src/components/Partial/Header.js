import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { jwtDecode } from 'jwt-decode'; // 👈 Make sure to import this

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.userType); // 👈 Set userRole (admin, employer, applicant)
      } catch (error) {
        console.error('Invalid token:', error);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [location.pathname]); // Re-run when route changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('employerId');
    localStorage.removeItem('applicantId');
    setUserRole(null);
    navigate('/login'); // Optional: redirect to login
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
                <>
                  <Nav.Link href={getDashboardLink()} className="nav-link-custom">Dashboard</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-link-custom">Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
