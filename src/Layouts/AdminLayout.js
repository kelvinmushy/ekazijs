// AdminLayout.js
import React from 'react';
import AdminSidebar from '../components/Admin/partial/AdminSidebar';
import AdminHeader from '../components/Admin/Partial/AdminHeader';
import {Row,Col,Container} from 'react-bootstrap';

const AdminLayout = ({ children }) => {
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

export default AdminLayout;
