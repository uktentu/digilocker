import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 mb-4">Welcome to DigiLocker</h1>
            <p className="lead">
              A secure platform for storing, managing, and verifying your important documents.
            </p>
            {!currentUser && (
              <div className="mt-4">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="me-3">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-primary" size="lg">
                    Login
                  </Button>
                </Link>
              </div>
            )}
            {currentUser && (
              <div className="mt-4">
                <Link to="/documents">
                  <Button variant="primary" size="lg">
                    My Documents
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Secure Storage</Card.Title>
              <Card.Text>
                Store your important documents securely with encryption and access control.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Easy Management</Card.Title>
              <Card.Text>
                Organize, categorize, and search your documents with ease.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Document Verification</Card.Title>
              <Card.Text>
                Get your documents verified by authorized personnel for added authenticity.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="text-center">
            <h2 className="mb-4">How It Works</h2>
            <p>
              DigiLocker provides a simple and secure way to store and manage your important documents.
              Upload your documents, organize them, and access them anytime, anywhere.
              You can also get your documents verified by authorized personnel for added authenticity.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;