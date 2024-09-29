import React from 'react';
import AdminSidebar from './AdminSidebar';
import './../../../src/styles/Layout.css'; // Optional: For specific layout styles
import {Container,Row,Col} from 'react-bootstrap';
import AdminHeader  from './AdminHeader';
const Layout = ({ children }) => {
  return (
    <div>
    <AdminHeader/>
    <Container style={{marginTop:"4rem", marginBottom: "2rem"}}>
    <Row>
      <Col md={3}>
      <AdminSidebar/>
      </Col>
      <Col md="9">
      <main className="main-content">
      {children}
        </main>
      </Col>
    </Row>
    </Container>
  </div>
  );
};

export default Layout;
