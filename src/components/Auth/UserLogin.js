import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import { jwtDecode } from "jwt-decode"; // Correct named import

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json(); // Assuming this returns user data

        // Save the token to local storage
        localStorage.setItem('token', userData.token); // Adjust according to your API response

        // Decode the token to get user ID
        const decodedToken = jwtDecode(userData.token); // Use jwtDecode
        const userId = decodedToken.id; // Adjust based on your token structure
        const employerId = decodedToken.employerId;
        const applicantId = decodedToken.applicantId;
        const employerName = decodedToken.employerName;
        

        const applicantFirstname = decodedToken.applicantFirstname;
        const applicantLastname = decodedToken.applicantLastname;

       

        localStorage.setItem('userId', userId); // Save user ID to local storage
        localStorage.setItem('employerId',employerId); // Save user ID to local storage
        localStorage.setItem('applicantId',applicantId); // Save user ID to local storage
        localStorage.setItem('applicantFirstname',applicantFirstname); // Save user ID to local storage
        localStorage.setItem('applicantLastname',applicantLastname); // Save user ID to local storage
        localStorage.setItem('employerName',employerName); // Save user ID to local storage
        
        
       // localStorage.setItem('employerId', employerId); 
        // Check user type
       
        if (userData.user.userType === 'employer') {
          //navigate('/employer/dashboard'); // Use navigate for redirection
          window.location.href = '/employer/dashboard';
        } else if (userData.user.userType === 'admin') {
          //navigate('/admin/dashboard'); // Use navigate for redirection
          window.location.href = '/admin/dashboard';
        } else {
         // navigate('/user/dashboard'); // Adjust as necessary for other user types
          window.location.href = '/applicant/dashboard';
        }
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="text-center mt-2">
            <span>Not registered yet? </span>
            <Link to="/register">Create an account</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserLogin;
