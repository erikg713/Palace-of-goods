import os
from flask import Flask
from flask_login import LoginManager
from mongoengine import connect, DoesNotExist
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp
import logging

# Initialize the Flask app
app = Flask(__name__)

# Load configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')

# Securely set debug mode based on environment
app.config['DEBUG'] = app.config['FLASK_ENV'] == 'development'

# Connect to MongoDB with error handling
try:
    connect(host=os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace_of_goods'))
    print("Connected to MongoDB successfully!")
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {e}")
    raise

# Set up Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# Import user model after database connection
from models.user import User

@login_manager.user_loader
def load_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except DoesNotExist:
        logging.error(f"User with ID {user_id} does not exist.")
        return None

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Logging setup (differentiating between development and production)
if app.config['DEBUG']:
    logging.basicConfig(level=logging.DEBUG)
else:
    logging.basicConfig(level=logging.WARNING)

# Run the app with safe debug mode
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
