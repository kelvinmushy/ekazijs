import React, { useState, useEffect, useContext } from "react";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { UniversalDataContext } from "../../../context/UniversalDataContext"; // Import context

const API_URL = "http://localhost:4000/api/applicant/43";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    contactNo: "",
    contactNo1: "",
    maritalStatus: "",
    gender: "",
    dateOfBirth: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    contactNo: "",
    maritalStatus: "",
    gender: "",
    dateOfBirth: "",
  });

  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    countries,
    states,
    maritalStatus,
    genders,
  } = useContext(UniversalDataContext);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setFormData({
          firstName: data[0].first_name || "",
          lastName: data[0].last_name || "",
          address: data[0].address || "",
          country: data[0].country_id || "",
          city: data[0].region_id || "",
          contactNo: data[0].phone_number || "",
          contactNo1: data[1]?.phone_number || "",
          maritalStatus: data[0].marital_status || "",
          gender: data[0].gender || "",
          dateOfBirth: data[0].dob || "",
        });
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicantData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({
      ...formData,
      country: selectedCountry,
      city: "",
    });
  };

  // Validate form fields
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    let missingFields = [];

    if (!formData.firstName) {
      errors.firstName = "First Name is required.";
      missingFields.push("First Name");
      isValid = false;
    }
    if (!formData.lastName) {
      errors.lastName = "Last Name is required.";
      missingFields.push("Last Name");
      isValid = false;
    }
    if (!formData.country) {
      errors.country = "Country is required.";
      missingFields.push("Country");
      isValid = false;
    }
    if (!formData.city) {
      errors.city = "City is required.";
      missingFields.push("City");
      isValid = false;
    }
    if (!formData.contactNo) {
      errors.contactNo = "Phone Number is required.";
      missingFields.push("Phone Number");
      isValid = false;
    } else if (!/^255\d{9}$/.test(formData.contactNo)) {
      errors.contactNo = "Phone Number must start with '255' and be 12 digits long.";
      missingFields.push("Phone Number");
      isValid = false;
    }
    if (!formData.maritalStatus) {
      errors.maritalStatus = "Marital Status is required.";
      missingFields.push("Marital Status");
      isValid = false;
    }
    if (!formData.gender) {
      errors.gender = "Gender is required.";
      missingFields.push("Gender");
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required.";
      missingFields.push("Date of Birth");
      isValid = false;
    }

    setFormErrors(errors);

    return { isValid, missingFields };
  };

  const handleUpdate = () => {
    setIsSubmitting(true);
    const { isValid, missingFields } = validateForm();

    if (isValid) {
      // Process form submission, make an API call, etc.
      console.log("Updated data: ", formData);
      setAlert({
        type: "success",
        message: "Your data has been updated successfully!",
      });
    } else {
      // Dynamically display the missing fields in the alert with more detailed format info
      setAlert({
        type: "danger",
        message: `Please fill in the following required fields: ${missingFields
          .map(field => {
            if (field === "Phone Number") {
              return "Phone Number (Must start with '255' and be 12 digits long)";
            }
            return field;
          })
          .join(", ")}.`,
      });
    }
    setIsSubmitting(false);
  };

  const filteredCities = states.filter(
    (state) => state.countryId === parseInt(formData.country)
  );

  return (
    <ApplicantLayout>
      <Card className="mx-auto" style={{ maxWidth: "800px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Personal Details</Card.Title>

          {/* Show alert message when submitting */}
          {alert && (
            <Alert variant={alert.type}>
              {alert.message}
            </Alert>
          )}

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
                  {maritalStatus.map((status) => (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
                  ))}
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
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.name}>
                      {gender.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Date of Birth */}
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
                    <option key={country.id} value={country.id}>
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
                  {filteredCities.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
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
                  name="contactNo1"
                  onChange={handleChange}
                  value={formData.contactNo1}
                  placeholder="Enter second phone number (optional)"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Update Button */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={handleUpdate}
              style={{ padding: "10px 20px", fontSize: "16px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Update Data"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </ApplicantLayout>
  );
};

export default PersonalDetails;
