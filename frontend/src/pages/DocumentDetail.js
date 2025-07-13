import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import DocumentService from '../services/DocumentService';
import AuthService from '../services/AuthService';

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = AuthService.getCurrentUser();
  const isModerator = currentUser?.roles?.includes('ROLE_MODERATOR');
  const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = () => {
    DocumentService.getDocumentById(id)
      .then((response) => {
        setDocument(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(message);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      DocumentService.deleteDocument(id)
        .then(() => {
          navigate('/documents');
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setError(message);
        });
    }
  };

  const handleVerify = () => {
    DocumentService.verifyDocument(id)
      .then((response) => {
        setDocument(response.data);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(message);
      });
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center">
          <p>Loading document details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/documents')}>
          Back to Documents
        </Button>
      </Container>
    );
  }

  if (!document) {
    return (
      <Container>
        <Alert variant="warning">Document not found</Alert>
        <Button variant="primary" onClick={() => navigate('/documents')}>
          Back to Documents
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-4">
        <Button variant="primary" onClick={() => navigate('/documents')}>
          Back to Documents
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          {document.name}
          <Badge bg={document.verified ? 'success' : 'warning'}>
            {document.verified ? 'Verified' : 'Pending Verification'}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Type:</strong> {document.type}</p>
              <p><strong>Description:</strong> {document.description}</p>
              <p><strong>Created:</strong> {new Date(document.createdAt).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {new Date(document.updatedAt).toLocaleString()}</p>
            </Col>
            <Col md={6}>
              {document.content && (
                <div>
                  <h5>Document Content:</h5>
                  <div className="p-3 bg-light rounded">
                    <pre className="mb-0">{document.content}</pre>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <Link to={`/documents/edit/${document.id}`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            {(isModerator || isAdmin) && !document.verified && (
              <Button variant="success" onClick={handleVerify}>
                Verify
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default DocumentDetail;