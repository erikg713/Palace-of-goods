import logging
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import User
from . import db
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Initialize the blueprint and optional rate limiter
auth_bp = Blueprint("auth", __name__)
limiter = Limiter(key_func=get_remote_address)

# Minimum password length
MIN_PASSWORD_LENGTH = 8

# Configure logging
logging.basicConfig(level=logging.INFO)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check for required fields
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Username and password are required"}), 400

    # Check for existing user
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 409

    # Password validation
    if len(data['password']) < MIN_PASSWORD_LENGTH:
        return jsonify({"message": f"Password must be at least {MIN_PASSWORD_LENGTH} characters long"}), 400

    # Hash the password and create a new user
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        logging.info(f"User {data['username']} registered successfully.")
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Registration failed for user {data['username']}: {str(e)}")
        return jsonify({"message": "Registration failed", "error": "Internal server error"}), 500

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("5 per minute")  # Rate limit to prevent brute force attacks
def login():
    data = request.get_json()

    # Check for required fields
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Username and password are required"}), 400

    user = User.query.filter_by(username=data['username']).first()

    # Validate user credentials
    if user and check_password_hash(user.password, data['password']):
        # Create access token
        access_token = create_access_token(identity={'username': user.username})
        logging.info(f"User {data['username']} logged in successfully.")
        return jsonify(access_token=access_token), 200

    # Log failed login attempts
    logging.warning(f"Failed login attempt for user {data['username']}")
    return jsonify({"message": "Invalid credentials"}), 401
