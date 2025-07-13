import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DocumentService from '../services/DocumentService';
import AuthService from '../services/AuthService';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = AuthService.getCurrentUser();
  const isModerator = currentUser?.roles?.includes('ROLE_MODERATOR');
  const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    setLoading(true);
    DocumentService.getAllDocuments()
      .then((response) => {
        setDocuments(response.data);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      DocumentService.searchDocuments(searchTerm)
        .then((response) => {
          setDocuments(response.data);
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
    } else {
      fetchDocuments();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      DocumentService.deleteDocument(id)
        .then(() => {
          fetchDocuments();
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

  const handleVerify = (id) => {
    DocumentService.verifyDocument(id)
      .then(() => {
        fetchDocuments();
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

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Documents</h1>
        <Link to="/documents/new">
          <Button variant="success">Add New Document</Button>
        </Link>
      </div>

      <Form onSubmit={handleSearch} className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by document name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" variant="outline-secondary">
            Search
          </Button>
          {searchTerm && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSearchTerm('');
                fetchDocuments();
              }}
            >
              Clear
            </Button>
          )}
        </InputGroup>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <p>Loading documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center">
          <p>No documents found. Add your first document!</p>
        </div>
      ) : (
        <Row>
          {documents.map((document) => (
            <Col md={4} key={document.id} className="mb-4">
              <Card className="document-card h-100">
                <Card.Body>
                  <Card.Title>{document.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {document.type}
                  </Card.Subtitle>
                  <Card.Text>{document.description}</Card.Text>
                  <div className="mb-2">
                    {document.verified ? (
                      <Badge bg="success">Verified</Badge>
                    ) : (
                      <Badge bg="warning">Pending Verification</Badge>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link to={`/documents/${document.id}`}>
                      <Button variant="primary" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link to={`/documents/edit/${document.id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(document.id)}
                    >
                      Delete
                    </Button>
                    {(isModerator || isAdmin) && !document.verified && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleVerify(document.id)}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Last Updated: {new Date(document.updatedAt).toLocaleDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DocumentList;