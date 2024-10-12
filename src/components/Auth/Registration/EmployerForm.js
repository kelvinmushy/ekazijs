import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    address: '',
    city: '',
    zip: '',
    state: '',
    country: 'United States',
    telephone: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make API call to register employer
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Register as Employer</h2>
      
      {/* Personal Details Section */}
      <div className="border p-4 mb-4">
        <h4>Personal Details</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
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
            <Col md={6}>
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
        </Form>
      </div>

      {/* Company Details Section */}
      <div className="border p-4">
        <h4>Company Details</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTelephone">
                <Form.Label>Telephone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="telephone"
                  onChange={handleChange}
                  placeholder="Enter your telephone number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formAddress">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Enter your full address"
              required
            />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  onChange={handleChange}
                  placeholder="Enter your state"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formLogo">
            <Form.Label>Company Logo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Register as Employer
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EmployerForm;
