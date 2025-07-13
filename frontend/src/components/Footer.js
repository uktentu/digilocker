import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>DigiLocker &copy; {new Date().getFullYear()} - Secure Document Storage and Management</p>
            <p className="text-muted">A Spring Boot and React Application</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;