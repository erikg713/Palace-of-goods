# Palace of Goods

Palace of Goods is a decentralized marketplace application built on the Pi Network, designed for secure, seamless, and transparent transactions. The platform enables users to list, buy, and sell goods while earning rewards in a blockchain-powered ecosystem. A 10% transaction fee is applied to every sale, ensuring platform sustainability and growth.

---

## Features

- **Decentralized Transactions**: Built on the Pi Network for secure and efficient payments.
- **User-Friendly Marketplace**: List, browse, and purchase goods with ease.
- **Secure Payments**: Ensures safe and reliable transactions for buyers and sellers.
- **Multi-Chain Vision**: Future integration with Ethereum, Bitcoin, and Polygon for cross-chain compatibility.
- **Dockerized Deployment**: Simplified deployment and scalability using Docker.

---

## Technologies Used

### Backend
- **Framework**: Flask
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Dependencies**:
  - Flask-MongoEngine
  - Flask-JWT-Extended
  - Werkzeug
  - Gunicorn

### Frontend
- **Framework**: React.js
- **Styling**: CSS/SCSS

### Other Tools
- **Containerization**: Docker
- **Payment Integration**: Pi Network Payment Identifier

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:
- Python 3.9+
- Node.js and npm
- PostgreSQL
- Docker (optional, for containerized deployment)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/palace-of-goods.git
   cd palace-of-goods/backend

2. Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`


3. Install dependencies:

pip install -r requirements.txt


4. Configure environment variables:

Copy .env.example to .env and update it with your database credentials and Pi Network details.



5. Run the application:

flask run



Frontend Setup

1. Navigate to the frontend directory:

cd ../frontend


2. Install dependencies:

npm install


3. Start the development server:

npm start




---

Running with Docker

1. Ensure Docker is installed and running on your system.


2. Build and run the Docker containers:

docker-compose up --build


3. Access the app:

Frontend: http://localhost:3000

Backend: http://localhost:5000





---

Usage

1. Register/Login: Create an account or log in with existing credentials.


2. List Products: Add items to the marketplace by providing details and images.


3. Browse Products: Search and filter products by categories or price range.


4. Purchase Items: Complete purchases securely through the Pi Network Payment Gateway.


5. Track Orders: Manage your buying and selling activity in the user dashboard.




---

Contributing

We welcome contributions to Palace of Goods. Follow these steps to get involved:

1. Fork the repository.


2. Create a new branch:

git checkout -b feature-name


3. Commit your changes:

git commit -m "Add your message here"


4. Push to your branch:

git push origin feature-name


5. Create a pull request on GitHub.




---

Future Enhancements

Cross-Chain Transactions: Extend support for Ethereum, Bitcoin, and Polygon.

Mobile Application: Develop Android and iOS versions for enhanced accessibility.

AI-Powered Recommendations: Offer personalized shopping experiences.

Seller Ratings: Introduce a rating and review system for sellers.



---

License

This project is licensed under the MIT License. See the LICENSE file for details.


---

Contact

For inquiries, feedback, or support:

Email: support@palaceofgoods.com

GitHub Repository: Palace of Goods


Thank you for being a part of the Palace of Goods community!

This provides a fresh, clear structure for your project. You can modify it as needed!

