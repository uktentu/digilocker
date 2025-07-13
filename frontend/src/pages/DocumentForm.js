import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import DocumentService from '../services/DocumentService';

const DocumentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAddMode = !id;
  
  const [document, setDocument] = useState({
    name: '',
    type: '',
    description: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isAddMode) {
      setLoading(true);
      DocumentService.getDocumentById(id)
        .then(response => {
          const document = response.data;
          setDocument(document);
          setLoading(false);
        })
        .catch(error => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setError(message);
          setLoading(false);
        });
    }
  }, [id, isAddMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocument(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Validate form
    if (!document.name || !document.type) {
      return;
    }
    
    setLoading(true);
    
    if (isAddMode) {
      createDocument();
    } else {
      updateDocument();
    }
  };

  const createDocument = () => {
    DocumentService.createDocument(document)
      .then(response => {
        navigate(`/documents/${response.data.id}`);
      })
      .catch(error => {
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

  const updateDocument = () => {
    DocumentService.updateDocument(id, document)
      .then(() => {
        navigate(`/documents/${id}`);
      })
      .catch(error => {
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

  return (
    <Container>
      <h1>{isAddMode ? 'Add Document' : 'Edit Document'}</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={document.name}
            onChange={handleChange}
            isInvalid={submitted && !document.name}
            placeholder="Enter document name"
          />
          <Form.Control.Feedback type="invalid">
            Name is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={document.type}
            onChange={handleChange}
            isInvalid={submitted && !document.type}
            placeholder="Enter document type (e.g., ID Card, Certificate)"
          />
          <Form.Control.Feedback type="invalid">
            Type is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={document.description}
            onChange={handleChange}
            placeholder="Enter document description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="content"
            value={document.content}
            onChange={handleChange}
            placeholder="Enter document content"
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/documents')}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default DocumentForm;