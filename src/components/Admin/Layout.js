import React from 'react';
import AdminSidebar from './AdminSidebar';
import './../../../src/styles/Layout.css'; // Optional: For specific layout styles
import {Row,Col} from 'react-bootstrap'
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
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
    
    </div>
  );
};

export default Layout;
