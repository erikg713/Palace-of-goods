from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from datetime import datetime, timedelta
import re
from functools import wraps
from models.user import User
from models.token_blocklist import TokenBlocklist
import logging
from http import HTTPStatus

auth_bp = Blueprint('auth', __name__)

# Configure logger
logger = logging.getLogger(__name__)

class AuthError(Exception):
    """Custom exception for authentication errors"""
    def __init__(self, message, code=400):
        self.message = message
        self.code = code

def validate_password_strength(password: str) -> tuple[bool, str]:
    """
    Validate password strength
    Returns: (is_valid, error_message)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r"\d", password):
        return False, "Password must contain at least one number"
    
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character"
    
    return True, ""

def validate_email(email: str) -> tuple[bool, str]:
    """
    Validate email format
    Returns: (is_valid, error_message)
    """
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        return False, "Invalid email format"
    return True, ""

def rate_limit(limit: int, window: int):
    """
    Rate limiting decorator
    """
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            key = f"rate_limit:{request.remote_addr}:{f.__name__}"
            try:
                # Implement rate limiting using Redis or similar
                # This is a placeholder for the actual implementation
                return f(*args, **kwargs)
            except Exception as e:
                logger.error(f"Rate limit error: {str(e)}")
                return jsonify({"error": "Too many requests"}), HTTPStatus.TOO_MANY_REQUESTS
        return wrapped
    return decorator

def log_auth_event(event_type: str, user_id: str = None, success: bool = True, details: str = None):
    """
    Log authentication events
    """
    event = {
        "event_type": event_type,
        "timestamp": datetime.utcnow(),
        "user_id": user_id,
        "ip_address": request.remote_addr,
        "user_agent": request.headers.get("User-Agent"),
        "success": success,
        "details": details
    }
    logger.info(f"Auth event: {event}")

@auth_bp.errorhandler(AuthError)
def handle_auth_error(error):
    """
    Handle authentication errors
    """
    response = {"error": error.message}
    return jsonify(response), error.code

@auth_bp.route('/register', methods=['POST'])
@rate_limit(limit=5, window=300)  # 5 attempts per 5 minutes
def register():
    try:
        data = request.get_json()
        if not data:
            raise AuthError("No data provided")

        # Extract and validate required fields
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')

        # Validate input
        if not all([username, email, password]):
            raise AuthError("Missing required fields")

        # Validate email format
        is_valid_email, email_error = validate_email(email)
        if not is_valid_email:
            raise AuthError(email_error)

        # Validate password strength
        is_valid_password, password_error = validate_password_strength(password)
        if not is_valid_password:
            raise AuthError(password_error)

        # Check for existing user
        if User.objects(username=username).first():
            raise AuthError("Username already exists", HTTPStatus.CONFLICT)
        
        if User.objects(email=email).first():
            raise AuthError("Email already registered", HTTPStatus.CONFLICT)

        # Create user
        user = User(
            username=username,
            email=email,
            registered_at=datetime.utcnow(),
            last_login=None,
            is_active=True,
            failed_login_attempts=0
        )
        user.set_password(password)
        user.save()

        log_auth_event("register", str(user.id), True)

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": str(user.id),
                "username": user.username,
                "email": user.email
            }
        }), HTTPStatus.CREATED

    except AuthError as e:
        log_auth_event("register", None, False, str(e))
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({"error": "Internal server error"}), HTTPStatus.INTERNAL_SERVER_ERROR

@auth_bp.route('/login', methods=['POST'])
@rate_limit(limit=5, window=300)  # 5 attempts per 5 minutes
def login():
    try:
        data = request.get_json()
        if not data:
            raise AuthError("No data provided")

        username = data.get('username', '').strip()
        password = data.get('password', '')

        if not all([username, password]):
            raise AuthError("Missing required fields")

        user = User.objects(username=username).first()
        if not user:
            raise AuthError("Invalid credentials", HTTPStatus.UNAUTHORIZED)

        if not user.is_active:
            raise AuthError("Account is disabled", HTTPStatus.FORBIDDEN)

        if user.is_locked():
            raise AuthError(
                f"Account is locked. Try again in {user.get_lockout_time()} minutes", 
                HTTPStatus.FORBIDDEN
            )

        if not user.check_password(password):
            user.increment_failed_attempts()
            user.save()
            log_auth_event("login_failed", str(user.id), False, "Invalid password")
            raise AuthError("Invalid credentials", HTTPStatus.UNAUTHORIZED)

        # Reset failed attempts on successful login
        user.failed_login_attempts = 0
        user.last_login = datetime.utcnow()
        user.save()

        # Create tokens
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={"username": user.username}
        )
        refresh_token = create_refresh_token(identity=str(user.id))

        log_auth_event("login_success", str(user.id), True)

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": str(user.id),
                "username": user.username,
                "email": user.email
            }
        }), HTTPStatus.OK

    except AuthError as e:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Internal server error"}), HTTPStatus.INTERNAL_SERVER_ERROR

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """
    Refresh access token using refresh token
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.objects(id=current_user_id).first()
        
        if not user or not user.is_active:
            raise AuthError("Invalid user", HTTPStatus.UNAUTHORIZED)

        access_token = create_access_token(
            identity=current_user_id,
            additional_claims={"username": user.username}
        )

        log_auth_event("token_refresh", current_user_id, True)

        return jsonify({"access_token": access_token}), HTTPStatus.OK

    except Exception as e:
        logger.error(f"Token refresh error: {str(e)}")
        return jsonify({"error": "Token refresh failed"}), HTTPStatus.UNAUTHORIZED

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Logout user and invalidate tokens
    """
    try:
        jti = get_jwt()["jti"]
        now = datetime.utcnow()
        
        # Add token to blocklist
        TokenBlocklist(jti=jti, created_at=now).save()
        
        user_id = get_jwt_identity()
        log_auth_event("logout", user_id, True)

        return jsonify({"message": "Successfully logged out"}), HTTPStatus.OK

    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return jsonify({"error": "Logout failed"}), HTTPStatus.INTERNAL_SERVER_ERROR

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_info():
    """
    Get current user information
    """
    try:
        current_user_id = get_jwt_identity()
        user = User.objects(id=current_user_id).first()
        
        if not user:
            raise AuthError("User not found", HTTPStatus.NOT_FOUND)

        return jsonify({
            "user": {
                "id": str(user.id),
                "username": user.username,
                "email": user.email,
                "registered_at": user.registered_at.isoformat(),
                "last_login": user.last_login.isoformat() if user.last_login else None,
                "is_active": user.is_active
            }
        }), HTTPStatus.OK

    except AuthError as e:
        raise
    except Exception as e:
        logger.error(f"Get user info error: {str(e)}")
        return jsonify({"error": "Internal server error"}), HTTPStatus.INTERNAL_SERVER_ERROR

@auth_bp.route('/password/change', methods=['POST'])
@jwt_required()
def change_password():
    """
    Change user password
    """
    try:
        data = request.get_json()
        if not data:
            raise AuthError("No data provided")

        current_password = data.get('current_password')
        new_password = data.get('new_password')

        if not all([current_password, new_password]):
            raise AuthError("Missing required fields")

        current_user_id = get_jwt_identity()
        user = User.objects(id=current_user_id).first()

        if not user:
            raise AuthError("User not found", HTTPStatus.NOT_FOUND)

        if not user.check_password(current_password):
            raise AuthError("Current password is incorrect", HTTPStatus.UNAUTHORIZED)

        # Validate new password
        is_valid_password, password_error = validate_password_strength(new_password)
        if not is_valid_password:
            raise AuthError(password_error)

        user.set_password(new_password)
        user.save()

        log_auth_event("password_change", str(user.id), True)

        return jsonify({"message": "Password changed successfully"}), HTTPStatus.OK

    except AuthError as e:
        raise
    except Exception as e:
        logger.error(f"Password change error: {str(e)}")
        return jsonify({"error": "Internal server error"}), HTTPStatus.INTERNAL_SERVER_ERROR
