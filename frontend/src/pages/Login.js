import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is already logged in
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/documents');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!username || !password) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    AuthService.login(username, password)
      .then(() => {
        navigate('/documents');
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  return (
    <div className="auth-form">
      <h2 className="text-center mb-4">Login</h2>

      <Form onSubmit={handleLogin}>
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

        {message && (
          <Alert variant="danger" className="mt-3">
            {message}
          </Alert>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;