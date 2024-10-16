# Palace of Goods

**Palace of Goods** is a full-stack web application that acts as a marketplace, integrating **Web3** technology. It is built using **React** for the frontend and **Flask** for the backend, with **MongoDB** for the database, and **JWT-based authentication** for security.

This README will guide you through setting up the project, running it locally using **Docker**, and explain the structure of the project.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Security Considerations](#security-considerations)

## Project Structure

### Backend
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

### Frontend
```
frontend/
├── public/
│   └── index.html         # Main HTML file for React
├── src/
│   ├── api.js             # Axios API client for communicating with the backend
│   ├── App.js             # Main React component (routes to Home, Products)
│   ├── index.js           # Main React entry point
│   ├── components/
│   │   ├── Home.js        # Home page component
│   │   └── Products.js    # Products page component
├── package.json           # Frontend dependencies (React, Axios, Bootstrap, React Router)
├── Dockerfile             # Dockerfile for frontend React application
└── .env                   # Environment variables (REACT_APP_API_URL)
```

### Database (MongoDB)
The MongoDB database is orchestrated with Docker Compose and defined in the `docker-compose.yml` file. Data is persisted using Docker volumes.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

Optionally, if you want to run the frontend or backend without Docker:

- **Backend**: Python 3.9+ and `pip`
- **Frontend**: Node.js 14+ and `npm`

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/palace-of-goods.git
cd palace-of-goods
```

### 2. Set Up Environment Variables

Create a `.env` file in both the `backend/` and `frontend/` directories.

#### **Backend `.env`**
```bash
SECRET_KEY=mysecretkey
JWT_SECRET_KEY=myjwtsecretkey
DATABASE_URL=mongodb://mongo:27017/palace-of-goods
FLASK_ENV=production
```

#### **Frontend `.env`**
```bash
REACT_APP_API_URL=http://localhost:5000
```

These environment variables control database connections, API URLs, and security keys. Ensure they are set correctly for your environment.

## Running the Application

### Using Docker (Recommended)

1. **Build and Start Services** using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build the **backend** (Flask) and **frontend** (React) services.
   - Spin up a **MongoDB** container.
   - Launch a **reverse proxy** (if you configure Nginx).

2. **Access the Application**:
   - **Frontend**: Open `http://localhost:3000` in your browser.
   - **Backend API**: Access the API at `http://localhost:5000/api`.

### Running Without Docker

#### Backend
1. Navigate to the `backend/` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask backend:
   ```bash
   flask run
   ```

#### Frontend
1. Navigate to the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React frontend:
   ```bash
   npm start
   ```

The frontend will be running on `http://localhost:3000` and the backend API on `http://localhost:5000`.

## Environment Variables

### Backend (`backend/.env`)

| Variable        | Description                                      |
|-----------------|--------------------------------------------------|
| `SECRET_KEY`    | Flask secret key for sessions                    |
| `JWT_SECRET_KEY`| JWT secret key for authentication                |
| `DATABASE_URL`  | MongoDB connection string (e.g., via Docker)     |
| `FLASK_ENV`     | Set to `development` or `production`             |

### Frontend (`frontend/.env`)

| Variable              | Description                                        |
|-----------------------|----------------------------------------------------|
| `REACT_APP_API_URL`    | The base URL for the backend API (e.g., http://localhost:5000) |

## Docker Setup

**`docker-compose.yml`** defines how all services (frontend, backend, and database) interact with each other using Docker.

### Key Services:
- **Frontend**: The React app served on `localhost:3000`.
- **Backend**: The Flask API running on `localhost:5000`.
- **MongoDB**: A MongoDB instance with data persisted in Docker volumes.

### Example `docker-compose.yml`:
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000
    networks:
      - palace-network

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=mongodb://db:27017/palace-of-goods
      - SECRET_KEY=${SECRET_KEY}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
    networks:
      - palace-network
    depends_on:
      - db

  db:
    image: mongo
    container_name: mongo
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
    networks:
      - palace-network

volumes:
  mongo-data:

networks:
  palace-network:
    driver: bridge
```

## API Documentation

### Endpoints

#### 1. **User Registration**: `POST /api/register`
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

#### 2. **User Login**: `POST /api/login`
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

#### 3. **Get Products**: `GET /api/products`
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

#### 4. **Create Product**: `POST /api/products`
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

1. **Environment Variables**: Store sensitive data such as `SECRET_KEY` and `JWT_SECRET_KEY` in environment variables and **never commit them to version control**.
2. **JWT Tokens**: Ensure JWT tokens are securely generated and stored. Use `@jwt_required()` decorators to protect routes that require authentication.
3. **Password Hashing**: Passwords are hashed using **Werkzeug** and are never stored in plaintext.
4. **HTTPS**: Ensure the application is running behind HTTPS in production environments.

## Conclusion

This project provides a full-stack web application using **React**, **Flask**, and **MongoDB** with **JWT-based authentication**. By leveraging **Docker**, all services can be orchestrated efficiently and can be easily deployed to any platform that supports Docker.

Feel free to reach out if you encounter any issues.