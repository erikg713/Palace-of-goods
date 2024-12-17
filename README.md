# Palace of Goods

**A decentralized marketplace application built on the Pi Network.**  
Palace of Goods ensures secure, seamless, and transparent transactions while enabling users to list, buy, and sell goods in a blockchain-powered ecosystem.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Dockerized Deployment](#dockerized-deployment)
4. [Project Structure](#project-structure)
5. [Future Roadmap](#future-roadmap)
6. [Contributions](#contributions)
7. [License](#license)

---

## Features

- **Decentralized Transactions**: Built on the Pi Network for secure and efficient payments.
- **User-Friendly Marketplace**: Easily list, browse, and purchase goods.
- **Secure Payments**: Transactions are safe and reliable for buyers and sellers.
- **Multi-Chain Vision**: Future integration with Ethereum, Bitcoin, and Polygon.
- **Dockerized Deployment**: Simplified and scalable deployment using Docker.

---

## Technologies Used

### Backend
- **Framework**: Flask  
- **Database**: PostgreSQL  
- **Authentication**: JSON Web Tokens (JWT)  
- **Key Dependencies**:  
  - Flask-MongoEngine  
  - Flask-JWT-Extended  
  - Werkzeug  
  - Gunicorn  

### Frontend
- **Framework**: React.js  
- **Styling**: CSS/SCSS  

### Tools
- **Containerization**: Docker  
- **Payment Integration**: Pi Network Payment Identifier  

---

## Installation and Setup

### Prerequisites

Ensure the following tools are installed:
- Python 3.9+
- Node.js and npm
- PostgreSQL
- Docker (optional, for containerized deployment)

---

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/palace-of-goods.git
   cd palace-of-goods/backend
2. Set up a virtual environment (optional but recommended):

python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate


3. Install dependencies:

pip install -r requirements.txt


4. Create a .env file in the backend/ directory:

SECRET_KEY=your_secret_key_here
DATABASE_URL=postgresql://postgres:password@localhost:5432/palace_goods
PI_API_KEY=your_pi_api_key_here


5. Run the database migrations:

flask db init
flask db migrate -m "Initial migration."
flask db upgrade


6. Run the development server:

python run.py



Your backend API will be available at http://localhost:5000.


---

Frontend Setup

1. Navigate to the frontend directory:

cd ../frontend


2. Install dependencies:

npm install


3. Start the development server:

npm start



Your React frontend will be live at http://localhost:3000.


---

Dockerized Deployment

1. Build and run the application using Docker Compose:

docker-compose up --build


2. Access the application:

Backend API: http://localhost:5000

Frontend: http://localhost:3000





---

Project Structure

palace-of-goods/
│
├── backend/                 # Backend code
│   ├── app/                 # Flask app (routes, models, etc.)
│   ├── migrations/          # Database migrations
│   ├── .env                 # Environment variables
│   ├── requirements.txt     # Backend dependencies
│   ├── Dockerfile           # Dockerfile for backend
│   └── run.py               # Flask app entry point
│
├── frontend/                # Frontend code
│   ├── src/                 # React source code
│   ├── public/              # Public assets
│   ├── package.json         # Frontend dependencies
│   ├── Dockerfile           # Dockerfile for frontend
│   └── README.md            # Frontend documentation
│
└── docker-compose.yml       # Orchestrates backend, frontend, and PostgreSQL


---

Future Roadmap

Enhance Product Listings: Add categories, filters, and search functionality.

User Profiles: Enable personalized dashboards for sellers and buyers.

Payment History: View transaction history and payment statuses.

Cross-Chain Integration: Implement Ethereum and Polygon bridges for broader accessibility.

Mobile App: Develop a React Native app for on-the-go access.


