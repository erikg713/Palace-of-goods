# Palace of Goods

**Palace of Goods** is an online marketplace where users can browse, buy, sell, or trade a wide variety of items including electronics, clothing, furniture, and handmade crafts. The platform integrates **Pi Network** payments, ensuring transactions are quick, easy, and secure.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Using Pi Payments](#using-pi-payments)
- [Security Considerations](#security-considerations)
- [License](#license)

---

## Features

- **Buy, Sell, or Trade**: Users can buy, sell, or trade various products, ranging from electronics to handmade crafts.
- **Responsive Design**: The platform is optimized for mobile and desktop use, ensuring a smooth experience across devices.
- **Pi Network Integration**: Secure, fast, and easy payments via the **Pi Network** cryptocurrency.
- **JWT-Based Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Progressive Web App (PWA)**: Palace of Goods is a PWA, allowing users to install the app on their devices and use it offline.

---

## Tech Stack

- **Frontend**: React, Axios, Bootstrap, Service Workers (PWA)
- **Backend**: Flask, MongoDB, JWT for authentication
- **Database**: MongoDB
- **Payments**: Pi Network payments integration
- **Containerization**: Docker, Docker Compose

---

## Prerequisites

Before running the Palace of Goods application, make sure you have the following installed:

- **Node.js** (14+)
- **Python** (3.9+)
- **MongoDB** (or use Docker for the database)
- **Docker** (optional, for containerization)
- **Pi Network Developer Account** (for Pi Payments)

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/palace-of-goods.git
cd palace-of-goods
```

### 2. Set Up Environment Variables
You'll need to create `.env` files in both the **frontend** and **backend** directories.

#### **Backend `.env`** (inside `backend/` directory):
```bash
SECRET_KEY=mysecretkey
JWT_SECRET_KEY=myjwtsecretkey
DATABASE_URL=mongodb://localhost:27017/palace-of-goods
FLASK_ENV=development
PI_API_KEY=your_pi_api_key
```

#### **Frontend `.env`** (inside `frontend/` directory):
```bash
REACT_APP_API_URL=http://localhost:5000
```

### 3. Install Dependencies

#### For Backend:
```bash
cd backend
pip install -r requirements.txt
```

#### For Frontend:
```bash
cd frontend
npm install
```

---

## Running the Application

You can run the app either locally or using Docker.

### 1. Running Locally

#### For Backend:
```bash
cd backend
flask run
```

The backend will run at `http://localhost:5000`.

#### For Frontend:
```bash
cd frontend
npm start
```

The frontend will run at `http://localhost:3000`.

### 2. Running with Docker

1. **Build and Run** using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - **Frontend**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5000/api`

---

## API Endpoints

The backend provides a RESTful API for managing products, users, and transactions.

### User Authentication
- **POST /api/register**: Register a new user.
- **POST /api/login**: Login and get a JWT token.

### Products
- **GET /api/products**: Fetch all products.
- **POST /api/products**: Create a new product (JWT required).

### Pi Payments
- **POST /api/pi/transaction**: Initiate a Pi transaction.

---

## Using Pi Payments

To use Pi Network payments, ensure that you have:
1. **Pi Developer Account**: Sign up and get your **API Key**.
2. **Configure `.env`**: Add your **Pi API Key** to the backend `.env` file as `PI_API_KEY`.
3. **Integration**: The Pi Network payments are integrated into the backend, allowing users to make secure payments using Pi cryptocurrency.

For more information on Pi Network payments, refer to the [Pi Developer Documentation](https://developers.minepi.com/).

---

## Security Considerations

- **JWT Authentication**: The backend uses **JWT** tokens to secure protected routes and authenticate users.
- **Password Hashing**: All user passwords are hashed before being stored in the database.
- **Environment Variables**: Sensitive data like API keys and database URLs are stored in `.env` files and are not hardcoded into the application.
- **HTTPS**: Ensure that the app is running behind HTTPS in production to secure communications between the client and server.

---

## License

This project is licensed under the Pi Network trademark. ## See the [LICENSE](LICENSE) file for details.

---
