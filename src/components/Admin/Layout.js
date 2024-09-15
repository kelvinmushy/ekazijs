import React from 'react';
import AdminSidebar from './AdminSidebar';
import './../../../src/styles/Layout.css'; // Optional: For specific layout styles

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <AdminSidebar/>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
