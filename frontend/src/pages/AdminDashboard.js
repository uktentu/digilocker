import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // Check if user is logged in and has admin role
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!currentUser.roles.includes('ROLE_ADMIN')) {
      navigate('/');
      return;
    }

    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            ...AuthService.getAuthHeader()
          }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users. ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, navigate]);

  return (
    <Container>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="mb-4">
        <Card.Header as="h5">User Management</Card.Header>
        <Card.Body>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Mobile Number</th>
                  <th>Roles</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.fullName}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.roles.join(', ')}</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h5">System Statistics</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <div className="text-center">
              <h3>{users.length}</h3>
              <p>Total Users</p>
            </div>
            <div className="text-center">
              <h3>{users.filter(user => user.roles.includes('ROLE_ADMIN')).length}</h3>
              <p>Admins</p>
            </div>
            <div className="text-center">
              <h3>{users.filter(user => user.roles.includes('ROLE_MODERATOR')).length}</h3>
              <p>Moderators</p>
            </div>
            <div className="text-center">
              <h3>{users.filter(user => user.roles.includes('ROLE_USER')).length}</h3>
              <p>Regular Users</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;