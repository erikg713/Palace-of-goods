from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models.order import Order
from models.payment_log import PaymentLog
from models.payment_request import PaymentRequest
from database import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'  # Change this to your DB URI
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with your secret key
db.init_app(app)
jwt = JWTManager(app)

# 1. Handle Payment Approval
@app.route('/payment/approve', methods=['POST'])
@jwt_required()  # Secures the endpoint with JWT
def approve_payment():
    data = request.get_json()
    payment_id = data.get('paymentId')
    access_token = data.get('accessToken')  # This should be securely handled in production

    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    # Find the order using the payment_id
    order = Order.query.filter_by(id=payment_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.payment_status = 'approved'
    db.session.commit()

    # Log the payment approval
    payment_log = PaymentLog(order_id=order.id, payment_id=payment_id, status="approved")
    db.session.add(payment_log)
    db.session.commit()

    return jsonify({"message": "Payment approved successfully", "orderId": order.id}), 200

# 2. Handle Payment Completion
@app.route('/payment/complete', methods=['POST'])
@jwt_required()  # Secures the endpoint with JWT
def complete_payment():
    data = request.get_json()
    payment_id = data.get('paymentId')
    txid = data.get('txid')

    if not payment_id or not txid:
        return jsonify({"error": "Missing paymentId or txid"}), 400

    order = Order.query.filter_by(id=payment_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.payment_status = 'completed'
    db.session.commit()

    # Log the payment completion
    payment_log = PaymentLog(order_id=order.id, payment_id=payment_id, status="completed", txid=txid)
    db.session.add(payment_log)
    db.session.commit()

    return jsonify({"message": "Payment completed successfully", "orderId": order.id}), 200

# 3. Handle Payment Cancellation
@app.route('/payment/cancel', methods=['POST'])
@jwt_required()  # Secures the endpoint with JWT
def cancel_payment():
    data = request.get_json()
    payment_id = data.get('paymentId')

    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    order = Order.query.filter_by(id=payment_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.payment_status = 'canceled'
    db.session.commit()

    # Log the payment cancellation
    payment_log = PaymentLog(order_id=order.id, payment_id=payment_id, status="canceled")
    db.session.add(payment_log)
    db.session.commit()

    return jsonify({"message": "Payment canceled successfully", "orderId": order.id}), 200

# 4. Handle Payment Errors
@app.route('/payment/error', methods=['POST'])
@jwt_required()  # Secures the endpoint with JWT
def payment_error():
    data = request.get_json()
    payment_id = data.get('paymentId')

    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    order = Order.query.filter_by(id=payment_id).first()
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.payment_status = 'error'
    db.session.commit()

    # Log the payment error
    payment_log = PaymentLog(order_id=order.id, payment_id=payment_id, status="error")
    db.session.add(payment_log)
    db.session.commit()

    return jsonify({"message": "Payment error reported", "orderId": order.id}), 200

# 5. Handle Incomplete Payments
@app.route('/payment/incomplete', methods=['POST'])
@jwt_required()  # Secures the endpoint with JWT
def incomplete_payment():
    data = request.get_json()
    payment_id = data.get('paymentId')
    txid = data.get('txid')

    if not payment_id or not txid:
        returnimport os
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
