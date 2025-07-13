import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DocumentList from './pages/DocumentList';
import DocumentDetail from './pages/DocumentDetail';
import DocumentForm from './pages/DocumentForm';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import NotFound from './pages/NotFound';

// Services
import AuthService from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div className="app-container">
      <Header currentUser={currentUser} logOut={logOut} />
      <Container className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/documents" 
            element={currentUser ? <DocumentList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/documents/:id" 
            element={currentUser ? <DocumentDetail /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/documents/new" 
            element={currentUser ? <DocumentForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/documents/edit/:id" 
            element={currentUser ? <DocumentForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin" 
            element={
              currentUser && currentUser.roles.includes('ROLE_ADMIN') 
                ? <AdminDashboard /> 
                : <Navigate to="/" />
            } 
          />
          <Route 
            path="/moderator" 
            element={
              currentUser && currentUser.roles.includes('ROLE_MODERATOR') 
                ? <ModeratorDashboard /> 
                : <Navigate to="/" />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
