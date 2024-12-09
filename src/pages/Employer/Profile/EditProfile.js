import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import EmployerLayout from '../../../Layouts/EmployerLayout';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  
  // State to hold the form data (including all the fields)
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    logo: '',
    phonenumber: '',
    companySize: '',
    employerEmail: '',
    aboutCompany: '',
    region: '', // Add your region/state field
    industry: '', // Add industry field
    twitter: '',
    facebook: '',
    linkedin: '',
  });

  // Fetch the current user data (to populate the form fields) - assume you have an API to get employer profile
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        try {
          const response = await fetch(`http://localhost:4000/api/employers/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // Set form data from API response
            setFormData({
              companyName: data.company_name,
              address: data.address,
              logo: data.logo,
              phonenumber: data.phonenumber,
              companySize: data.company_size || '', // Optional field, may be null
              employerEmail: data.employer_email,
              aboutCompany: data.aboutCompany,
              region: data.region_name, // Set the region name
              industry: data.industry_name, // Set the industry
              twitter: data.twitter || '',
              facebook: data.facebook || '',
              linkedin: data.linkedin || '',
            });
          }
        } catch (error) {
          console.error('Error fetching employer profile:', error);
        }
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out any fields that are empty (except for optional fields like social media)
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => {
        return value !== '' || key === 'twitter' || key === 'facebook' || key === 'linkedin'; // Keep social media fields even if empty
      })
    );

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      try {
        const response = await fetch(`http://localhost:4000/api/employers/update/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(filteredData), // Send only the non-empty fields
        });

        if (response.ok) {
          alert('Profile updated successfully!');
          navigate('/employer/dashboard');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during profile update:', error);
        alert('An error occurred while updating the profile.');
      }
    }
  };

  return (
    <EmployerLayout>
      <Container>
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">Edit Profile</h2>
            <Form onSubmit={handleSubmit}>
              {/* Company Name and Address */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter company address"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Phone Number and Company Size */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhonenumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCompanySize">
                    <Form.Label>Company Size</Form.Label>
                    <Form.Control
                      type="text"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      placeholder="Enter company size"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Employer Email and About Company */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formEmployerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="employerEmail"
                      value={formData.employerEmail}
                      onChange={handleChange}
                      placeholder="Enter employer email"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formAboutCompany">
                    <Form.Label>About the Company</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="aboutCompany"
                      value={formData.aboutCompany}
                      onChange={handleChange}
                      placeholder="Write about the company"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Region and Industry */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formRegion">
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                      as="select"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                    >
                      <option value="">Select Region</option>
                      <option value="Dodoma">Dodoma</option>
                      <option value="Dar es Salaam">Dar es Salaam</option>
                      {/* Add more regions dynamically if necessary */}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formIndustry">
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      {/* Add more industries dynamically if necessary */}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              {/* Social Media Links */}
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formTwitter">
                    <Form.Label>Twitter</Form.Label>
                    <Form.Control
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="Enter Twitter profile URL"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="formFacebook">
                    <Form.Label>Facebook</Form.Label>
                    <Form.Control
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      placeholder="Enter Facebook profile URL"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="formLinkedin">
                    <Form.Label>LinkedIn</Form.Label>
                    <Form.Control
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="Enter LinkedIn profile URL"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="mt-4 w-100">
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </EmployerLayout>
  );
};

export default EditProfile;
