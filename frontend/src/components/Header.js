import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = ({ currentUser, logOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">DigiLocker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {currentUser && (
              <>
                <Nav.Link as={Link} to="/documents">My Documents</Nav.Link>
                {currentUser.roles.includes('ROLE_ADMIN') && (
                  <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
                )}
                {currentUser.roles.includes('ROLE_MODERATOR') && (
                  <Nav.Link as={Link} to="/moderator">Moderator Dashboard</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <div className="d-flex align-items-center">
                <span className="text-white me-3">
                  Welcome, {currentUser.username}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
