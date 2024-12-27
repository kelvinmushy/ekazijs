import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Table, Card, Row, Col } from 'react-bootstrap';
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
import { UniversalDataContext } from "../../../context/UniversalDataContext";
import CreatableSelect from "react-select/creatable";

// Define the API base URL
const API_BASE_URL = "http://localhost:4000/api/applicant";  // Adjust this URL as per your server configuration

const ProfessionalQualifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [savedQualifications, setSavedQualifications] = useState([]); // Default as an empty array
  const applicantId = localStorage.getItem("applicantId");
  const [formData, setFormData] = useState({
    applicant_id: applicantId, // Applicant ID is directly taken from localStorage
    country_id: '',
    institution_id: '',
    course_id: '',
    attachment: '', // Updated from 'certificate' to 'attachment'
    started: '', // New field for 'started'
    ended: '',   // New field for 'ended'
    updator_id: '', // This would likely be the ID of the user updating the qualification
    creator_id: '', // This is the ID of the creator
  });

  const { institutions: availableInstitutions, courses: availableCourses, countries } = useContext(UniversalDataContext);

  // Fetch professional qualifications from the API when the component mounts
  const fetchQualifications = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/professional-qualifications/${applicantId}`);
      if (!response.ok) throw new Error("Failed to fetch work experiences");
      const data = await response.json();
    
      setSavedQualifications(data);
      console.log(data);
      console.log("Saved qualification",savedQualifications);
      
    } catch (error) {
      console.error("Error fetching work experiences:", error);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, [applicantId]);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change (for attachment upload)
  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  // Handle the creation of new institution or course
  const handleCreatableChange = (name, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: newValue ? newValue.value : '', // Set only the value (id) of the selected option
    }));
  };

  // Handle submission of new professional qualification
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("applicant_id", formData.applicant_id); // Ensure applicantId is set
    formDataToSubmit.append("country_id", formData.country_id || null); // Handle optional fields with null if empty
    formDataToSubmit.append("institution_id", formData.institution_id || null);
    formDataToSubmit.append("course_id", formData.course_id || null);
    formDataToSubmit.append("attachment", formData.attachment || null); // Optional, handle as null if no file selected
    formDataToSubmit.append("started", formData.started || null); // New field for 'started'
    formDataToSubmit.append("ended", formData.ended || null);   // New field for 'ended'
    formDataToSubmit.append("updator_id", formData.updator_id || null); // Optional 'updator_id'
    formDataToSubmit.append("creator_id", formData.creator_id || null); // Optional 'creator_id'

    try {
      const response = await fetch(`${API_BASE_URL}/professional-qualifications/${applicantId}`, {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error('Error saving professional qualification');
      }

      const newQualification = await response.json();
      setSavedQualifications([...savedQualifications, newQualification]);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving professional qualification:", error);
    }
  };

  // Handle delete of a professional qualification
  const handleDelete = async (qualificationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/professional-qualifications/${qualificationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting qualification');
      }

      setSavedQualifications(savedQualifications.filter(qualification => qualification.id !== qualificationId));
    } catch (error) {
      console.error("Error deleting qualification:", error);
    }
  };

  return (
    <ApplicantLayout>
      <Card>
        <div className="d-flex justify-content-end m-4">
          <Button variant="primary" onClick={handleModalShow}>
            Add Professional Qualification
          </Button>
        </div>
        
        <Card.Title className="text-center">Professional Qualifications</Card.Title>
        <Card.Body>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Country</th>
                <th>Institution</th>
                <th>Course</th>
                <th>Attachment</th>
                <th>Started</th>
                <th>Ended</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedQualifications.length > 0 ? (
                savedQualifications.map((qualification, index) => (
                  <tr key={index}>
                    <td>{qualification.country}</td>
                    <td>{qualification.institution}</td>
                    <td>{qualification.course}</td>
                    <td>{qualification.attachment || "No Attachment"}</td> {/* Display a default text if no attachment */}
                    <td>{new Date(qualification.started).toLocaleDateString()}</td> {/* Format date */}
                    <td>{new Date(qualification.ended).toLocaleDateString()}</td> {/* Format date */}
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(qualification.id)}>
                        Edit
                      </Button>{" "}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(qualification.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No qualifications added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal for Adding Professional Qualification */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Professional Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="institution">
                  <Form.Label>Institution</Form.Label>
                  <CreatableSelect
                    isClearable
                    onChange={(selectedOption) => handleCreatableChange('institution_id', selectedOption)}
                    options={availableInstitutions.map(inst => ({ label: inst.name, value: inst.id }))} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="course">
                  <Form.Label>Course</Form.Label>
                  <CreatableSelect
                    isClearable
                    onChange={(selectedOption) => handleCreatableChange('course_id', selectedOption)}
                    options={availableCourses.map(course => ({ label: course.name, value: course.id }))} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="started">
                  <Form.Label>Started</Form.Label>
                  <Form.Control
                    type="date"
                    name="started"
                    value={formData.started}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ended">
                  <Form.Label>Ended</Form.Label>
                  <Form.Control
                    type="date"
                    name="ended"
                    value={formData.ended}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="attachment">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleFileChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </ApplicantLayout>
  );
};

export default ProfessionalQualifications;
