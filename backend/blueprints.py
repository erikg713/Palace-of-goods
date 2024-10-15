from flask import Blueprint, jsonify
from models import Product

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/products', methods=['GET'])
def get_products():
    products = Product.objects.all()
    return jsonify([p.to_json() for p in products]), 200

@api_blueprint.route('/products', methods=['POST'])
def create_product():
    # Add logic to create a product
    pass
