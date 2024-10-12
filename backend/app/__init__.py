from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Load configuration from config.py
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    JWTManager(app)

    # Register Blueprints
    from .routes.auth import auth_bp
    from .routes.products import products_bp
    from .routes.transactions import transactions_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')

    return app
