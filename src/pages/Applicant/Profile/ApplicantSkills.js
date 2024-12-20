import React, { useState } from "react";
import { Button, Modal, Form, Table, Card } from "react-bootstrap";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";

const ApplicantSkills = () => {
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([
    {
      skillName: "JavaScript",
      skillLevel: "Advanced",
      yearsOfExperience: 3,
    },
    {
      skillName: "React",
      skillLevel: "Intermediate",
      yearsOfExperience: 2,
    },
    {
      skillName: "Node.js",
      skillLevel: "Beginner",
      yearsOfExperience: 1,
    },
  ]);

  const [formData, setFormData] = useState({
    skillName: "",
    skillLevel: "",
    yearsOfExperience: "",
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

  // Handle Submit to add a new skill
  const handleSubmit = () => {
    setSkills([...skills, formData]);
    setShowModal(false); // Close modal after submit
  };

  // Handle Delete skill
  const handleDelete = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <ApplicantLayout>
    
       
          {/* Table for Saved Skills */}
          <Card className="mt-5">
          <div className="d-flex justify-content-end m-4">
            <Button variant="primary" onClick={handleModalShow}>
              Add Skill
            </Button>

          </div>
          <Card.Title className="text-center mb-4">Applicant Skills</Card.Title>
            <Card.Body>
            

              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Skill Name</th>
                    <th>Skill Level</th>
                    <th>Years of Experience</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill, index) => (
                    <tr key={index}>
                      <td>{skill.skillName}</td>
                      <td>{skill.skillLevel}</td>
                      <td>{skill.yearsOfExperience}</td>
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

          {/* Button to open Modal for adding skill */}
          
      

        {/* Modal for Add Skill */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Skill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formSkillName">
                <Form.Label>Skill Name</Form.Label>
                <Form.Control
                  type="text"
                  name="skillName"
                  onChange={handleChange}
                  value={formData.skillName}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSkillLevel">
                <Form.Label>Skill Level</Form.Label>
                <Form.Control
                  as="select"
                  name="skillLevel"
                  onChange={handleChange}
                  value={formData.skillLevel}
                  required
                >
                  <option value="">---Select---</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formYearsOfExperience">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="yearsOfExperience"
                  onChange={handleChange}
                  value={formData.yearsOfExperience}
                  required
                />
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

export default ApplicantSkills;
