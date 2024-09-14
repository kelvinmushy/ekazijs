import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import JobCategoryCard from './JobCategoryCard'; // Import JobCategoryCard

const JobCategoryList = ({ categories }) => {
  return (
    <Container className="mt-5">
      {/* Categories Section */}
      <Row className="mb-3 d-flex align-items-center">
        <Col>
          <h2 style={{ fontSize: '30px' }}>Jobs by Categories</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            variant="outline-primary"
            onClick={() => window.location.href = 'https://ejobsitesoftware.com/jobboard_demo/job-search-by-industry/'}
          >
            All categories <i className="bi bi-arrow-right"></i>
          </Button>
        </Col>
      </Row>

      {/* Job Categories */}
      <Row>
        {categories.map((categoryGroup, index) => (
          <Col md={4} key={index}>
            <div className="categories my-2">
              {categoryGroup.map((category, idx) => (
                <JobCategoryCard
                  key={idx}
                  name={category.name}
                  link={category.link}
                  count={category.count}
                />
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobCategoryList;
