import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp
from config import Config
from mongoengine import connect

# Initialize Flask app
app = Flask(__name__)

# Load the configuration from config.py
app.config.from_object(Config)

# Enable CORS (Cross-Origin Resource Sharing)
CORS(app)

# Initialize SQLAlchemy (for relational database)
db = SQLAlchemy(app)
logging.debug("Connected to SQLAlchemy database successfully.")

# Connect to MongoDB (for MongoEngine)
try:
    connect(host=app.config['MONGO_URI'])
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

# Register blueprints for modular app structure
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Logging setup
logging.basicConfig(level=logging.DEBUG)

# List all registered routes for debugging purposes
for rule in app.url_map.iter_rules():
    logging.debug(f"Endpoint: {rule.endpoint}, URL: {rule}")

# Run the app
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
