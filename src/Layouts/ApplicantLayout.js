// ApplicantLayout.js
import React from 'react';
import ApplicantSidebar from '../components/Applicant/Partial/ApplicantSidebar';
import ApplicantHeader from '../components/Applicant/Partial/ApplicantHeader';
import {Row,Col,Container} from 'react-bootstrap';
import UniversalDataProvider from '../context/UniversalDataContext';
const ApplicantLayout = ({ children }) => {
  return (
    <UniversalDataProvider>
    <ApplicantHeader/>
    <Container style={{marginTop:"4rem", marginBottom: "2rem"}}>
    <Row>
      <Col md={3}>
      <ApplicantSidebar/>
      </Col>
      <Col md="9">
      <main className="main-content">
      {children}
        </main>
      </Col>
    </Row>
    </Container>
    
  </UniversalDataProvider>
  );
};

export default ApplicantLayout;
