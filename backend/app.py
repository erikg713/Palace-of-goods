import os
import logging
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from mongoengine import connect
import requests  # For making requests to the Pi API

# Import your blueprints
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp
from config import Config

# Initialize Flask app
app = Flask(__name__)

# Load the configuration from config.py
app.config.from_object(Config)

# Enable CORS (Cross-Origin Resource Sharing)
CORS(app)

# Initialize SQLAlchemy (for relational database)
db = SQLAlchemy(app)
logging.info("Connected to SQLAlchemy database successfully.")

# Connect to MongoDB (for MongoEngine)
try:
    connect(host=app.config['MONGO_URI'])
    logging.info("Connected to MongoDB successfully.")
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {e}")

# Set up Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# Import the user model for Flask-Login
from models.user import User

@login_manager.user_loader
def load_user(user_id):
    return User.objects.get(id=user_id)  # Adjust if needed

# Register blueprints for modular app structure
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Logging setup
logging.basicConfig(level=logging.DEBUG)

# Pi Network Payment API Config
PI_API_BASE_URL = "https://api.minepi.com/v2"
PI_API_SECRET = os.getenv("PI_API_SECRET")  # Use environment variables for security

# Payment approval endpoint
@app.route('/payments/approve', methods=['POST'])
def approve_payment():
    data = request.json
    payment_id = data.get('paymentId')

    try:
        # Call Pi API to approve the payment
        response = requests.post(
            f"{PI_API_BASE_URL}/payments/approve/{payment_id}",
            headers={"Authorization": f"Bearer {PI_API_SECRET}"}
        )
        response_data = response.json()
        if response.status_code == 200:
            logging.info("Payment approved successfully.")
            return jsonify({"status": "approved", "paymentId": payment_id}), 200
        else:
            logging.error(f"Failed to approve payment: {response_data}")
            return jsonify({"error": "Failed to approve payment"}), 400
    except Exception as e:
        logging.error(f"Error approving payment: {e}")
        return jsonify({"error": "Internal server error"}), 500

# Payment completion endpoint
@app.route('/payments/complete', methods=['POST'])
def complete_payment():
    data = request.json
    payment_id = data.get('paymentId')
    txid = data.get('txid')

    try:
        # Call Pi API to complete the payment
        response = requests.post(
            f"{PI_API_BASE_URL}/payments/complete/{payment_id}",
            headers={"Authorization": f"Bearer {PI_API_SECRET}"},
            json={"txid": txid}
        )
        response_data = response.json()
        if response.status_code == 200:
            logging.info("Payment completed successfully.")
            return jsonify({"status": "completed", "paymentId": payment_id, "txid": txid}), 200
        else:
            logging.error(f"Failed to complete payment: {response_data}")
            return jsonify({"error": "Failed to complete payment"}), 400
    except Exception as e:
        logging.error(f"Error completing payment: {e}")
        return jsonify({"error": "Internal server error"}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
