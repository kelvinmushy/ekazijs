import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" fixed="top" style={{ backgroundColor: '#000' }}>
      <Container>
        <Navbar.Brand href="https://ejobsitesoftware.com/jobboard_demo/">
          <img
            src="https://ejobsitesoftware.com/jobboard_demo/img/logo.png"
            width="149"
            height="25"
            alt="Jobboard Logo"
            style={{ filter: 'brightness(0) invert(1)' }} // Ensures the logo is visible on a black background
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" className="text-white">
          <BsList />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="https://ejobsitesoftware.com/jobboard_demo/" className="text-white">Home</Nav.Link>
            <NavDropdown title={<span className="text-white">Jobs</span>} id="navbarDropdown1">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search-by-industry/" className="text-dark">
                By Category
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search-by-location/" className="text-dark">
                By Location
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/jobs-by-company/" className="text-dark">
                By Company
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search-by-skill/" className="text-dark">
                By Skill
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search/" className="text-dark">
                Advance Search
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span className="text-white">Jobseeker</span>} id="navbarDropdown2">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/login/" className="text-dark">Login</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/jobseeker-register/" className="text-dark">Register</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/jobseeker_control_panel.php" className="text-dark">Dashboard</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span className="text-white">Resources</span>} id="navbarDropdown3">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/article/" className="text-dark">Article</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/about-us/" className="text-dark">About Us</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/faq/" className="text-dark">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/site-map/" className="text-dark">Site Map</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/forum/" className="text-dark">Forum</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span className="text-white">Employer</span>} id="navbarDropdown4">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/recruiter-login/" className="text-dark">Sign In</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/recruiter-registation/" className="text-dark">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/recruiter_control_panel.php" className="text-dark">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/post_job.php" className="text-dark">Post Job</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="https://ejobsitesoftware.com/jobboard_demo/post_job.php" className="text-white">Post a Job</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
