from flask import Blueprint, jsonify, request
from models.product import Product
from flask_jwt_extended import jwt_required

marketplace_bp = Blueprint('marketplace', __name__)

@marketplace_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.objects.all()
    return jsonify(products), 200

@marketplace_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        price=data['price'],
        description=data.get('description', ''),
        stock=data.get('stock', 0)
    )
    product.save()
    return jsonify(product), 201

