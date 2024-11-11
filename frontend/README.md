Palace of Goods Frontend

Palace of Goods is an online marketplace where users can browse, buy, sell, or trade a wide variety of items. The platform integrates Pi Network payments, ensuring transactions are quick, easy, and secure.

Table of Contents

Features

Tech Stack

Prerequisites

Installation and Setup

Running the Application

Connecting to the Backend

Environment Variables

Building for Production

License



---

Features

Product Browsing: Users can browse, search, and filter products listed on the marketplace.

User Authentication: Secure login and registration using JWT tokens.

Product Management: Add, edit, and delete products (for authenticated users).

Pi Payments: Integration with Pi Network for seamless cryptocurrency transactions.

Responsive Design: Optimized for mobile and desktop devices.

Progressive Web App (PWA): Palace of Goods is a PWA, which allows users to install the app on their devices and use it offline.



---

Tech Stack

Frontend Framework: React

HTTP Client: Axios

UI Components: Bootstrap

PWA: Service Workers

State Management: React Context (or Redux, if used)

Styling: Custom CSS or Bootstrap

Containerization: Docker (optional)



---

Prerequisites

Before running the frontend, make sure you have the following installed:

Node.js (14+)

npm (or yarn)

Backend API (make sure the backend is running locally or in a container, as the frontend will make API calls to it)

Docker (optional, for containerization)



---

Installation and Setup

1. Clone the Repository:

git clone https://github.com/yourusername/palace-of-goods.git
cd palace-of-goods/frontend


2. Install Dependencies: Install the required Node.js dependencies:

npm install


3. Set Up Environment Variables: Create a .env file inside the frontend/ directory for configuration:

Frontend .env:

REACT_APP_API_URL=http://localhost:5000

REACT_APP_API_URL: The base URL for the backend API (usually http://localhost:5000 for local development).





---

Running the Application

1. Run the Frontend Locally: Start the development server:

npm start

The frontend will run at http://localhost:3000.


2. Run with Docker: If you are using Docker, you can containerize the frontend by following these steps:

Dockerfile (if not already created):

# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the frontend code to the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 for the application
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

docker-compose.yml (if not already created):

version: '3.8'

services:
  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000
    depends_on:
      - backend

Build and run the Docker containers:

docker-compose up --build

Access the application at http://localhost:3000.




---

Connecting to the Backend

The frontend interacts with the backend API for user authentication, product management, and Pi payment processing. Make sure the backend is running and accessible. By default, the frontend expects the backend to be running at http://localhost:5000.

If you are running the frontend in production, make sure the environment variable REACT_APP_API_URL points to the correct backend URL.


---

Environment Variables

Create a .env file in the frontend/ directory and add the following configuration:

REACT_APP_API_URL=http://localhost:5000

REACT_APP_API_URL: The base URL for your backend API.


You can add more environment variables as needed, such as for authentication tokens or Pi Network integration.


---

Building for Production

To build the app for production, use the following command:

npm run build

This will generate an optimized production build in the build/ directory.

You can then deploy the build/ directory to your web server or use Docker to containerize the production version of the frontend.


---

License

This project is licensed under the Pi Network trademark. See the LICENSE file for details.


---

Notes:

If you are deploying to production, ensure you configure the backend to serve the production version of the frontend (either as static files or through a web server like Nginx).

The Pi Network payments integration is handled by the backend, but the frontend is responsible for initiating payments and displaying transaction statuses to the user.



---

This README.md file provides all the information needed to set up, develop, and deploy the frontend for the Palace of Goods project.

