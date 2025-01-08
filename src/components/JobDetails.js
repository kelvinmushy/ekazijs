import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { FaBriefcase, FaCalendarCheck, FaList, FaCog, FaSave, FaUsers, FaPrint, FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams(); // Retrieve the jobId from the URL params
  const [job, setJob] = useState(null); // State to store the job data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Inline styles for the logo image
  const logoStyle = {
    maxWidth: '120px',  // Adjust the width as per requirement
    height: 'auto',     // Maintain aspect ratio
    objectFit: 'contain', // Ensure the logo fits within the container
    transition: 'opacity 0.3s', // Add smooth transition for hover effect
  };

  // Inline style for margin top of the card
  const cardStyle = {
    marginTop: '40px', // Adjust the margin-top value to your needs
  };

  // Fetch the job details when the component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/universals/job/${jobId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const data = await response.json();
        setJob(data); // Set the job data to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set the error message
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchJobDetails();
  }, [jobId]); // Dependency array to refetch the data if jobId changes

  // Show a loading message while fetching the job details
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show an error message if something goes wrong
  if (error) {
    return <div>{error}</div>;
  }

  // If no job data is available, display a message
  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="card-custom" style={cardStyle}>
            <Card.Body className="card-body-custom">
              <Row className="d-flex">
                <Col xs="auto" className="mb-2">
                  <a href="https://www.tryhirehub.com/company_profile.php">
                    <img
                      src={`http://localhost:4000${job.logo}`} // Dynamically set the logo URL
                      alt="Employer Logo"
                      className="employer-logo"
                      style={logoStyle} // Apply custom logo size style
                    />
                  </a>
                </Col>
                <Col className="flex-grow-1">
                  <h1 className="m-0" >{job.title}</h1>
                  <div className="mt-2 mb-4">
                    <span className="mr-3">
                      <a
                        className="text-blue"
                        href="https://www.tryhirehub.com/company_details.php?query_string=b3a78199b6af866a4f72867b81684f77b7baab97889e"
                        title="View company profile"
                      >
                        {job.company_name}
                      </a>
                      <span className="mx-2">•</span>
                      <span>{job.address}</span>
                    </span>
                  </div>

                  {/* Experience, Salary, Posted, Category */}
                  <Row>
                    <Col xs="auto" className="me-4">
                      <div className="mb-1">
                        <FaBriefcase className="me-2" />
                        {job.experience_id === 1 ? 'Any experience' : 'Experienced'}
                      </div>
                      <div className="mb-1">
                        {job.salary_from} - {job.salary_to} per annum
                      </div>
                      <div className="mb-1">
                        <FaCalendarCheck className="me-2" />
                        Posted: {new Date(job.posting_date).toLocaleDateString()}
                      </div>
                    </Col>
                    <Col xs="auto">
                      <div className="mb-1">
                        <FaList className="me-2" />
                        {job.category_names.join(', ')}
                      </div>
                      <div className="mb-1">
                        <FaCog className="me-2" />
                        {job.culture_names.length ? job.culture_names.join(', ') : 'No culture'}
                      </div>
                    </Col>
                  </Row>

                  {/* Apply Now Button below Experience, Salary, Posted, Category */}
                  <div className="my-4">
                    <Button
                      variant="primary"
                      onClick={() =>
                        window.open(job.url || 'https://www.adzuna.com/land/ad/5001569010', '_blank')
                      }
                    >
                      Apply Now
                    </Button>
                  </div>

                  {/* Horizontal Line to separate sections */}
                  <hr />

                  {/* Job Summary and Description */}
                  <h3 className="pt-3 pb-2" style={{ fontSize: '1.2rem'}}>
                    Job Summary
                  </h3>
                  <div className="job-summary" dangerouslySetInnerHTML={{ __html: job.summary }} />

                  <h3 className="pt-3 pb-2" style={{ fontSize: '1.2rem' }}>
                    Job Description
                  </h3>
                  <div className="job-description" dangerouslySetInnerHTML={{ __html: job.description }} />

                  {/* Keyskills */}
                  <h3 className="pt-3 pb-2" style={{ fontSize: '1.2rem' }}>
                    Keyskills
                  </h3>
                  <div className="skill-tag">{job.skill_names.join(', ') || 'Not Mentioned'}</div>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer className="card-footer-custom text-center" style={{ borderTop: '1px solid #e6e9ec' }}>
              <div className="d-inline" role="group" aria-label="Basic example">
                <Button variant="link" href={`https://www.tryhirehub.com/20890800/Virtual-Licensed-Clinical-Therapist-Apply-in-minutes-?action=save`}>
                  <FaSave />
                </Button>

                <Button variant="link" href="https://www.tryhirehub.com/tell_to_friend.php?query_string=b3a78199b6af866a4f72867b81684f77b7baab97889e">
                  <FaUsers />
                </Button>

                <Button
                  variant="link"
                  onClick={() =>
                    window.open('https://www.tryhirehub.com/20890800/Virtual-Licensed-Clinical-Therapist-Apply-in-minutes-?action=print')
                  }
                >
                  <FaPrint /> {/* Using FaPrint instead of FaPrinter */}
                </Button>
              </div>

              <div className="btn-group" role="group" aria-label="Basic example">
                <form name="search_smililar_job" action="https://www.tryhirehub.com/job-search/" method="post">
                  <input type="hidden" name="action" value="search" />
                  <input type="hidden" name="job_category[]" value="1" />
                  <Button variant="link" onClick={() => document.search_smililar_job.submit()} title="View Similar jobs of this category">
                    Similar Jobs
                  </Button>
                </form>
              </div>

              <div className="btn-group" role="group" aria-label="Basic example">
                <span className="addViewJobsToButtonGroup mx-4 text-muted">
                  <FaEye />
                </span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetails;
