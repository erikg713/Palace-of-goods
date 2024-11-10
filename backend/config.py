import os
from dotenv import load_dotenv

# Determine environment and load corresponding .env file
ENVIRONMENT = os.getenv("FLASK_ENV", "development")
dotenv_path = f".env.{ENVIRONMENT}"

# Load the .env file based on environment
if not load_dotenv(dotenv_path):
    print(f"Warning: .env file for '{ENVIRONMENT}' environment not found. Default values may be used.")

class Config:
    # Flask-related settings
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    CORS_HEADERS = 'Content-Type'

    # Error handling for critical configuration values
    if not SECRET_KEY:
        raise ValueError("Critical environment variable 'SECRET_KEY' is missing.")
    if not JWT_SECRET_KEY:
        raise ValueError("Critical environment variable 'JWT_SECRET_KEY' is missing.")
    if not SQLALCHEMY_DATABASE_URI:
        raise ValueError("Critical environment variable 'DATABASE_URL' is missing for SQLAlchemy connection.")

    # Logging configuration
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

    # MongoDB URI (if used in place of SQLAlchemy)
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/palace_of_goods")

    # Debug Mode - Enable only for development environments
    DEBUG = ENVIRONMENT == "development"

    # Log to stdout if running in development
    @staticmethod
    def init_app(app):
        import logging
        from logging import StreamHandler

        # Set log level based on the LOG_LEVEL environment variable
        app.logger.setLevel(Config.LOG_LEVEL)

        if Config.DEBUG:
            # Only log to stdout in development for easy debugging
            handler = StreamHandler()
            handler.setLevel(Config.LOG_LEVEL)
            app.logger.addHandler(handler)

        # Additional app configurations can go here
        # Example: Setup MongoDB connection or integrate with other services.