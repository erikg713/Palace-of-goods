import os
import logging
from flask import Flask, request, jsonify
from flask_login import LoginManager
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

PI_API_KEY = os.getenv("PI_API_KEY", "your_pi_api_key")
header = {
    'Authorization': f"Key {PI_API_KEY}"
}

@app.route('/payment/approve', methods=['POST'])
def approve_payment():
    payment_id = request.json.get('paymentId')
    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    approve_url = f"https://api.minepi.com/v2/payments/{payment_id}/approve"
    try:
        response = requests.post(approve_url, headers=header)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/payment/complete', methods=['POST'])
def complete_payment():
    payment_id = request.json.get('paymentId')
    txid = request.json.get('txid')
    if not payment_id or not txid:
        return jsonify({"error": "Missing paymentId or txid"}), 400

    complete_url = f"https://api.minepi.com/v2/payments/{payment_id}/complete"
    data = {'txid': txid}
    try:
        response = requests.post(complete_url, headers=header, json=data)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/payment/cancel', methods=['POST'])
def cancel_payment():
    payment_id = request.json.get('paymentId')
    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    cancel_url = f"https://api.minepi.com/v2/payments/{payment_id}/cancel"
    try:
        response = requests.post(cancel_url, headers=header)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/payment/error', methods=['POST'])
def report_payment_error():
    payment_id = request.json.get('paymentId')
    error = request.json.get('error')
    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    print(f"Error with payment {payment_id}: {error}")
    return jsonify({"status": "error logged"}), 200

from mongoengine import connect, DoesNotExist
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp
from blueprints import register_blueprints
import requests
from models.user import User

# Initialize the app
app = Flask(__name__)

# Load configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = app.config['FLASK_ENV'] == 'development'
app.config['MONGO_URI'] = os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace_of_goods')
app.config['PI_API_KEY'] = os.getenv('PI_API_KEY', 'your_pi_api_key')

# Logging setup
logging_level = logging.DEBUG if app.config['DEBUG'] else logging.WARNING
logging.basicConfig(level=logging_level)
logger = logging.getLogger(__name__)

# Connect to MongoDB with error handling
try:
    connect(host=app.config['MONGO_URI'])
    logger.info("Connected to MongoDB successfully!")
except Exception as e:
    logger.error(f"Error connecting to MongoDB: {e}")
    raise

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except DoesNotExist:
        logger.error(f"User with ID {user_id} does not exist.")
        return None

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Payment Header for Pi API
header = {
    'Authorization': f"Key {app.config['PI_API_KEY']}"
}

# Payment Routes

@app.route('/payment/approve', methods=['POST'])
def approve():
    accessToken = request.form.get('accessToken')
    paymentId = request.form.get('paymentId')

    if not accessToken or not paymentId:
        return jsonify({"error": "accessToken and paymentId are required"}), 400

    user_header = {'Authorization': f"B
