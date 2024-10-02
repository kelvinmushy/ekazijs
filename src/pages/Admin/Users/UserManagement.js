import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
// Static user data
const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'Active' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', status: 'Active' },
];

const UserManagement = () => {
  return (
    <AdminLayout>
      <div className="content">
        <h2>Manage Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
