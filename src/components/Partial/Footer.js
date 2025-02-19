import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaRss } from 'react-icons/fa';

const Footer = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Handle opening the modal with specific content
  const handleModalOpen = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Handle closing the modal
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="container-fluid py-3" style={{ backgroundColor: '#276795', color: 'white' }}>
      <div className="container text-start">
        <div className="py-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div className="col">
            <img
              src="https://ejobsitesoftware.com/jobboard_demo/img/logo.png"
              width="149"
              height="25"
              alt="Logo"
              className="footer-logo"
            />
            <p className="copyright">
              © 2024 <Link to="/" style={{ color: 'white', textDecoration: 'none' }}> JOBBOARD DEMO </Link>
            </p>

            <ul className="list-unstyled d-flex gap-2">
              <li>
                <a href="https://www.facebook.com/ejobsitesoftware/" className="text-white" title="Facebook">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/ejobsitesoftware/" className="text-white" title="LinkedIn">
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ejobsitesoftware/" className="text-white" title="Twitter">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/industry_rss.php" className="text-white" title="RSS">
                  <FaRss />
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <p><strong>JOB SEEKER</strong></p>
            <ul className="list-unstyled">
              <li><Link to="/register" className="text-white">Sign up</Link></li>
              <li><Link to="/job-search" className="text-white">Search jobs</Link></li>
              <li><Link to="/login" className="text-white">Sign in</Link></li>
            </ul>
          </div>

          <div className="col">
            <p><strong>EMPLOYER</strong></p>
            <ul className="list-unstyled">
              <li><Link to="/post-job" className="text-white">Post a job</Link></li>
              <li><Link to="/login" className="text-white">Sign in</Link></li>
              <li><Link to="/register" className="text-white">Sign up</Link></li>
            </ul>
          </div>

          <div className="col">
            <p><strong>INFORMATION</strong></p>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-white"
                  onClick={() => handleModalOpen('About Us Content')} // Open About Us Modal
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white"
                  onClick={() => handleModalOpen('Contact Us Content')} // Open Contact Us Modal
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for About Us and Contact */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent === 'About Us Content' ? 'About Us' : 'Contact Us'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content based on the modal opened */}
          {modalContent === 'About Us Content' ? (
            <div>
              <h5>About Us</h5>
              <p>We are a leading job board platform helping job seekers and employers find the best match for their needs.</p>
            </div>
          ) : (
            <div>
              <h5>Contact Us</h5>
              <p>For inquiries, please email us at support@jobboarddemo.com</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Footer;
