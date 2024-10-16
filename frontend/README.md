# Frontend - Palace of Goods

This is the **frontend** service for the Palace of Goods project, built using **React** and **Axios** for communicating with the backend. The frontend allows users to browse products, manage their accounts, and interact with the marketplace.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Frontend](#running-the-frontend)
- [Using Docker](#using-docker)
- [Available Scripts](#available-scripts)
- [Security Considerations](#security-considerations)

## Project Structure

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

## Prerequisites

Make sure you have the following installed:

- **Node.js 14+**
- **npm** (Node package manager)

Or, if using **Docker**:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

### 1. Install Dependencies
Navigate to the `frontend/` directory and install the required npm packages:
```bash
cd frontend
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the `frontend/` directory:

#### **frontend/.env**
```bash
REACT_APP_API_URL=http://localhost:5000
```

- `REACT_APP_API_URL`: The base URL for the backend API.

## Running the Frontend

### 1. Running Without Docker
Start the frontend application locally by running:

```bash
npm start
```

This will start the React application on `http://localhost:3000`.

### 2. Running with Docker
Alternatively, you can use Docker to run the frontend in a container.

#### 1. Build the Docker Image
Navigate to the `frontend/` directory and run:

```bash
docker build -t palace-frontend .
```

#### 2. Run the Container
After building the image, run the container:

```bash
docker run -d -p 3000:3000 --env-file .env palace-frontend
```

The frontend will be available at `http://localhost:3000`.

## Available Scripts

In the `frontend/` directory, you can run the following commands:

### 1. `npm start`
Starts the development server, serving the React app on `http://localhost:3000`.

### 2. `npm run build`
Builds the production-ready React app.

### 3. `npm run test`
Runs the tests for the React app.

## Security Considerations

- **Environment Variables**: Ensure sensitive values like `REACT_APP_API_URL` are set correctly for development and production environments.
- **Axios**: Axios is used to make secure HTTP requests to the backend. Ensure proper error handling is in place for failed requests.
- **HTTPS**: Ensure the application runs behind HTTPS in production to secure communication between the frontend and backend.

---
