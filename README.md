##Palace of Goods Documentation##

Palace of Goods is an online Web3-powered marketplace built using Flask for the backend, React for the frontend, and Pi Network for cryptocurrency payments and user authentication. Users can browse, buy, sell, or trade a wide variety of items, from electronics to handmade crafts, with Pi Network integration ensuring secure, fast, and easy payments.

Table of Contents

1. Features


2. Tech Stack


3. Prerequisites


4. Installation and Setup


5. Running the Application


6. API Endpoints


7. Using Pi Payments


8. Security Considerations


9. License




---

Features

Buy, Sell, or Trade: Users can buy, sell, or trade various products, including electronics, clothing, furniture, and handmade crafts.

Responsive Design: The platform is optimized for both mobile and desktop use, ensuring a smooth experience across devices.

Pi Network Integration: Secure, fast, and easy payments via the Pi Network cryptocurrency.

JWT-Based Authentication: Secure user authentication using JSON Web Tokens (JWT).

Progressive Web App (PWA): Palace of Goods is a PWA, allowing users to install the app on their devices and use it offline.

User Profiles: Users can create and manage profiles, track their purchase history, and update personal details.

Product Reviews and Ratings: Users can rate and review products to enhance the community experience.



---

Tech Stack

Frontend: React, TypeScript, Axios, Bootstrap, Service Workers (PWA)

Backend: Flask, Flask-JWT-Extended, SQLAlchemy, PostgreSQL

Blockchain: Pi Network SDK (Pi Payments)

Database: PostgreSQL (Relational database for scalable storage)

Containerization: Docker, Docker Compose



---

Prerequisites

Before running the Palace of Goods application, make sure you have the following installed:

Node.js (14+)

Python (3.9+)

PostgreSQL (or use Docker for the database)

Docker (optional, for containerization)

Pi Network Developer Account (for Pi Payments)



---

Installation and Setup

Clone the Repository

Clone the repository and navigate to the project folder:

git clone https://github.com/yourusername/palace-of-goods.git
cd palace-of-goods

Set Up Environment Variables

You'll need to create .env files in both the frontend and backend directories.

Backend .env (inside backend/ directory):

SECRET_KEY=mysecretkey
DATABASE_URI=postgresql://user:password@localhost:5432/palace_of_goods
JWT_SECRET_KEY=myjwtsecretkey
FLASK_ENV=development
PI_API_KEY=your_pi_api_key

Frontend .env (inside frontend/ directory):

REACT_APP_API_URL=http://localhost:5000

Install Dependencies

For Backend:

cd backend
pip install -r requirements.txt

For Frontend:

cd frontend
npm install


---

Running the Application

Running Locally

For Backend:

Run the Flask app:

cd backend
flask run

The backend will run at http://localhost:5000.

For Frontend:

Run the React app:

cd frontend
npm start

The frontend will run at http://localhost:3000.

Running with Docker

1. Set up Docker to run both the frontend and backend services.


2. Backend Dockerfile:



FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]

3. Frontend Dockerfile:



FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]

4. Docker Compose:



In the root directory, create docker-compose.yml:

version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

5. To start the application:



docker-compose up --build


---

API Endpoints

The backend provides a RESTful API for managing products, users, and transactions.

User Authentication

POST /api/register: Register a new user.

POST /api/login: Login and get a JWT token.


Products

GET /api/products: Fetch all products.

POST /api/products: Create a new product (JWT required).


Pi Payments

POST /api/pi/transaction: Initiate a Pi transaction.



---

Using Pi Payments

To use Pi Network payments, ensure you have:

Pi Developer Account: Sign up at Pi Network Developer Portal and get your API Key.

Configure .env: Add your Pi API Key to the backend .env file as PI_API_KEY.


Pi Payment Integration

In the frontend, Pi Network payments are integrated using the Pi SDK for seamless and secure cryptocurrency payments.

In frontend/src/pages/ProductDetail.tsx, use the Pi payment function:

import React from 'react';

const ProductDetail: React.FC = () => {
  const handlePayment = () => {
    Pi.createPayment({
      amount: 100,
      memo: "Purchase Product",
      metadata: { productId: "123" }
    }).then((payment) => {
      payment.complete()
        .then(() => alert('Payment complete!'))
        .catch((error) => console.error("Payment failed:", error));
    });
  };

  return <button onClick={handlePayment}>Pay with Pi</button>;
};

export default ProductDetail;


---

Security Considerations

JWT Authentication: The backend uses JWT tokens to secure protected routes and authenticate users.

Password Hashing: All user passwords are hashed using Werkzeug before being stored in the database.

Environment Variables: Sensitive data like API keys, database URLs, and JWT secrets are stored in .env files and are not hardcoded into the application.

HTTPS: Ensure that the app is running behind HTTPS in production to secure communications between the client and server.



---

License

This project is licensed under the Pi Network trademark. See the LICENSE file for details.

