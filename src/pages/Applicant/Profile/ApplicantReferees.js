import React, { useState } from "react";
import { Button, Modal, Form, Table, Card } from "react-bootstrap";
import ApplicantLayout from "../../../Layouts/ApplicantLayout";

const ApplicantReferees = () => {
  // State to handle the modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for storing referees data
  const [referees, setReferees] = useState([
    {
      name: "JANETH RUZEGAMA",
      institution: "HABARINODE",
      title: "SOFTWARE DEVELOPER SUPERVISOR",
    },
    {
      name: "CHRISTOPHER FAUSTINE",
      institution: "HABARINODE",
      title: "SOFTWARE DEVELOPER",
    },
    {
      name: "SIFAEL BETUEL",
      institution: "UDOM",
      title: "INSTRUCTOR",
    },
  ]);

  // State for form data when adding/editing a referee
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    title: "",
  });

  // Handle modal show and hide
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit (Add or Update Referee)
  const handleSubmit = () => {
    setReferees([...referees, formData]);
    setFormData({ name: "", institution: "", title: "" });
    setShowModal(false);
  };

  // Handle deleting a referee
  const handleDelete = (index) => {
    const updatedReferees = referees.filter((_, i) => i !== index);
    setReferees(updatedReferees);
  };

  return (
    <ApplicantLayout>
     
        
          {/* Table for displaying referees */}
          <Card className="">
          <div className="d-flex justify-content-end m-4">
            <Button variant="primary" onClick={handleModalShow}>
              Add Referee
            </Button>
          </div>
          <Card.Title className="text-center mb-4">Applicant Referees</Card.Title>

            <Card.Body>
        
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Institution/Organization</th>
                    <th>Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {referees.map((referee, index) => (
                    <tr key={index}>
                      <td>{referee.name}</td>
                      <td>{referee.institution}</td>
                      <td>{referee.title}</td>
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

          {/* Button to open modal for adding a new referee */}
         
        

        {/* Modal for adding a new referee */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Referee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </Form.Group>

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

              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
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

export default ApplicantReferees;
