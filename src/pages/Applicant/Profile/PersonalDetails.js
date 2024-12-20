import React, { useState, useEffect } from "react";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

// Constant data (this could be fetched from an API or provided as props)
const defaultData = {
  firstName: "John",
  lastName: "Doe",
  address: "1234 Main St",
  country: "USA",
  city: "New York",
  contactNo: "123-456-7890",
  contactNo2: "987-654-3210",
  maritalStatus: "Single", // Added marital status
  gender: "Male", // Added gender
  dateOfBirth: "1990-01-01", // Added date of birth
};

const countries = [
  { code: "USA", name: "United States" },
  { code: "CAN", name: "Canada" },
  { code: "MEX", name: "Mexico" },
];

const cities = ["New York", "Los Angeles", "Chicago", "Toronto", "Vancouver"];

const PersonalDetails = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    contactNo: "",
    contactNo2: "",
    maritalStatus: "",
    gender: "",
    dateOfBirth: "",
  });

  // Load default data if it exists
  useEffect(() => {
    setFormData(defaultData);
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle country selection change
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      city: "", // Reset city when country changes (optional)
    });
  };

  // Handle form submission (e.g., Update data action)
  const handleUpdate = () => {
    console.log("Updated data: ", formData);
    // You can make an API call or update the state here
    alert("Your data has been updated!");
  };

  return (
    <ApplicantLayout>
      <Card className="mx-auto" style={{ maxWidth: "800px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Personal Details</Card.Title>
          
          {/* Personal Details Section */}
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
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
                  value={formData.lastName}
                  placeholder="Enter your last name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group controlId="formMaritalStatus">
                <Form.Label>Marital Status</Form.Label>
                <Form.Control
                  as="select"
                  name="maritalStatus"
                  onChange={handleChange}
                  value={formData.maritalStatus}
                  required
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Date of Birth - Not centered */}
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formDateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  value={formData.dateOfBirth}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Location Section */}
          <h4 className="text-center mt-4">Location</h4>
          <Row className="justify-content-center">
            <Col xs={12} md={4}>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  name="country"
                  onChange={handleCountryChange}
                  value={formData.country}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  required
                >
                  <option value="">Select City</option>
                  {cities
                    .filter((city) => city === formData.city || formData.country) // Adjust filter as per logic
                    .map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  placeholder="Enter your address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Details Section */}
          <h4 className="text-center mt-4">Contact Details</h4>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Form.Group controlId="formContactNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="contactNo"
                  onChange={handleChange}
                  value={formData.contactNo}
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formContactNo2">
                <Form.Label>Second Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="contactNo2"
                  onChange={handleChange}
                  value={formData.contactNo2}
                  placeholder="Enter second phone number (optional)"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Update Button with padding */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={handleUpdate}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Update Data
            </Button>
          </div>
        </Card.Body>
      </Card>
    </ApplicantLayout>
  );
};

export default PersonalDetails;
