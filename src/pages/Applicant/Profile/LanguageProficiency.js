import React from "react";
import ApplicantLayout from '../../../Layouts/ApplicantLayout';
import { Button, Modal, Form, Table, Card, Row, Col } from "react-bootstrap";
import { useState,useEffect } from "react";

const LanguageProficiency = () => {
  const [showModal, setShowModal] = useState(false);

  // Example state for saved language proficiencies
  const [savedLanguages, setSavedLanguages] = useState([
    {
      language: "Kiswahili",
      speak: "Very Good",
      read: "Very Good",
      write: "Very Good",
    },
    {
      language: "English",
      speak: "Very Good",
      read: "Very Good",
      write: "Very Good",
    },
    // Add more saved languages here
  ]);

  const [formData, setFormData] = useState({
    language: "",
    speak: "",
    read: "",
    write: "",
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

  // Handle Submit to add language proficiency
  const handleSubmit = () => {
    setSavedLanguages([...savedLanguages, formData]);
    setShowModal(false); // Close modal after submit
  };

  // Handle Delete action
  const handleDelete = (index) => {
    const updatedLanguages = savedLanguages.filter((_, i) => i !== index);
    setSavedLanguages(updatedLanguages);
  };

  return (
        <ApplicantLayout>
           
         
          {/* Table for Saved Language Proficiency */}
          <Card className="">
          <div className="d-flex justify-content-end m-4">
            <Button variant="primary" onClick={handleModalShow}>
              Add Language Proficiency
            </Button>
          </div>
          <Card.Title className="text-center mb-4">Language Proficiency</Card.Title>
          
            <Card.Body>

              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Speak</th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedLanguages.map((language, index) => (
                    <tr key={index}>
                      <td>{language.language}</td>
                      <td>{language.speak}</td>
                      <td>{language.read}</td>
                      <td>{language.write}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
  
          {/* Button to open Modal */}
          
        
  
        {/* Modal for Add Language Proficiency */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Language Proficiency</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLanguage">
                <Form.Label>Language Name</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  onChange={handleChange}
                  value={formData.language}
                  required
                />
              </Form.Group>
  
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group controlId="formSpeak">
                    <Form.Label>Speak</Form.Label>
                    <Form.Control
                      as="select"
                      name="speak"
                      onChange={handleChange}
                      value={formData.speak}
                      required
                    >
                      <option value="">---Select---</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
  
                <Col xs={12} md={4}>
                  <Form.Group controlId="formRead">
                    <Form.Label>Read</Form.Label>
                    <Form.Control
                      as="select"
                      name="read"
                      onChange={handleChange}
                      value={formData.read}
                      required
                    >
                      <option value="">---Select---</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
  
                <Col xs={12} md={4}>
                  <Form.Group controlId="formWrite">
                    <Form.Label>Write</Form.Label>
                    <Form.Control
                      as="select"
                      name="write"
                      onChange={handleChange}
                      value={formData.write}
                      required
                    >
                      <option value="">---Select---</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
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

export default LanguageProficiency;
