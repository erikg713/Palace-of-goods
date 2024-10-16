# Backend - Palace of Goods

This is the **backend** service for the Palace of Goods project, built using **Flask** with **MongoDB** for the database and **JWT-based authentication** for user management. The backend exposes REST API endpoints for product management and user authentication.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Backend](#running-the-backend)
- [Using Docker](#using-docker)
- [API Endpoints](#api-endpoints)
- [Security Considerations](#security-considerations)

## Project Structure

```
backend/
├── app.py                 # Main Flask application entry point
├── config.py              # Application configuration (loads environment variables)
├── models.py              # MongoDB models (Product, User) with MongoEngine
├── blueprints.py          # API routes (product CRUD and user authentication)
├── requirements.txt       # Backend dependencies (Flask, MongoEngine, JWT)
├── Dockerfile             # Dockerfile for backend Flask application
└── .env                   # Environment variables (SECRET_KEY, JWT_SECRET, DATABASE_URL)
```

## Prerequisites

Make sure you have the following installed:

- **Python 3.9+**
- **pip** (Python package installer)

Or, if using **Docker**:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

### 1. Install Dependencies
Navigate to the `backend/` directory and install the Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Environment Variables
Create a `.env` file in the `backend/` directory to store sensitive environment variables:

#### **backend/.env**
```bash
SECRET_KEY=mysecretkey
JWT_SECRET_KEY=myjwtsecretkey
DATABASE_URL=mongodb://localhost:27017/palace-of-goods
FLASK_ENV=development
```

- `SECRET_KEY`: Used by Flask for session security.
- `JWT_SECRET_KEY`: Secret key for generating JWT tokens.
- `DATABASE_URL`: MongoDB connection string.

## Running the Backend

### 1. Running Without Docker
After setting up the environment and dependencies, start the Flask application:

```bash
export FLASK_APP=app.py
flask run
```

This will start the backend on `http://localhost:5000`.

### 2. Running with Docker
Alternatively, you can use Docker to run the backend in a container.

#### 1. Build the Docker Image
Navigate to the `backend/` directory and run:

```bash
docker build -t palace-backend .
```

#### 2. Run the Container
After building the image, run the container:

```bash
docker run -d -p 5000:5000 --env-file .env palace-backend
```

The backend will be available at `http://localhost:5000`.

## API Endpoints

### 1. **User Registration**: `POST /api/register`
Registers a new user.

**Request**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secretpassword"
}
```

**Response**:
```json
{
  "id": "user-id",
  "username": "johndoe",
  "email": "john@example.com"
}
```

### 2. **User Login**: `POST /api/login`
Authenticates a user and returns a JWT token.

**Request**:
```json
{
  "username": "johndoe",
  "password": "secretpassword"
}
```

**Response**:
```json
{
  "access_token": "jwt-token"
}
```

### 3. **Get Products**: `GET /api/products`
Retrieves a list of products.

**Response**:
```json
[
  {
    "id": "product-id",
    "name": "Product Name",
    "price": 100.0,
    "description": "Product description",
    "stock": 20
  }
]
```

### 4. **Create Product**: `POST /api/products`
Creates a new product (JWT required).

**Request**:
```json
{
  "name": "New Product",
  "price": 100.0,
  "description": "Description of the new product",
  "stock": 50
}
```

**Response**:
```json
{
  "id": "product-id",
  "name": "New Product",
  "price": 100.0,
  "description": "Description of the new product",
  "stock": 50
}
```

## Security Considerations

- **Environment Variables**: Ensure all sensitive data (such as `SECRET_KEY` and `JWT_SECRET_KEY`) is stored in environment variables and not hardcoded into the application.
- **Password Hashing**: Passwords are hashed using **Werkzeug** before being stored in the database.
- **JWT**: Use JWT tokens to protect API routes that require authentication. Ensure JWT tokens are securely generated and verified on the server.

---
