import os
from flask import Flask
from flask_login import LoginManager
from mongoengine import connect
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp
import logging

# Initialize the Flask app
app = Flask(__name__)

# Load configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')

# Connect to MongoDB
connect(host=os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace_of_goods'))

# Set up Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# Import user model after database connection
from models.user import User

@login_manager.user_loader
def load_user(user_id):
    return User.objects.get(id=user_id)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Logging setup
logging.basicConfig(level=logging.DEBUG)

# Run the app
if __name__ == '__main__':
    app.run(debug=app.config['FLASK_ENV'] == 'development')

