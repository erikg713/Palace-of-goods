import os
from dotenv import load_dotenv

# Determine environment and load corresponding .env file
ENVIRONMENT = os.getenv("FLASK_ENV", "development")
dotenv_path = f".env.{ENVIRONMENT}"
if not load_dotenv(dotenv_path):
    print(f"Warning: .env file for '{ENVIRONMENT}' environment not found. Default values may be used.")

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    CORS_HEADERS = 'Content-Type'

    # Error handling for critical configuration values
    if not SECRET_KEY or not JWT_SECRET_KEY:
        raise ValueError("Critical environment variables are missing: SECRET_KEY or JWT_SECRET_KEY.")
    if not SQLALCHEMY_DATABASE_URI:
        raise ValueError("DATABASE_URL must be set for SQLAlchemy to connect.")

    # Set logging level based on environment
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
    
    # MongoDB URI (if used in place of SQLAlchemy)
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/palace_of_goods")

    # Debug Mode - Enable only for development environments
    DEBUG = ENVIRONMENT == "development"