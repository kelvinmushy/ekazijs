import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    employerEmail: '',
    aboutCompany: '',
    address: '',
    state_id: '', // Use state_id instead of state
    phonenumber: '',
    logo: null,
    userType: 'employer', // Fixed user type
  });

  const [states, setStates] = useState([]); // To hold states based on selected country
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Define countries and their corresponding states
  const countriesWithStates = {
    'United States': ['California', 'Texas', 'Florida'], // Add more US states as needed
    'Canada': ['Ontario', 'Quebec', 'British Columbia'], // Add more Canadian provinces as needed
    // Add more countries and their respective states
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // When country changes, update the states
    if (name === 'country') {
      const selectedStates = countriesWithStates[value] || [];
      setStates(selectedStates);
      setFormData((prev) => ({ ...prev, state_id: '', country: value })); // Reset state when country changes
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formDataToSubmit = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
      state_id: formData.state_id,
      address: formData.address,
      phonenumber: formData.phonenumber,
      logo: formData.logo ? formData.logo.name : null,
      company_name: formData.companyName,
      employer_email: formData.employerEmail,
      aboutCompany: formData.aboutCompany,
    };

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (response.ok) {
        setShowModal(true); // Show the modal on success
        setFormData({ // Reset the form data
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          companyName: '',
          employerEmail: '',
          aboutCompany: '',
          address: '',
          state_id: '',
          phonenumber: '',
          logo: null,
          userType: 'employer',
        });
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally refresh the page or redirect
    window.location.href = '/'; 
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
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
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
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmployerEmail">
                <Form.Label>Employer Email</Form.Label>
                <Form.Control
                  type="email"
                  name="employerEmail"
                  value={formData.employerEmail}
                  onChange={handleChange}
                  placeholder="Enter your employer email"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTelephone">
                <Form.Label>Telephone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="Enter your telephone number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  name="country"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your country</option>
                  {Object.keys(countriesWithStates).map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state_id"
                  value={formData.state_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your state</option>
                  {states.map((state, index) => (
                    <option key={index} value={index + 1}>{state}</option> // Assuming state_id is index + 1
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formAddress">
                <Form.Label>Full Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formAboutCompany">
            <Form.Label>About the Company</Form.Label>
            <Form.Control
              as="textarea"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              placeholder="Tell us about your company"
              rows={3}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLogo">
            <Form.Label>Company Logo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Register as Employer
          </Button>
        </Form>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for registering! You will receive a confirmation email shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployerForm;