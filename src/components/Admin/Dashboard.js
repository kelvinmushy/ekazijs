import React from 'react';
import Layout from './Layout';
const Dashboard = () => {
  return (
    <Layout>
      <div className="content">
        <h2>Dashboard</h2>
        <p>Welcome to the admin dashboard. Here you can manage jobs, users, and view system statistics.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
