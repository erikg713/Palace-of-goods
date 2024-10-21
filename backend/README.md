## 1. **Backend Structure and Code Snippets**

### Backend Directory Structure:
```
backend/
├── app.py
├── config.py
├── models.py
├── blueprints.py
├── utils.py
├── requirements.txt
├── Dockerfile
└── .env
```

### Code for Backend:

#### **`backend/app.py`** - Main Flask Application Entry Point
```python
from flask import Flask
from config import Config
from models import db
from blueprints import api_blueprint
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize database
    db.init_app(app)

    # Initialize JWT
    jwt = JWTManager(app)

    # Register blueprints
    app.register_blueprint(api_blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return {"message": "Welcome to the Palace of Goods API"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
```

#### **`backend/config.py`** - Secure Configuration
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret')
    DATABASE_URL = os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace-of-goods')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt_secret_key')
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')

    @staticmethod
    def init_app(app):
        pass
```

#### **`backend/models.py`** - MongoDB Models
```python
from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash

db = MongoEngine()

class Product(db.Document):
    name = db.StringField(required=True, max_length=200)
    price = db.FloatField(required=True)
    description = db.StringField()
    stock = db.IntField(default=0)

    def to_json(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "stock": self.stock
        }

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    password_hash = db.StringField(required=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash)

    def to_json(self):
        return {
            "id": str(self.id),
            "username": self.username,
            "email": self.email
        }
```

#### **`backend/blueprints.py`** - API Routes
```python
from flask import Blueprint, jsonify, request
from models import Product, User
from flask_jwt_extended import create_access_token, jwt_required

api_blueprint = Blueprint('api', __name__)

# Product routes
@api_blueprint.route('/products', methods=['GET'])
def get_products():
    products = Product.objects.all()
    return jsonify([p.to_json() for p in products]), 200

@api_blueprint.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    product = Product(**data).save()
    return jsonify(product.to_json()), 201

# User routes
@api_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    user.save()
    return jsonify(user.to_json()), 201

@api_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.objects(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    return jsonify({"error": "Invalid credentials"}), 401
```

#### **`backend/requirements.txt`** - Backend Dependencies
```
Flask==2.0.2
Flask-MongoEngine==0.9.5
Flask-JWT-Extended==4.3.1
python-dotenv==0.19.0
Werkzeug==2.0.2
gunicorn==20.1.0
```

#### **`backend/Dockerfile`** - Docker Setup
```Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=app.py

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:create_app()"]
```

#### **`backend/.env`** - Environment Variables
```
SECRET_KEY=mysecretkey
JWT_SECRET_KEY=myjwtsecretkey
DATABASE_URL=mongodb://mongo:27017/palace-of-goods
FLASK_ENV=production
```

---
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
```
