import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import AllJobList from '../../components/AllJobList';
import JobPreview from '../../components/JobPreview';
import Layout from '../../components/Layout';

const AllJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Yellowstone Apparel",
      company: "Americasuits",
      location: "San Fernando, CA, USA",
      posted: "9 months ago",
      image: "https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240328175827New_Project.jpg&size=120",
      details: "Use the newest styles and traditional wardrobe staples to improve your wardrobe.",
    },
    {
      id: 2,
      title: "Hanes Kids Polo",
      company: "Veetrends",
      location: "Laguna Hills, CA, USA",
      posted: "9 months ago",
      image: "https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240328085750New_Project__1_.jpg&size=120",
      details: "Discover the newest fashion trends as well as classic looks.",
    },
  ];

  return (
    <Layout>
      <Container style={{ marginTop: '70px', marginBottom: '0.7rem' }}>
        <Row className="mb-4">
          <Col md={12}>
            <Form>
              <Row className="align-items-center mb-2">
                <Col md={2}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search jobs..."
                    />
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                    />
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <Form.Select aria-label="Job Type">
                    <option value="">Job Type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Select aria-label="Skills">
                    <option value="">Select Skills</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="php">PHP</option>
                    <option value="react">React</option>
                    <option value="nodejs">Node.js</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="Salary"
                      aria-label="Salary"
                    />
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <Button variant="primary" type="submit" className="w-100">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-2">Available Jobs</h4>
                <AllJobList jobs={jobs} onJobSelect={setSelectedJob} />
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            {selectedJob ? (
              <JobPreview job={selectedJob} />
            ) : (
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <h5>Select a job to preview details</h5>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AllJobs;
