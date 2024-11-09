from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# Register Blueprints
from routes.auth import auth_bp
from routes.products import product_bp
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(product_bp, url_prefix="/")

# Initialize Database
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
