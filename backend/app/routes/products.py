from flask import Blueprint, request, jsonify
from app.models import Product, db

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [{"id": product.id, "name": product.name, "price": product.price, "description": product.description} for product in products]
    return jsonify(products_list), 200

@products_bp.route('/', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(name=data['name'], price=data['price'], description=data['description'])

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product created"}), 201
