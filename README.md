Palace of Goods Documentation

Palace of Goods is an online marketplace where users can browse, buy, sell, or trade a wide variety of items including electronics, clothing, furniture, and handmade crafts. The platform integrates Pi Network payments, ensuring transactions are quick, easy, and secure.

Table of Contents

Features

Tech Stack

Prerequisites

Installation and Setup

Running the Application

API Endpoints

Using Pi Payments

Security Considerations

License

Features

Buy, Sell, or Trade: Users can buy, sell, or trade various products, ranging from electronics to handmade crafts.

Responsive Design: The platform is optimized for mobile and desktop use, ensuring a smooth experience across devices.

Pi Network Integration: Secure, fast, and easy payments via the Pi Network cryptocurrency.

JWT-Based Authentication: Secure user authentication using JSON Web Tokens (JWT).

Progressive Web App (PWA): Palace of Goods is a PWA, allowing users to install the app on their devices and use it offline.

Tech Stack

Frontend: React, Axios, Bootstrap, Service Workers (PWA)

Backend: Flask, MongoDB, JWT for authentication

Database: MongoDB

Payments: Pi Network payments integration

Containerization: Docker, Docker Compose

Prerequisites

Before running the Palace of Goods application, make sure you have the following installed:

Node.js (14+)

Python (3.9+)

MongoDB (or use Docker for the database)

Docker (optional, for containerization)

Pi Network Developer Account (for Pi Payments)

Installation and Setup

Clone the Repository:
git clone https://github.com/yourusername/palace-of-goods.git cd palace-of-goods

Set Up Environment Variables: You'll need to create .env files in both the frontend and backend directories.
Backend .env (inside backend/ directory):

SECRET_KEY=mysecretkey JWT_SECRET_KEY=myjwtsecretkey DATABASE_URL=mongodb://localhost:27017/palace-of-goods FLASK_ENV=development PI_API_KEY=your_pi_api_key

Frontend .env (inside frontend/ directory):

REACT_APP_API_URL=http://localhost:5000

Install Dependencies: For Backend:
cd backend pip install -r requirements.txt

For Frontend:

cd frontend npm install

Running the Application

You can run the app either locally or using Docker.

Running Locally:
For Backend:

cd backend flask run

The backend will run at http://localhost:5000.

For Frontend:

cd frontend npm start

The frontend will run at http://localhost:3000.

Running with Docker: Build and Run using Docker Compose:
docker-compose up --build

Access the application:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api

API Endpoints

The backend provides a RESTful API for managing products, users, and transactions.

User Authentication:

POST /api/register: Register a new user.

POST /api/login: Login and get a JWT token.

Products:

GET /api/products: Fetch all products.

POST /api/products: Create a new product (JWT required).

Pi Payments:

POST /api/pi/transaction: Initiate a Pi transaction.

Using Pi Payments

To use Pi Network payments, ensure that you have:

Pi Developer Account: Sign up and get your API Key.

Configure .env: Add your Pi API Key to the backend .env file as PI_API_KEY.

The Pi Network payments are integrated into the backend, allowing users to make secure payments using Pi cryptocurrency. For more information on Pi Network payments, refer to the Pi Developer Documentation.

Security Considerations

JWT Authentication: The backend uses JWT tokens to secure protected routes and authenticate users.

Password Hashing: All user passwords are hashed before being stored in the database.

Environment Variables: Sensitive data like API keys and database URLs are stored in .env files and are not hardcoded into the application.

HTTPS: Ensure that the app is running behind HTTPS in production to secure communications between the client and server.

License

This project is licensed under the Pi Network trademark. See the LICENSE file for details.