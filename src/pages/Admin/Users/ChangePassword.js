import React from 'react';
import { Container } from 'react-bootstrap';
import PasswordChangeForm from '../../../components/Auth/ChangePassword';
import AdminLayout from '../../../layouts/AdminLayout';

const ChangePassword = () => {
  const handlePasswordChange = async (currentPassword, newPassword) => {
    const response = await fetch('http://localhost:4000/api/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };

  return (
    <AdminLayout>
      <Container>
      
        <PasswordChangeForm onSubmit={handlePasswordChange} />
      </Container>
    </AdminLayout>
  );
};

export default ChangePassword;
