import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Table, Card, Row, Col } from 'react-bootstrap';
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
import { UniversalDataContext } from "../../../context/UniversalDataContext";

// Define the API base URL
const API_BASE_URL = "http://localhost:4000/api/applicant";

const AcademicQualification = () => {
  const [showModal, setShowModal] = useState(false);
  const [savedQualifications, setSavedQualifications] = useState([]);
  const applicantId = localStorage.getItem("applicantId");
  
  
  const [formData, setFormData] = useState({
    id: null,
    applicant_id: applicantId,
    education_level_id: '',
    category_id: '',
    programme_id: '',
    institution_id: '',
    country_id: '',
    attachment: null,
    date_from: '',
    date_to: '',
  });

  // Accessing universal data from context
  const {
    educationLevels,
    categories,
    programmes,
    institutions,
    countries,
  } = useContext(UniversalDataContext);

  const fetchQualifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/educational-qualifications/${applicantId}`);
      if (!response.ok) throw new Error("Failed to fetch qualifications");
      const data = await response.json();
      setSavedQualifications(data);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, [applicantId]);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      id: null,
      applicant_id: applicantId,
      education_level_id: '',
      category_id: '',
      programme_id: '',
      institution_id: '',
      country_id: '',
      attachment: null,
      date_from: '',
      date_to: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("applicant_id", formData.applicant_id);
    formDataToSubmit.append("education_level_id", formData.education_level_id);
    formDataToSubmit.append("category_id", formData.category_id);
    formDataToSubmit.append("programme_id", formData.programme_id);
    formDataToSubmit.append("institution_id", formData.institution_id);
    formDataToSubmit.append("country_id", formData.country_id);
    formDataToSubmit.append("date_from", formData.date_from);
    formDataToSubmit.append("date_to", formData.date_to);
    
    if (formData.attachment) { 
      formDataToSubmit.append("attachment", formData.attachment); 
    }

    try {
      let response;
      if (formData.id) {
        response = await fetch(`${API_BASE_URL}/educational-qualifications/${formData.id}`, {
          method: 'PUT',
          body: formDataToSubmit,
        });
      } else {
        response = await fetch(`${API_BASE_URL}/educational-qualifications/${applicantId}`, {
          method: 'POST',
          body: formDataToSubmit,
        });
      }

      if (!response.ok) {
        throw new Error('Error saving academic qualification');
      }

      const updatedQualification = await response.json();
      if (formData.id) {
        setSavedQualifications(savedQualifications.map(q => 
          q.id === formData.id ? updatedQualification : q
        ));
      } else {
        setSavedQualifications([...savedQualifications, updatedQualification]);
      }

      setShowModal(false);
      fetchQualifications();
    } catch (error) {
      console.error("Error saving academic qualification:", error);
    }
  };

  const handleDelete = async (qualificationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/educational-qualifications/${qualificationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting qualification');
      }

      setSavedQualifications(savedQualifications.filter(qualification => qualification.id !== qualificationId));
      fetchQualifications();
    } catch (error) {
      console.error("Error deleting qualification:", error);
    }
  };

  const formatToMMDDYY = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (qualificationId) => {
    const qualificationToEdit = savedQualifications.find(q => q.id === qualificationId);
    
    if (qualificationToEdit) {
      // setFormData({
      //   id: qualificationToEdit.id,
      //   applicant_id: applicantId,
      //   education_level_id: qualificationToEdit.education_level_id,
      //   category_id: qualificationToEdit.category_id,
      //   programme_id: qualificationToEdit.programme_id,
      //   institution_id: qualificationToEdit.institution_id,
      //   country_id: qualificationToEdit.country_id,
      //   attachment: qualificationToEdit.attachment || null,
      //   date_from: qualificationToEdit.date_from.split('T')[0], 
      //   date_to: qualificationToEdit.date_to.split('T')[0],      
      // });
      setFormData({
        id: qualificationToEdit.id,
        applicant_id: applicantId,
        education_level_id: qualificationToEdit.education_level_id,
        category_id: qualificationToEdit.category_id,
        programme_id: qualificationToEdit.programme_id,
        institution_id: qualificationToEdit.institution_id,
        country_id: qualificationToEdit.country_id,
        attachment: qualificationToEdit.attachment || null,
        date_from: formatToMMDDYY(qualificationToEdit.started),
        date_to: formatToMMDDYY(qualificationToEdit.ended),
      });
      
      setShowModal(true);
    }
  };

  return (
    <ApplicantLayout>
      <Card>
        <div className="d-flex justify-content-end m-4">
          <Button variant="primary" onClick={handleModalShow}>
            Add Academic Qualification
          </Button>
        </div>
        
        <Card.Title className="text-center">Academic Qualifications</Card.Title>
        <Card.Body>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Level</th>
                <th>Category</th>
                <th>Institution</th>
                <th>Country</th>
                <th>Date From</th>
                <th>Date To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedQualifications.length > 0 ? (
                savedQualifications.map((qualification, index) => (
                  <tr key={index}>
                    <td>{qualification.education_level}</td>
                    <td>{qualification.programme}</td>
                    <td>{qualification.institution}</td>
                    <td>{qualification.country}</td>
                    <td>{new Date(qualification.started).toLocaleDateString()}</td>
                    <td>{new Date(qualification.ended).toLocaleDateString()}</td>
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

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {formData.id ? "Edit Academic Qualification" : "Add Academic Qualification"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="education_level_id">
                  <Form.Label className="fw-semibold">Education Level</Form.Label>
                  <Form.Select
                    name="education_level_id"
                    value={formData.education_level_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Education Level</option>
                    {educationLevels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="category_id">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="programme_id">
                  <Form.Label className="fw-semibold">Programme</Form.Label>
                  <Form.Select
                    name="programme_id"
                    value={formData.programme_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Programme</option>
                    {programmes.map(programme => (
                      <option key={programme.id} value={programme.id}>{programme.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="institution_id">
                  <Form.Label className="fw-semibold">Institution</Form.Label>
                  <Form.Select
                    name="institution_id"
                    value={formData.institution_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Institution</option>
                    {institutions.map(institution => (
                      <option key={institution.id} value={institution.id}>{institution.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="country_id">
                  <Form.Label className="fw-semibold">Country</Form.Label>
                  <Form.Select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="attachment">
                  <Form.Label className="fw-semibold">attachment</Form.Label>
                  <Form.Control
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="date_from">
                  <Form.Label className="fw-semibold">Date From</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_from"
                    value={formData.date_from}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="date_to">
                  <Form.Label className="fw-semibold">Date To</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_to"
                    value={formData.date_to}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              {formData.id ? "Update Qualification" : "Save Qualification"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </ApplicantLayout>
  );
};

export default AcademicQualification;
