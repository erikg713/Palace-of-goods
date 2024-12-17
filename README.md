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
