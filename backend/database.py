from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize the Flask app and the database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'  # Use your DB URI (SQLite for simplicity here)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with a secure key

# Initialize the database object
db = SQLAlchemy(app)

# A helper function for handling DB sessions
def db_session():
    return db.session