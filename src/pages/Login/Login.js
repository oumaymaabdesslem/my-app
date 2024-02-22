import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, errorsApi } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    if (username === "user" && password === "password") {
      // Replace with actual authentication logic
      await login({ username });
    } else {
      alert("Invalid username or password");
    }
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  });

  // Validation function
  const validateForm = () => {
    const { email, password } = formData;
    let isValid = true;
    const errors = {
      email: '',
      password: '',
    };
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = 'Enter a valid email address';
      isValid = false;
    }

    // Validate Password
    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    // Update the state with errors
    setFormData((prevFormData) => ({
      ...prevFormData,
      errors,
    }));

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      // If the form is not valid, return early
      return;
    }

    // Prepare the data for submission
    const userData = {
      email: formData.email,
      password: formData.password,
    };

    // Call the login function from useAuth
    login(userData);
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase">
                    <img
                      src={'/logo.jpg'}
                      alt="Logo"
                      className="logo img-fluid"
                      style={{ width: '200px', height: 'auto' }}
                    />
                  </h2>
                  {errorsApi.length > 0 && <div className="alert alert-danger mb-3">
                    <ul>
                      {errorsApi?.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>}
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              email: e.target.value,
                            }))
                          }
                          isInvalid={!!formData.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formData.errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              password: e.target.value,
                            }))
                          }
                          isInvalid={!!formData.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formData.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>


                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Not have account??{" "}
                        <Link to="/register" className="text-primary fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;