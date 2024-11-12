import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from mongoengine import connect
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp

# Initialize Flask app
app = Flask(__name__)

# Configure Flask app with environment variables or defaults
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///default.db')

# Initialize SQLAlchemy
db = SQLAlchemy(app)
logging.debug("Connected to SQLAlchemy database successfully.")

# Connect to MongoDB (for MongoEngine)
try:
    connect(host=os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace_of_goods'))
    logging.debug("Connected to MongoDB successfully.")
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {e}")

# Set up Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# Import and configure the user loader for Flask-Login
from models.user import User

@login_manager.user_loader
def load_user(user_id):
    return User.objects.get(id=user_id)  # Adjust this if needed for SQLAlchemy

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Logging setup
logging.basicConfig(level=logging.DEBUG)

# List all registered routes for debugging purposes
for rule in app.url_map.iter_rules():
    logging.debug(f"Endpoint: {rule.endpoint}, URL: {rule}")

# Run the app
if __name__ == '__main__':
    app.run(debug=app.config['FLASK_ENV'] == 'development')
