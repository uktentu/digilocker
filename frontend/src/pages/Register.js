import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/documents');
    }
  }, [navigate]);

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword || !fullName || !mobileNumber) {
      setMessage('Please fill in all required fields');
      return false;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return false;
    }

    if (username.length < 3) {
      setMessage('Username must be at least 3 characters');
      return false;
    }

    if (mobileNumber.length < 10 || mobileNumber.length > 15) {
      setMessage('Mobile number must be between 10 and 15 characters');
      return false;
    }

    if (aadhaarNumber && aadhaarNumber.length !== 12) {
      setMessage('Aadhaar number must be exactly 12 characters');
      return false;
    }

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');
    setSuccessful(false);
    setLoading(true);

    if (validateForm()) {
      AuthService.register(username, email, password, mobileNumber, fullName, aadhaarNumber)
        .then(() => {
          setSuccessful(true);
          setMessage('Registration successful! You can now login.');
          setLoading(false);
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setSuccessful(false);
          setMessage(resMessage);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2 className="text-center mb-4">Register</h2>

      <Form onSubmit={handleRegister}>
        {!successful && (
          <>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAadhaarNumber">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhaar number (optional)"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </>
        )}

        {message && (
          <Alert
            variant={successful ? 'success' : 'danger'}
            className="mt-3"
          >
            {message}
          </Alert>
        )}
      </Form>

      <div className="text-center mt-3">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
