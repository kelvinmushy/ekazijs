import React, { useState } from 'react';
import { Button, Modal, Form, Table, Card,Row,Col } from 'react-bootstrap';
import ApplicantLayout from "../../../Layouts/ApplicantLayout";
const ProfessionalQualifications = () => {
  const [showModal, setShowModal] = useState(false);

  // Example state for saved professional qualifications
  const [savedQualifications, setSavedQualifications] = useState([
    {
      country: 'Tanzania',
      institution: 'University of Dar es Salaam',
      courseName: 'Software Engineering',
      yearFrom: '2020',
      yearTo: '2022',
      certificate: 'certificate.pdf',
    },
    // Add more saved qualifications here
  ]);

  const [formData, setFormData] = useState({
    country: '',
    institution: '',
    courseName: '',
    yearFrom: '',
    yearTo: '',
    certificate: '',
  });

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

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, certificate: e.target.files[0] });
  };

  const handleSubmit = () => {
    // Save new professional qualification (this can be a post request or state update)
    setSavedQualifications([...savedQualifications, formData]);
    setShowModal(false); // Close modal after submit
  };

  return (
    <ApplicantLayout>
     
        
        {/* Table for Saved Professional Qualifications */}
        <Card className="">
        <div className="d-flex justify-content-end m-4 ">
          <Button variant="primary" onClick={handleModalShow}>
            Add Professional
          </Button></div>
          
        <Card.Title className="text-center">Academic Qualifications</Card.Title>
          <Card.Body>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Institution</th>
                  <th>Course</th>
                  <th>Year From</th>
                  <th>Year To</th>
                  <th>Attachment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedQualifications.map((qualification, index) => (
                  <tr key={index}>
                    <td>{qualification.country}</td>
                    <td>{qualification.institution}</td>
                    <td>{qualification.courseName}</td>
                    <td>{qualification.yearFrom}</td>
                    <td>{qualification.yearTo}</td>
                    <td>{qualification.certificate}</td>
                    <td>
                      <Button variant="danger" size="sm">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Button to open Modal */}
       
 

      {/* Modal for Add Professional Qualification */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Professional Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                onChange={handleChange}
                value={formData.country}
                required
              >
                <option value="">---Select---</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                {/* Add other countries as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formInstitution">
              <Form.Label>Institution Name</Form.Label>
              <Form.Control
                type="text"
                name="institution"
                onChange={handleChange}
                value={formData.institution}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                onChange={handleChange}
                value={formData.courseName}
                required
              />
            </Form.Group>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formYearFrom">
                  <Form.Label>Year From</Form.Label>
                  <Form.Control
                    as="select"
                    name="yearFrom"
                    onChange={handleChange}
                    value={formData.yearFrom}
                    required
                  >
                    <option value="">---Select---</option>
                    {[...Array(30)].map((_, index) => (
                      <option key={index} value={2020 + index}>
                        {2020 + index}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="formYearTo">
                  <Form.Label>Year To</Form.Label>
                  <Form.Control
                    as="select"
                    name="yearTo"
                    onChange={handleChange}
                    value={formData.yearTo}
                    required
                  >
                    <option value="">---Select---</option>
                    {[...Array(30)].map((_, index) => (
                      <option key={index} value={2020 + index}>
                        {2020 + index}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formCertificate">
              <Form.Label>Attach your certificate</Form.Label>
              <Form.Control
                type="file"
                name="certificate"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                Max file size: 2MB
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
   
    </ApplicantLayout>
   
  );
};

export default ProfessionalQualifications;
