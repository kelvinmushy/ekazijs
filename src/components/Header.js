// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { BsList, BsChevronCompactDown } from "react-icons/bs";
// import './Header.css'; // Optional, for styling

const Header = () => (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="https://ejobsitesoftware.com/jobboard_demo/">
          <img
            src="https://ejobsitesoftware.com/jobboard_demo/img/logo.png"
            width="149"
            height="25"
            alt="Jobboard Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent">
          <BsList className="text-white" />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="https://ejobsitesoftware.com/jobboard_demo/">Home</Nav.Link>
            <NavDropdown title={<span>Jobs </span>} id="navbarDropdown1">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search-by-industry/">
                By Category
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search-by-location/">
                By Location
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/jobs-by-company/">
                By Company
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search-by-skill/">
                By Skill
              </NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/job-search/">
                Advance Search
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span>Jobseeker</span>} id="navbarDropdown2">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/login/">Login</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/jobseeker-register/">Register</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/jobseeker_control_panel.php">Dashboard</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span>Resources</span>} id="navbarDropdown3">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/article/">Article</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/about-us/">About Us</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/faq/">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/site-map/">Site Map</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/forum/">Forum</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span>Employer</span>} id="navbarDropdown4">
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/recruiter-login/">Sign In</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/recruiter-registation/">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/recruiter_control_panel.php">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="https://ejobsitesoftware.com/jobboard_demo/post_job.php">Post Job</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="https://ejobsitesoftware.com/jobboard_demo/post_job.php">Post a Job</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);

export default Header;
