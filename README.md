# DigiLocker Clone

A Spring Boot application that implements a clone of DigiLocker with user validation and document management features.

## Features

### Backend Features
- User authentication and authorization with JWT
- Document upload, storage, and management
- Document verification
- Role-based access control
- RESTful API with OpenAPI documentation

### Frontend Features
- Responsive user interface built with React and Bootstrap
- User authentication (login/register)
- Document management (view, create, edit, delete)
- Document verification for moderators and admins
- Search functionality for documents
- Protected routes for authenticated users

## Technologies Used

### Backend Technologies
- Java 17
- Spring Boot 3.5.3
- Spring Security with JWT authentication
- Spring Data JPA
- H2 Database (for development)
- Oracle Database (for production)
- OpenAPI/Swagger for API documentation

### Frontend Technologies
- React 18
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests
- JWT for authentication
- CSS for styling

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Node.js 14 or higher
- npm 6 or higher

### Backend Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/digilocker.git
   cd digilocker
   ```

2. Build the backend application:
   ```
   mvn clean install
   ```

3. Run the backend application:
   ```
   mvn spring-boot:run
   ```

The backend application will start on port 8080 by default.

### Frontend Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the frontend application:
   ```
   npm start
   ```

The frontend application will start on port 3000 by default and will automatically open in your default browser.

### API Documentation

Once the application is running, you can access the API documentation at:
- http://localhost:8080/swagger-ui.html

### H2 Console

For development, you can access the H2 database console at:
- http://localhost:8080/h2-console

Use the following credentials:
- JDBC URL: jdbc:h2:mem:digilockerdb
- Username: sa
- Password: password

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Authenticate a user and get JWT token

### Documents

- `GET /api/documents` - Get all documents for the authenticated user
- `GET /api/documents/{id}` - Get a specific document by ID
- `POST /api/documents` - Create a new document
- `PUT /api/documents/{id}` - Update an existing document
- `DELETE /api/documents/{id}` - Delete a document
- `PUT /api/documents/{id}/verify` - Verify a document (moderator/admin only)
- `GET /api/documents/search?name={name}` - Search documents by name

## Security

The application uses JWT (JSON Web Token) for authentication. To access protected endpoints, you need to include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
