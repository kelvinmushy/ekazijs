import React from 'react';
import { Card, Image,Row,Col, Button } from 'react-bootstrap';

const JobPreview = ({ job }) => {
  return (
    <Card>
    <Card.Body>
      <Row className="align-items-center">
        <Col xs={4}>
          <img
            src={job.image}
            alt={job.title}
            className="img-fluid rounded"
          />
        </Col>
        <Col xs={8}>
          <h4>{job.title}</h4>
          <p className="text-muted mb-1">{job.company}</p>
          <p>{job.location}</p>
        </Col>
      </Row>
      <hr />
      <p>{job.details}</p>
      <small className="text-muted">Posted: {job.posted}</small>
    </Card.Body>
  </Card>
  );
};

export default JobPreview;
