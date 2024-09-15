import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import EmployerSidebar from '../Home/EmployerSidebar'; // Adjust the import path as necessary

const ChangePassword = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your validation logic here if needed
    // e.g., call validate_change_password function
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={3}>
          <EmployerSidebar /> {/* Sidebar component */}
        </Col>
        <Col md={9}>
          <Card className="card-custom">
            <Card.Header className="card-header-custom">
              <h1 className="main-heading">Change your password</h1>
            </Card.Header>
            <Card.Body className="card-body-custom">
              <Form name="change_password" action="https://ejobsitesoftware.com/jobboard_demo/recruiter_change_password.php" method="post" onSubmit={handleSubmit}>
                <Form.Control type="hidden" name="action" value="check" />

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Old Password :</Form.Label>
                  <Col sm={9}>
                    <Form.Control type="password" name="TR_old_password" className="required" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>New Password :</Form.Label>
                  <Col sm={9}>
                    <Form.Control type="password" name="TR_new_password" className="required" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Confirm Password :</Form.Label>
                  <Col sm={9}>
                    <Form.Control type="password" name="TR_confirm_password" className="required" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={3}></Col>
                  <Col sm={9}>
                    <Button type="submit" variant="primary">Confirm</Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
