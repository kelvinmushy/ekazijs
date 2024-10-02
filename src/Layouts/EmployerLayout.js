// EmployerLayout.js
import React from 'react';
import EmployerSidebar from '../components/Employer/Partial/EmployerSidebar';
// import EmployerHeader from '../components/Employer/Layout/EmployerHeader';

const EmployerLayout = ({ children }) => {
  return (
    <div className="employer-layout">
     
      <div className="employer-body">
        <EmployerSidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default EmployerLayout;
