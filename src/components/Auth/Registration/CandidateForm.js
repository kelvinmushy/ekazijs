import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    state: '',
    contactNo: '',
    mobile: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make API call to register candidate
  };

  return (
    <Container className="mb-5"> {/* Margin for footer spacing */}
      <Card className="mt-4">
        <Card.Body>
          <Card.Title className="text-center">Candidate Registration</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Account Details Section */}
            <h4>Account Details</h4>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Personal Details Section */}
            <h4 className="mt-4">Personal Details</h4>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Address Section */}
            <h4 className="mt-4">Full Address</h4>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                <Form.Group controlId="formCity">
                  <Form.Label>City/Town</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    onChange={handleChange}
                    placeholder="Enter your zip code"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    name="state"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your state</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    {/* Add more states as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Contact Details Section */}
            <h4 className="mt-4">Contact Details</h4>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formContactNo">
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactNo"
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Resume Upload Section */}
            <h4 className="mt-4">Upload Resume</h4>
            <Form.Group controlId="formResume">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type="file"
                accept=".doc,.txt,.pdf"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                Upload: doc, txt, pdf format
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Register as Candidate
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CandidateForm;
