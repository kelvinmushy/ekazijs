import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Check if the user is authenticated based on token

  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from the query string (default to / if not present)
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    // If user is already authenticated, redirect them to their dashboard
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      
      const getFinalRedirectPath = (redirectPath, userType) => {
        if (redirectPath && redirectPath !== "/") {
          return redirectPath;
        }
        switch (userType) {
          case "employer":
            return "/employer/dashboard";
          case "applicant":
            return "/applicant/dashboard";
          case "admin":
            return "/admin/dashboard";
          default:
            return "/";
        }
      };

      const finalRedirectPath = getFinalRedirectPath(redirectPath, decodedToken.userType);
      navigate(finalRedirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading state

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

        console.log(userData);
        const { token } = userData;

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Decode JWT token to get user info
        const decodedToken = jwtDecode(token);

        // Store user-related data in localStorage
        localStorage.setItem("userType", decodedToken.userType);
        localStorage.setItem("userId", decodedToken.id);
        localStorage.setItem("applicantId", decodedToken.applicantId || null);
        localStorage.setItem("employerId", decodedToken.employerId || null);
        localStorage.setItem("applicantFirstname", decodedToken.applicantFirstname || null);
        localStorage.setItem("applicantLastname", decodedToken.applicantLastname || null);
        
        // Immediately update authentication state to reflect logged-in status
        setIsAuthenticated(true);

        // Determine final redirect path
        const getFinalRedirectPath = (redirectPath, userType) => {
          if (redirectPath && redirectPath !== "/") {
            return redirectPath;
          }
          switch (userType) {
            case "employer":
              return "/employer/dashboard";
            case "applicant":
              return "/applicant/dashboard";
            case "admin":
              return "/admin/dashboard";
            default:
              return "/";
          }
        };

        // Redirect to the appropriate path after successful login
        const finalRedirectPath = getFinalRedirectPath(redirectPath, decodedToken.userType);
        navigate(finalRedirectPath, { replace: true });
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    } finally {
      setIsLoading(false); // Reset loading state after attempt
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

            <Button variant="primary" type="submit" className="mt-4 w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  {"  "}Logging in...
                </>
              ) : (
                "Login"
              )}
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
