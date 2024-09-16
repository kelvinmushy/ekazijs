import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';


const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobReference: '',
    country: '',
    state: '',
    location: '',
    salary: '',
    skills: '',
    jobCategory: [],
    jobSummary: '',
    jobDescription: '',
    applyOnline: false,
    url: '',
    emailAddress: 'demo1@aynsoft.com',
    jobType: [],
    experience: 'Any experience',
    jobExpiryDate: '',
    postingDate: '',
    jobAutoRenew: 'None'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const values = Array.from(options).filter(option => option.selected).map(option => option.value);
    setFormData({
      ...formData,
      [name]: values
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <Container >
      <Row>
        
        <Col md={12}>
        <h1 className="main-heading mb-4">Post A Job</h1>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job title:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="p-2"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Country:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="p-2"
            >
              <option value="">Please select a country...</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">State:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="p-2"
            >
              <option value="">State</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Location:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-2"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Salary:</Form.Label>
          <Col sm={9}>
            <InputGroup className="mb-2">
              <InputGroup.Text>Rs</InputGroup.Text>
              <Form.Control
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="p-2"
              />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Skills:</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Separated by commas"
              required
              className="p-2"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Category:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleMultiSelectChange}
              multiple
              className="p-2"
            >
              <option value="21">Accounting/Finance/Banking</option>
              <option value="1">Administration/HR/Legal</option>
              <option value="22">Advertising/Marketing/PR</option>
              <option value="3">Arts & Design</option>
              <option value="2">Automotive</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Summary:</Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              name="jobSummary"
              value={formData.jobSummary}
              onChange={handleChange}
              rows={4}
              required
              className="p-2"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Description:</Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="p-2"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Apply Online:</Form.Label>
          <Col sm={9}>
            <Form.Check
              type="checkbox"
              name="applyOnline"
              checked={formData.applyOnline}
              onChange={handleChange}
              label="Check to apply online"
              className="mb-2"
            />
            {formData.applyOnline && (
              <Form.Control
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="Enter URL"
                className="p-2"
              />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Resumes will go:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="p-2"
            >
              <option value="demo1@aynsoft.com">demo1@aynsoft.com</option>
              <option value="bongobas+user@gmail.com">bongobas+user@gmail.com</option>
              <option value="jamesweb@gmail.com">jamesweb@gmail.com</option>
              <option value="cr@ultima.com">cr@ultima.com</option>
              <option value="manav@gmail.com">manav@gmail.com</option>
              <option value="sasunt@outlook.com">sasunt@outlook.com</option>
            </Form.Select>
            <small className="form-text text-muted mt-2">
              To add email address, Go to Manage Users in Control Panel
            </small>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Type:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="jobType"
              value={formData.jobType}
              onChange={handleMultiSelectChange}
              multiple
              className="p-2"
            >
              <option value="2">Full-time</option>
              <option value="1">Part-time</option>
              <option value="4">Internship</option>
              <option value="3">Temporary</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Experience:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="p-2"
            >
              <option value="0-12">&lt; 1 year</option>
              <option value="12-36">1 year - 3 years</option>
              <option value="36-72">3 years - 6 years</option>
              <option value="72-120">6 years - 10 years</option>
              <option value="120-120+">10 years and plus</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Expiry Date:</Form.Label>
          <Col sm={9}>
            <Row>
              <Col md={4} className="pr-0">
                <Form.Select
                  name="jobExpiryDate"
                  value={formData.jobExpiryDate}
                  onChange={handleChange}
                  className="p-2"
                >
                  <option value="">Day</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Posting Date:</Form.Label>
          <Col sm={9}>
            <Row>
              <Col md={4} className="pr-0">
                <Form.Select
                  name="postingDate"
                  value={formData.postingDate}
                  onChange={handleChange}
                  className="p-2"
                >
                  <option value="">Day</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Form.Label column sm={3} className="text-right">Job Auto Renew:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="jobAutoRenew"
              value={formData.jobAutoRenew}
              onChange={handleChange}
              className="p-2"
            >
              <option value="0">None</option>
              <option value="3">3 Days</option>
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="21">21 Days</option>
              <option value="28">28 Days</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-2">
          <Col sm={{ span: 9, offset: 3 }}>
            <Button type="submit" variant="primary" className="p-2">Preview</Button>
          </Col>
        </Form.Group>
      </Form>
        </Col>

      </Row>
     
   
    </Container>
  );
};

export default JobForm
