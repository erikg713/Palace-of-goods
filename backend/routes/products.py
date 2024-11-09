from flask import Blueprint, request, jsonify
from models import Product
from . import db

product_bp = Blueprint("products", __name__)

@product_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(name=data['name'], description=data['description'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product created successfully"})

@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{"id": p.id, "name": p.name, "description": p.description, "price": p.price} for p in products])
