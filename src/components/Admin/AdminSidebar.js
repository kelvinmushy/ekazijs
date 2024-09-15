import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/admin/manage-jobs">Manage Jobs</NavLink></li>
        <li><NavLink to="/admin/manage-users">Manage Users</NavLink></li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
