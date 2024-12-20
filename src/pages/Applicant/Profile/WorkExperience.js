import React, { useState } from "react";
import { Button, Modal, Form, Table, Card, Row, Col } from "react-bootstrap";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";

const WorkExperience = () => {
  const [showModal, setShowModal] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([
    {
      institution: "EXACT MANPOWER CONSULTANT",
      position: "SOFTWARE DEVELOPER",
      from: "01/09/2021",
      to: "To Date",
    },
    {
      institution: "FREELENCER SOFTWARE DEVELOPER",
      position: "SOFTWARE DEVELOPER",
      from: "10/02/2021",
      to: "To Date",
    },
    {
      institution: "MISANA MICROFINANCE",
      position: "SOFTWARE DEVELOPER",
      from: "10/02/2020",
      to: "11/01/2021",
    },
    {
      institution: "HABARINODE",
      position: "SOFTWARE DEVELOPER",
      from: "15/08/2019",
      to: "17/06/2020",
    },
  ]);

  const [formData, setFormData] = useState({
    institution: "",
    position: "",
    from: "",
    to: "",
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

  // Handle Submit to add work experience
  const handleSubmit = () => {
    setWorkExperiences([...workExperiences, formData]);
    setShowModal(false); // Close modal after submit
  };

  // Handle Delete action
  const handleDelete = (index) => {
    const updatedExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedExperiences);
  };

  return (
    <ApplicantLayout>
    
        

          {/* Table for Saved Work Experience */}
          <Card className="">
          <div className="d-flex justify-content-end m-4">
            <Button variant="primary" onClick={handleModalShow}>
              Add Work Experience
            </Button>
          </div>
          <Card.Title className="text-center mb-4">Work Experience</Card.Title>
          
            <Card.Body>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Institution/Organization</th>
                    <th>Position</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workExperiences.map((experience, index) => (
                    <tr key={index}>
                      <td>{experience.institution}</td>
                      <td>{experience.position}</td>
                      <td>{experience.from}</td>
                      <td>{experience.to}</td>
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
         
      

        {/* Modal for Add Work Experience */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Work Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formInstitution">
                <Form.Label>Institution/Organization</Form.Label>
                <Form.Control
                  type="text"
                  name="institution"
                  onChange={handleChange}
                  value={formData.institution}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  onChange={handleChange}
                  value={formData.position}
                  required
                />
              </Form.Group>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formFrom">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="month"
                      name="from"
                      onChange={handleChange}
                      value={formData.from}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="formTo">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="month"
                      name="to"
                      onChange={handleChange}
                      value={formData.to}
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
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
     
    </ApplicantLayout>
  );
};

export default WorkExperience;
