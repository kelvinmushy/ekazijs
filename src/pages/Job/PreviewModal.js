import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PreviewModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Job Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row align-items-center mb-4">
                    <div className="col-md-4 mb-2">
                        <a href="#" title="View company profile">
                            <img 
                                src="https://via.placeholder.com/150" 
                                alt="Company Logo" 
                                className="img-fluid rounded-circle border border-primary" 
                                style={{ width: '150px', height: '150px' }}
                            />
                        </a>
                    </div>
                    <div className="col-md-8">
                        <h1 className="text-dark">Job Title Placeholder</h1>
                        <div className="mt-2 mb-3 text-muted">
                            <span>
                                <a className="text-primary" href="#" title="View company profile">Company Name Placeholder</a>
                                <span className="mx-2">•</span>
                                <span>Location Placeholder</span>
                            </span>
                        </div>
                        <div className="row mb-3">
                            <div className="col-auto me-4">
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-briefcase me-2"></i>
                                    <span>Experience Level Placeholder</span>
                                </div>
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-cash me-2"></i>
                                    <span>Salary Placeholder</span>
                                </div>
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-calendar2-check me-2"></i>
                                    <span>Posted: Date Placeholder</span>
                                </div>
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-calendar-x me-2"></i>
                                    <span>Expires: Expiry Date Placeholder</span>
                                </div>
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-eye me-2"></i>
                                    <span>Views: Number of Views Placeholder</span>
                                </div>
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-book me-2"></i>
                                    <span>Education Level Placeholder</span>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-list-check me-2"></i>
                                    <span>Category Placeholder</span>
                                </div>
                                <div className="d-flex align-items-center mb-1">
                                    <i className="bi bi-gear me-2"></i>
                                    <span>Job Type Placeholder</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <Button variant="primary" className="me-2" style={{ width: '200px' }}>Login to apply</Button>
                            <Button variant="outline-secondary" style={{ width: '200px' }}>Register and apply</Button>
                        </div>
                    </div>
                </div>

                <hr />
                <h3 className="pt-2 pb-2" style={{ fontSize: '1.2rem' }}>Job Summary</h3>
                <div className="card-text">Summary Placeholder</div>
                <h3 className="pt-3 pb-2" style={{ fontSize: '1.2rem' }}>Job Description</h3>
                <div className="card-text">
                    <p>Description Placeholder</p>
                </div>
                <h3 className="pt-3 pb-2" style={{ fontSize: '1.2rem' }}>Keyskills</h3>
                <div className="skill-tag">
                    <span className="badge bg-secondary me-1">Skill 1</span>
                    <span className="badge bg-secondary me-1">Skill 2</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviewModal;
