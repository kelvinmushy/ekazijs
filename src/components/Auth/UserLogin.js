import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from the query string (default to dashboard if not present)
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("token", userData.token);

        const decodedToken = jwtDecode(userData.token);
        const userId = decodedToken.id;
        const employerId = decodedToken.employerId;
        const applicantId = decodedToken.applicantId;
        const employerName = decodedToken.employerName;
        const applicantFirstname = decodedToken.applicantFirstname;
        const applicantLastname = decodedToken.applicantLastname;

        localStorage.setItem("userId", userId);
        localStorage.setItem("employerId", employerId);
        localStorage.setItem("applicantId", applicantId);
        localStorage.setItem("applicantFirstname", applicantFirstname);
        localStorage.setItem("applicantLastname", applicantLastname);
        localStorage.setItem("employerName", employerName);

        // Redirect to the stored redirect path or user dashboard
        if (userData.user.userType === "employer") {
          navigate(redirectPath === "/" ? "/employer/dashboard" : redirectPath);
        } else if (userData.user.userType === "admin") {
          navigate(redirectPath === "/" ? "/admin/dashboard" : redirectPath);
        } else {
          navigate(redirectPath === "/" ? "/applicant/dashboard" : redirectPath);
        }
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ width: "400px" }}>
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
