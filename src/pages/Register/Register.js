import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form, ListGroup } from 'react-bootstrap';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import useProfiles from '../../hooks/useProfiles';
import axios from 'axios';

const Register = () => {
  const { profiles, isLoading, error } = useProfiles();
  const formattedProfiles = profiles?.map((profile) => ({ value: profile, label: profile }));

  // State variables for form inputs and validation
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    selectedProfiles: [],
    password: '',
    confirmPassword: '',
    errors: {
      username: '',
      email: '',
      selectedProfiles: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [errorsApi, setErrorsApi] = useState([])

  console.log(formData.errors)

  // Validation function
  const validateForm = () => {
    const { username, email, selectedProfiles, password, confirmPassword } = formData;
    let isValid = true;
    const errors = {
      username: '',
      email: '',
      selectedProfiles: '',
      password: '',
      confirmPassword: '',
    };

    // Validate Name
    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = 'Enter a valid email address';
      isValid = false;
    }
    // Validate Profiles
    if (selectedProfiles.length === 0 || !selectedProfiles.every(profile => profile.value)) {
      errors.selectedProfiles = 'Select at least one profile';
      isValid = false;
    }

    // Validate Password

    if (!password.trim() || password.length < 8) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least  8 characters long';
      isValid = false;
    }

    // Validate Confirm Password
    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
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
      username: formData.username,
      email: formData.email,
      profiles: formData.selectedProfiles.map(profile => profile.value), // Map to get only the value of each profile
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/register', userData);
      // Handle successful response
      console.log('Registration successful:', response.data);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle validation errors
        const apiErrors = Array.isArray(error.response.data.message) ? error.response.data.message : [];
        setErrorsApi(apiErrors);

      } else {
        // Handle other errors
        console.error('Error during registration:', error);
      }
    }
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
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              username: e.target.value,
                            }))
                          }
                          isInvalid={!!formData.errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formData.errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

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


                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Profile</Form.Label>
                        <Select
                          isMulti
                          options={formattedProfiles}
                          placeholder="Select profiles"
                          value={formData.selectedProfiles}
                          onChange={(selectedOptions) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              selectedProfiles: selectedOptions,
                            }))
                          }

                        />
                        <span className="text-danger">
                          {formData.errors.selectedProfiles}
                        </span>
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

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              confirmPassword: e.target.value,
                            }))
                          }
                          isInvalid={!!formData.errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formData.errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign In
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
  )
}

export default Register
