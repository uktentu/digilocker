import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import axios from 'axios';

const ModeratorDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // Check if user is logged in and has moderator role
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!currentUser.roles.includes('ROLE_MODERATOR')) {
      navigate('/');
      return;
    }

    // Fetch all documents that need verification
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents/unverified', {
          headers: {
            ...AuthService.getAuthHeader()
          }
        });
        setDocuments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch documents. ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [currentUser, navigate]);

  const handleVerify = async (documentId) => {
    try {
      await axios.put(`/api/documents/${documentId}/verify`, {}, {
        headers: {
          ...AuthService.getAuthHeader()
        }
      });
      
      // Update the documents list
      setDocuments(documents.filter(doc => doc.id !== documentId));
    } catch (err) {
      setError('Failed to verify document. ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async (documentId) => {
    try {
      await axios.put(`/api/documents/${documentId}/reject`, {}, {
        headers: {
          ...AuthService.getAuthHeader()
        }
      });
      
      // Update the documents list
      setDocuments(documents.filter(doc => doc.id !== documentId));
    } catch (err) {
      setError('Failed to reject document. ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Moderator Dashboard</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card>
        <Card.Header as="h5">Documents Pending Verification</Card.Header>
        <Card.Body>
          {loading ? (
            <p>Loading documents...</p>
          ) : documents.length === 0 ? (
            <Alert variant="info">No documents pending verification.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.id}</td>
                    <td>{doc.title}</td>
                    <td>{doc.documentType}</td>
                    <td>{doc.user.username}</td>
                    <td>{new Date(doc.uploadDate).toLocaleDateString()}</td>
                    <td>
                      <Badge bg={doc.verified ? "success" : "warning"}>
                        {doc.verified ? "Verified" : "Pending"}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => navigate(`/documents/${doc.id}`)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleVerify(doc.id)}
                      >
                        Verify
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleReject(doc.id)}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ModeratorDashboard;