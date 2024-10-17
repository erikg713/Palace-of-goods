# Palace of Goods Backend

## Dependencies and Setup Guide

### Core Dependencies

```txt
# Web Framework and Extensions
Flask==2.3.3
Flask-RESTful==0.3.10
Flask-CORS==4.0.0
Flask-JWT-Extended==4.5.2

# Database
pymongo==4.5.0
flask-mongoengine==1.0.0
mongoengine==0.27.0

# Security and Authentication
bcrypt==4.0.1
PyJWT==2.8.0
python-dotenv==1.0.0

# API Documentation
flask-swagger-ui==4.11.1
apispec==6.3.0

# Testing
pytest==7.4.2
pytest-cov==4.1.0

# Development Tools
python-dotenv==1.0.0
black==23.9.1
flake8==6.1.0

# Web3 Integration
web3==6.9.0
eth-account==0.9.0
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Flask Configuration
FLASK_APP=app.py
FLASK_ENV=development
DEBUG=True
PORT=5000

# Security
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_here

# Database
MONGODB_URI=mongodb://localhost:27017/palace_of_goods
DATABASE_NAME=palace_of_goods

# Web3 Configuration
WEB3_PROVIDER_URI=https://mainnet.infura.io/v3/your_infura_key
CONTRACT_ADDRESS=your_contract_address
```

### 4. Database Setup

Ensure MongoDB is running locally or update the `MONGODB_URI` in `.env` to point to your MongoDB instance.

```bash
# Start MongoDB locally (if using Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Initialize Database

```bash
# Run database initialization script
python scripts/init_db.py
```

### 6. Run Development Server

```bash
# Start Flask development server
flask run
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── product.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── products.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── tests/
│   ├── __init__.py
│   ├── test_auth.py
│   └── test_products.py
├── config.py
├── requirements.txt
└── app.py
```

## Development Guidelines

### Code Style

Follow PEP 8 guidelines and use provided development tools:

```bash
# Format code
black .

# Check code style
flake8

# Run tests
pytest
```

### Testing

```bash
# Run tests with coverage report
pytest --cov=app tests/
```

### API Documentation

Access API documentation at:
- Swagger UI: `http://localhost:5000/api/docs`
- OpenAPI JSON: `http://localhost:5000/api/swagger.json`

## Common Issues and Solutions

### 1. MongoDB Connection Issues

```bash
# Check MongoDB status
mongo --eval "db.serverStatus()"

# Common solution: Ensure MongoDB is running
docker ps | grep mongo
```

### 2. Dependencies Conflicts

```bash
# Create fresh virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. JWT Token Issues

Verify JWT configuration in `.env`:
```bash
# Generate new secret key
python -c "import secrets; print(secrets.token_hex(32))"
```

## Deployment Checklist

- [ ] Update `FLASK_ENV` to `production`
- [ ] Generate new secret keys
- [ ] Configure production MongoDB URI
- [ ] Enable CORS restrictions
- [ ] Set up logging
- [ ] Configure rate limiting
- [ ] Enable SSL/TLS
- [ ] Set up monitoring

## Database Migrations

```bash
# Create new migration
flask db migrate -m "description"

# Apply migrations
flask db upgrade
```

## Logging Configuration

Add to `.env` for production:

```env
LOG_LEVEL=INFO
LOG_FILE=app.log
```

## Security Best Practices

1. **Keep Dependencies Updated**
```bash
pip list --outdated
pip install --upgrade package_name
```

2. **Enable Security Headers**
```python
# In app configuration
SECURE_HEADERS = {
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff'
}
```

3. **Rate Limiting**
```python
RATELIMIT_DEFAULT = "100 per hour"
RATELIMIT_STORAGE_URL = "redis://localhost:6379/0"
```

## Contributing

1. Create feature branch
2. Follow code style guidelines
3. Add tests for new features
4. Update documentation
5. Submit pull request

## Support

For support:
- Create GitHub issue
- Email: backend-support@palaceofgoods.com
- Documentation: `/api/docs`