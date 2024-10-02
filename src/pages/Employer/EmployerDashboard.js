// EmployerDashboard.js
import React from 'react';
import EmployerLayout from '../../Layouts/EmployerLayout';
import JobList from '../../components/Job/JobList';

const EmployerDashboard = () => {
  return (
    <EmployerLayout>
      <h1>Employer Dashboard</h1>
      <JobList />
    </EmployerLayout>
  );
};

export default EmployerDashboard;
