from flask import Blueprint

# Import blueprints from different modules
from .auth import auth_bp
from .marketplace import marketplace_bp

# Initialize the blueprint at the package level so they can be used across the app
def register_blueprints(app):
    """
    Registers all blueprints with the Flask app.
    """
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

