# Employee Management System

A full-stack Employee Management System built with React, Node.js, Express.js, and MySQL.

This project is being developed as a complete full-stack application with authentication, employee management, role-based access, and other employee-related features.

---

## 🚀 Tech Stack

### Frontend

- React
- React Router
- Bootstrap
- Bootstrap Icons
- Axios

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- bcryptjs
- JSON Web Token (JWT)
- dotenv
- CORS

### Development Tools

- Nodemon
- Git
- GitHub
- Postman
- VS Code

---

## ✨ Current Features

### Landing Page

- Responsive Navbar
- Hero Section
- Features Section
- About Section
- Call-to-Action Section
- Footer
- Responsive Design
- Help Button / Support UI

### Authentication

- User Registration
- User Login
- Email validation
- Password validation
- Confirm password validation
- Password hashing using bcrypt
- JWT authentication
- JWT protected backend routes
- Login error handling
- Registration error handling
- Frontend JWT storage
- Logout functionality - planned

### Backend

- Express server
- MySQL database connection
- Authentication routes
- Authentication controller
- JWT authentication middleware
- Protected API route
- Environment variable configuration
- CORS configuration
- JSON request handling

---

## 🔐 Authentication Flow

### Registration

```text
Register Page
     ↓
React
     ↓
Axios
     ↓
POST /api/auth/register
     ↓
Express
     ↓
Validate User
     ↓
Check Existing Email
     ↓
bcrypt Password Hash
     ↓
MySQL
     ↓
Registration Successful
     ↓
Login Page