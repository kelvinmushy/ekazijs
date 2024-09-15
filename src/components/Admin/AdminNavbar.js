import React from 'react';

const AdminNavbar = () => {
  return (
    <header className="admin-navbar">
      <h1>Job Portal Admin</h1>
      <button onClick={() => {/* handle logout */}}>Logout</button>
    </header>
  );
};

export default AdminNavbar;
