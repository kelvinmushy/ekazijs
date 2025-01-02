import React from 'react';// Optional: For specific layout styles
import ApplicantSidebar from './ApplicantSidebar';
import { Container,Row,Col } from 'react-bootstrap';
import Header from '../../Header';
const ApplicantLayout = ({ children ,logo}) => {
  return (
    <div>
    <Header />

  <Container style={{marginTop:'5rem',marginBottom: "2rem"}}> {/* Adjust margin-top as needed */}
      <Row>
        <Col md={3}>
          <ApplicantSidebar  logo={logo} />
        </Col>
        <Col md={9}>
          <main className="main-content">
            {children}
          </main>
        </Col>
      </Row>
    </Container>
  </div>
      
  );
};

export default ApplicantLayout;
