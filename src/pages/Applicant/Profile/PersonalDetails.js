import React, { useState, useEffect, useContext } from "react";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { UniversalDataContext } from "../../../context/UniversalDataContext";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const [formData, setFormData] = useState({
    applicantId: applicantId || "",
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
    about: "", // Added for the "About You" section
  });

  const [formErrors, setFormErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0); // Track character count
  
  const API_URL = "http://localhost:4000/api/applicant";
  const { countries, states, maritalStatus, genders } = useContext(UniversalDataContext);

  useEffect(() => {
    if (!applicantId) {
      setAlert({
        type: "danger",
        message: "Applicant ID is missing. Please log in again.",
      });
      setTimeout(() => navigate("/login"), 3000);
      return;
    }
    const formatToMMDDYY = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const fetchApplicantData = async () => {
      try {
        const response = await fetch(`${API_URL}/${applicantId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch applicant data.");
        }
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          applicantId,
          firstName: data[0]?.first_name || "",
          lastName: data[0]?.last_name || "",
          address: data[0]?.address || "",
          country: data[0]?.country_id || "",
          city: data[0]?.region_id || "",
          contactNo: data[0]?.phone_number || "",
          contactNo1: data[1]?.phone_number || "",
          maritalStatus: data[0]?.marital_id || "",
          gender: data[0]?.gender_id || "",
          dateOfBirth: formatToMMDDYY(data[0]?.dob || ""),
          about: data[0]?.about || "", // Retrieve "About You" data
        }));
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setAlert({
          type: "danger",
          message: "An error occurred while fetching your data. Please try again later.",
        });
      }
    };

    fetchApplicantData();
  }, [applicantId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "about") {
      setCharCount(value.length); // Update character count for "About You"
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      city: "",
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;
    let missingFields = [];

    if (!formData.applicantId) {
      setAlert({
        type: "danger",
        message: "Applicant ID is missing. Please log in again.",
      });
      setTimeout(() => navigate("/login"), 3000);
      return { isValid: false, missingFields };
    }

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
    if (!formData.about) {
      errors.about = "About You section is required.";
      missingFields.push("About You");
      isValid = false;
    } else if (formData.about.length > 500) {
      errors.about = "About You section cannot exceed 500 characters.";
      isValid = false;
    }

    setFormErrors(errors);
    return { isValid, missingFields };
  };
  const handleUpdate = async () => {
    setIsSubmitting(true);
    const { isValid, missingFields } = validateForm();

    if (isValid) {
      try {
        const response = await fetch(`${API_URL}/${applicantId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setAlert({
            type: "success",
            message: "Your data has been updated successfully!",
          });
        } else {
          setAlert({
            type: "danger",
            message: result.message || "Failed to update data.",
          });
        }
      } catch (error) {
        console.error("Error updating data:", error);
        setAlert({
          type: "danger",
          message: "An error occurred while updating your data. Please try again.",
        });
      }
    } else {
      setAlert({
        type: "danger",
        message: `Please fill in the following required fields: ${missingFields.join(", ")}.`,
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
                    <option key={status.id} value={status.id}>
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
                    <option key={gender.id} value={gender.id}>
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
                    <option key={state.id} value={state.id}>
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
        <Row>
          <Col xs={12} md={12}>
              {/* About You Section */}
              <h4 className="text-center mt-4">About You</h4>
          <Form.Group controlId="formAbout">
            <Form.Control
              as="textarea"
              rows={4}
              name="about"
              onChange={handleChange}
              value={formData.about}
              placeholder="Tell us about yourself (max 300 characters)"
              maxLength={300}
            />
            <Form.Text>{charCount} / 300 characters</Form.Text>
            {formErrors.about && <Form.Text className="text-danger">{formErrors.about}</Form.Text>}
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
