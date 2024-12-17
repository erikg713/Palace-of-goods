# Palace of Goods

**A decentralized marketplace application built on the Pi Network.**  
Palace of Goods ensures secure, seamless, and transparent transactions while enabling users to list, buy, and sell goods in a blockchain-powered ecosystem.

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

   python -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`

pip install -r requirements.txt

flask run

cd ../frontend

npm install

npm start

docker-compose up --build

git checkout -b feature-name

git commit -m "Add your message here"

git push origin feature-name

---

### Key Additions:
1. **API Reference Placeholder**: Developers may appreciate a dedicated API section.
2. **Formatting Consistency**: Enhanced readability with bold headings and structured steps.
3. **Clarity in Commands**: Clearer section headers for Docker, backend, and frontend.

---

**Suggestions for Next Steps:**
**a.** Add API endpoint documentation with sample JSON requests and responses.  
**b.** Provide screenshots or visuals for the user interface. Let me know if you need help generating these!
