import React, { useState } from "react";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
import { Row, Col, Form, Button, Card, Table, Modal } from "react-bootstrap";

const AcademicQualification = () => {
  // State for form data and saved academic qualifications
  const [formData, setFormData] = useState({
    educationLevel: "",
    country: "Tanzania, United Republic of",
    institutionName: "",
    certificate: null,
    programmeCategory: "",
    programmeName: "",
    dateFrom: "",
    dateTo: "",
  });

  const [savedQualifications, setSavedQualifications] = useState([
    {
      level: "Degree",
      name: "Bachelor of Science in Computer Science Software Engineering",
      institution: "University of Dodoma (UDOM)",
      attachment: "N/A",
    },
    {
      level: "Advanced Level (ACSE)",
      name: "ACSE",
      institution: "MKUU SECONDARY SCHOOL",
      attachment: "N/A",
    },
    {
      level: "Ordinary Level (CSE)",
      name: "CSE",
      institution: "KALOLENI SECONDARY SCHOOL",
      attachment: "N/A",
    },
  ]);

  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      certificate: e.target.files[0],
    });
  };

  // Handle form submission (Save qualification)
  const handleSaveQualification = () => {
    const newQualification = {
      level: formData.educationLevel,
      name: formData.programmeName,
      institution: formData.institutionName,
      attachment: formData.certificate ? formData.certificate.name : "N/A",
    };
    setSavedQualifications([...savedQualifications, newQualification]);

    // Reset form after saving
    setFormData({
      educationLevel: "",
      country: "Tanzania, United Republic of",
      institutionName: "",
      certificate: null,
      programmeCategory: "",
      programmeName: "",
      dateFrom: "",
      dateTo: "",
    });

    // Close the modal after saving
    setShowModal(false);
  };

  // Handle modal open and close
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <ApplicantLayout>
    
    {/* Table for Saved Academic Qualifications */}
    <Card>
      <Card.Body>
      <div className="d-flex justify-content-end m-4">
      <Button variant="primary" onClick={handleModalShow}>
        Add New 
      </Button>
    </div>
        <Card.Title className="text-center">Academic Qualifications</Card.Title>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Level</th>
              <th>Name</th>
              <th>Institution</th>
              <th>Attachment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedQualifications.map((qualification, index) => (
              <tr key={index}>
                <td>{qualification.level}</td>
                <td>{qualification.name}</td>
                <td>{qualification.institution}</td>
                <td>{qualification.attachment}</td>
                <td>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>

    {/* Button to open Modal, aligned at the end of the table */}




      {/* Modal for adding academic qualification */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Academic Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formEducationLevel">
                  <Form.Label>Education Level</Form.Label>
                  <Form.Control
                    as="select"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">---Select---</option>
                    <option value="Degree">Degree</option>
                    <option value="Advanced Level (ACSE)">Advanced Level (ACSE)</option>
                    <option value="Ordinary Level (CSE)">Ordinary Level (CSE)</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formInstitutionName">
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    placeholder="Enter institution name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="formProgrammeCategory">
                  <Form.Label>Programme Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="programmeCategory"
                    value={formData.programmeCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">---Select---</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formProgrammeName">
                  <Form.Label>Programme Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="programmeName"
                    value={formData.programmeName}
                    onChange={handleChange}
                    placeholder="Enter programme name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="formDateFrom">
                  <Form.Label>Date From</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateFrom"
                    value={formData.dateFrom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDateTo">
                  <Form.Label>Date To</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateTo"
                    value={formData.dateTo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="formCertificate">
                  <Form.Label>Attach your certificate (max size 2MB)</Form.Label>
                  <Form.Control
                    type="file"
                    name="certificate"
                    onChange={handleFileChange}
                    accept="application/pdf,image/*"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveQualification}>
            Save Qualification
          </Button>
        </Modal.Footer>
      </Modal>
    </ApplicantLayout>
  );
};

export default AcademicQualification;
