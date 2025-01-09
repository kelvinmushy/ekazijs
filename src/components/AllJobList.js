import React from 'react';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';

const AllJobList = ({ jobs, onJobSelect }) => {
  return (
   
        <div>

      
            <div className="mb-2">
              <Button variant="primary" className="me-3" href="/login">
                Registered User
              </Button>
              <Button variant="outline-primary" href="/jobseeker_registration_step1">
                New User
              </Button>
            </div>
            <div style={{ color: '#2f7b15', fontSize: '0.875rem' }}>
              {jobs.length} Jobs Found.
            </div>

            <ListGroup>
              {jobs.map((job) => (
                <ListGroup.Item key={job.id} action onClick={() => onJobSelect(job)}>
                  <div className="d-flex align-items-start py-3">
                    <div className="me-3">
                      <Image src={job.image} rounded style={{ width: '50px', height: '50px' }} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="m-0">
                        <a href={job.url}>{job.title}</a>
                      </h6>
                      <div>{job.company}</div>
                      <div>{job.location}</div>
                      <div className="mt-1">{job.posted}</div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
         
            <div className="pagination">
              {/* Pagination logic can be implemented here */}
            </div>
        </div>
    
  );
};

export default AllJobList;
