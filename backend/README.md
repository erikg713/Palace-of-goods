Palace of Goods Backend

Palace of Goods is an online marketplace where users can browse, buy, sell, or trade a wide variety of items. The platform integrates Pi Network payments, ensuring transactions are fast, secure, and easy.

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



---

Features

User Authentication: Users can register and log in using JWT tokens.

Product Management: CRUD operations for products (create, read, update, delete).

Pi Network Integration: Secure and fast payments via Pi cryptocurrency.

Database: MongoDB for data storage.

RESTful API: Exposes API endpoints for frontend integration.



---

Tech Stack

Backend Framework: Flask (Python)

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Payments: Pi Network API Integration

Containerization: Docker



---

Prerequisites

Before running the backend, make sure you have the following installed:

Python 3.9+

MongoDB (or Docker for containerized database)

Pi Network Developer Account (for Pi Payments)

Docker (optional, for containerization)



---

Installation and Setup

1. Clone the Repository

Clone the project to your local machine:

git clone https://github.com/yourusername/palace-of-goods.git
cd palace-of-goods

2. Set Up Environment Variables

You'll need to create a .env file inside the backend/ directory for configuration:

Backend .env (inside backend/ directory):

SECRET_KEY=mysecretkey
JWT_SECRET_KEY=myjwtsecretkey
DATABASE_URL=mongodb://localhost:27017/palace-of-goods
FLASK_ENV=development
PI_API_KEY=your_pi_api_key

SECRET_KEY: Flask’s secret key for cryptographic operations.

JWT_SECRET_KEY: Secret key for signing JWT tokens.

DATABASE_URL: Connection string to your MongoDB instance.

PI_API_KEY: Your Pi Network API key (get it from the Pi Network Developer Portal).


3. Install Backend Dependencies

Install the required Python packages:

cd backend
pip install -r requirements.txt


---

Running the Application

Running Locally

1. Run the Backend:



cd backend
flask run

The backend will run at http://localhost:5000.

Running with Docker

1. Build and Run Docker Containers:



docker-compose up --build

This will build and run the backend and database using Docker Compose.

2. Access the Application:



Backend API: http://localhost:5000/api



---

API Endpoints

The backend provides a RESTful API for managing products, users, and transactions.

User Authentication

POST /api/register: Register a new user.

Request body:

{
  "username": "example",
  "password": "password"
}


POST /api/login: Login and get a JWT token.

Request body:

{
  "username": "example",
  "password": "password"
}

Response:

{
  "access_token": "jwt_token"
}



Products

GET /api/products: Fetch all products.

POST /api/products: Create a new product (JWT required).

Request body:

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100.0
}



Pi Payments

POST /api/pi/transaction: Initiate a Pi transaction.

Request body:

{
  "amount": 50,
  "recipient": "recipient_wallet_address"
}




---

Using Pi Payments

To use Pi Network payments, follow these steps:

1. Pi Developer Account:

Sign up and obtain your Pi API Key from the Pi Network Developer Portal.



2. Configure .env:

Add your Pi API Key to the .env file in the backend/ directory:

PI_API_KEY=your_pi_api_key



3. Integration: The backend is integrated with the Pi Network API to handle payments securely using Pi cryptocurrency.



For more information on Pi Network payments, refer to the Pi Developer Documentation.


---

Security Considerations

JWT Authentication: The backend uses JWT tokens to secure protected routes and authenticate users. Always keep your JWT_SECRET_KEY safe.

Password Hashing: Passwords are securely hashed using a strong hashing algorithm before being stored in the database.

Environment Variables: All sensitive data (like database URLs and API keys) is stored in .env files and never hardcoded into the application.

HTTPS: In a production environment, ensure the app is running over HTTPS to protect user data and API communications.



---

License

This project is licensed under the Pi Network trademark. See the LICENSE file for details.


---

Notes:

If you prefer using MongoDB with Docker, ensure the database service is correctly set up in your docker-compose.yml file and the MongoDB container is running before starting the backend.

For running in production, consider setting up reverse proxies (such as Nginx) and ensure the app runs over HTTPS.



---

This README.md file is structured to provide all necessary information for setting up and running the backend for the Palace of Goods marketplace.

