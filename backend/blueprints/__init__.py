from flask import Blueprint, jsonify, current_app
from werkzeug.exceptions import HTTPException
import logging
from datetime import datetime
from functools import wraps
from typing import List, Optional, Dict, Callable

# Import blueprints
from .auth import auth_bp
from .marketplace import marketplace_bp
from .products import product_bp
from .orders import order_bp

# Create a blueprint for API utilities like health checks
api_utils_bp = Blueprint('api_utils', __name__)

class BlueprintRegisterError(Exception):
    """Custom exception for blueprint registration errors"""
    pass

def create_error_response(error: Exception) -> tuple:
    """
    Creates a standardized error response
    """
    if isinstance(error, HTTPException):
        response = {
            'error': error.name,
            'message': error.description,
            'status_code': error.code
        }
        return jsonify(response), error.code
    
    response = {
        'error': 'Internal Server Error',
        'message': str(error),
        'status_code': 500
    }
    return jsonify(response), 500

def version_prefix(version: int = 1) -> str:
    """
    Creates an API version prefix
    """
    return f'/api/v{version}'

def require_version_header(f: Callable) -> Callable:
    """
    Decorator to require API version header
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        version = current_app.config.get('API_VERSION')
        if version:
            return f(*args, **kwargs)
        return jsonify({'error': 'API version header is required'}), 400
    return decorated_function

@api_utils_bp.route('/health')
def health_check():
    """
    Basic health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': current_app.config.get('API_VERSION', '1.0.0')
    })

@api_utils_bp.route('/status')
def detailed_status():
    """
    Detailed application status endpoint
    """
    # Get registered blueprints
    blueprints = [str(rule) for rule in current_app.url_map.iter_rules()]
    
    return jsonify({
        'status': 'operational',
        'timestamp': datetime.utcnow().isoformat(),
        'version': current_app.config.get('API_VERSION', '1.0.0'),
        'environment': current_app.config.get('ENV', 'production'),
        'debug_mode': current_app.debug,
        'registered_routes': blueprints
    })

def setup_error_handlers(app):
    """
    Sets up global error handlers
    """
    @app.errorhandler(Exception)
    def handle_exception(error):
        # Log the error
        app.logger.error(f"Unhandled exception: {str(error)}", exc_info=True)
        return create_error_response(error)

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource was not found',
            'status_code': 404
        }), 404

    @app.errorhandler(405)
    def method_not_allowed_error(error):
        return jsonify({
            'error': 'Method Not Allowed',
            'message': 'The method is not allowed for the requested URL',
            'status_code': 405
        }), 405

def setup_logging(app):
    """
    Configures application logging
    """
    if not app.debug:
        # Set up file handler
        file_handler = logging.FileHandler('application.log')
        file_handler.setLevel(logging.INFO)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        app.logger.addHandler(file_handler)
        
        # Set the app logger level
        app.logger.setLevel(logging.INFO)
        app.logger.info('Application startup')

def register_blueprint_with_version(
    app,
    blueprint: Blueprint,
    url_prefix: str,
    version: int = 1,
    kwargs: Optional[Dict] = None
) -> None:
    """
    Registers a blueprint with versioning
    """
    versioned_prefix = f"{version_prefix(version)}{url_prefix}"
    try:
        app.register_blueprint(blueprint, url_prefix=versioned_prefix, **(kwargs or {}))
        app.logger.info(f"Registered blueprint {blueprint.name} at {versioned_prefix}")
    except Exception as e:
        raise BlueprintRegisterError(f"Failed to register blueprint {blueprint.name}: {str(e)}")

def register_blueprints(app, versions: Optional[List[int]] = None):
    """
    Registers all blueprints with versioning support
    
    Args:
        app: Flask application instance
        versions: List of API versions to register (defaults to [1] if None)
    """
    try:
        # Set up logging
        setup_logging(app)
        
        # Set up error handlers
        setup_error_handlers(app)
        
        # Register utility endpoints without versioning
        app.register_blueprint(api_utils_bp, url_prefix='/api')
        
        # Default to version 1 if no versions specified
        versions = versions or [1]
        
        # Blueprint configuration
        blueprints_config = [
            (auth_bp, '/auth', {'strict_slashes': False}),
            (marketplace_bp, '/marketplace', {'strict_slashes': False}),
            (product_bp, '/products', {'strict_slashes': False}),
            (order_bp, '/orders', {'strict_slashes': False})
        ]
        
        # Register each blueprint for each version
        for version in versions:
            for blueprint, url_prefix, kwargs in blueprints_config:
                register_blueprint_with_version(app, blueprint, url_prefix, version, kwargs)
        
        # Add CORS headers
        @app.after_request
        def after_request(response):
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            return response
        
        app.logger.info("Successfully registered all blueprints")
        
    except Exception as e:
        app.logger.error(f"Failed to register blueprints: {str(e)}", exc_info=True)
        raise BlueprintRegisterError(f"Blueprint registration failed: {str(e)}")

def init_app(app):
    """
    Initialize the application with all necessary configurations and blueprints
    """
    # Basic configuration
    app.config.setdefault('API_VERSION', '1.0.0')
    
    # Register blueprints
    register_blueprints(app)
    
    # Additional initialization can be added here
    app.logger.info(f"Application initialized with API version {app.config['API_VERSION']}")
