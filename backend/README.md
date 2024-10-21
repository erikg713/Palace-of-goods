## Backend - Palace of Goods

This is the **backend** for the Palace of Goods, a full-stack web app built using **Flask**, **MongoDB**, and **JWT-based authentication**.

### Project Structure

```bash
backend/
├── app.py                 # Main Flask application entry point
├── config.py              # Application configuration (loads environment variables)
├── models.py              # MongoDB models (Product, User) with MongoEngine
├── blueprints.py          # API routes (product CRUD and user authentication)
├── requirements.txt       # Backend dependencies (Flask, MongoEngine, JWT)
├── Dockerfile             # Dockerfile for backend Flask application
└── .env                   # Environment variables (SECRET_KEY, JWT_SECRET, DATABASE_URL)
```

### Prerequisites

Make sure you have the following installed:

- **Python 3.9+**
- **MongoDB** (if not using Docker)
- **pip** (Python package manager)

Or, if using **Docker**:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/palace-of-goods.git
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file with the following content:
   ```bash
   SECRET_KEY=mysecretkey
   JWT_SECRET_KEY=myjwtsecretkey
   DATABASE_URL=mongodb://localhost:27017/palace-of-goods
   FLASK_ENV=development
   ```

4. **Run the Application**:
   ```bash
   flask run
   ```

   This will start the backend server on `http://localhost:5000`.

---

### Running the Backend with Docker

1. **Build the Docker Image**:
   Navigate to the `backend/` directory and run:
   ```bash
   docker build -t palace-backend .
   ```

2. **Run the Container**:
   After building the image, run the container:
   ```bash
   docker run -d -p 5000:5000 --env-file .env palace-backend
   ```

The backend will be available at `http://localhost:5000`.

---

### API Endpoints

- **User Registration**: `POST /api/register`
  - Registers a new user.

- **User Login**: `POST /api/login`
  - Authenticates a user and returns a JWT token.

- **Get Products**: `GET /api/products`
  - Retrieves a list of products.

- **Create Product**: `POST /api/products`
  - Creates a new product (JWT required).

---

### Security Considerations

- **Environment Variables**: Ensure sensitive data like `SECRET_KEY` and `JWT_SECRET_KEY` are stored in environment variables and not hardcoded into the application.
- **Password Hashing**: Passwords are hashed using **Werkzeug** before being stored in the database.
- **JWT**: Use JWT tokens to protect API routes that require authentication.

---
