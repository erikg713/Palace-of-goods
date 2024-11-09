from flask import Blueprint, request, jsonify
from models import Product
from . import db
from sqlalchemy.exc import SQLAlchemyError
from http import HTTPStatus

product_bp = Blueprint("products", __name__)

def validate_product_data(data):
    """Validate product input data."""
    required_fields = ['name', 'description', 'price']
    
    if not all(field in data for field in required_fields):
        return False, f"Missing required fields. Required: {', '.join(required_fields)}"
        
    if not isinstance(data['price'], (int, float)) or data['price'] < 0:
        return False, "Price must be a positive number"
        
    if not isinstance(data['name'], str) or len(data['name'].strip()) == 0:
        return False, "Name must be a non-empty string"
        
    return True, None

@product_bp.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), HTTPStatus.BAD_REQUEST
            
        is_valid, error = validate_product_data(data)
        if not is_valid:
            return jsonify({"error": error}), HTTPStatus.BAD_REQUEST
            
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price']
        )
        
        db.session.add(new_product)
        db.session.commit()
        
        return jsonify({
            "message": "Product created successfully",
            "product": {
                "id": new_product.id,
                "name": new_product.name,
                "description": new_product.description,
                "price": new_product.price
            }
        }), HTTPStatus.CREATED
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error occurred"}), HTTPStatus.INTERNAL_SERVER_ERROR
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

@product_bp.route('/products', methods=['GET'])
def get_products():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        pagination = Product.query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        products = [{
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price
        } for p in pagination.items]
        
        return jsonify({
            "products": products,
            "total": pagination.total,
            "pages": pagination.pages,
            "current_page": page
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price
        })
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

@product_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), HTTPStatus.BAD_REQUEST
            
        is_valid, error = validate_product_data(data)
        if not is_valid:
            return jsonify({"error": error}), HTTPStatus.BAD_REQUEST
            
        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        
        db.session.commit()
        
        return jsonify({
            "message": "Product updated successfully",
            "product": {
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price
            }
        })
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error occurred"}), HTTPStatus.INTERNAL_SERVER_ERROR
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

@product_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({"message": "Product deleted successfully"}), HTTPStatus.NO_CONTENT
        
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error occurred"}), HTTPStatus.INTERNAL_SERVER_ERROR
    except Exception as e:
        return jsonify({"error": str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
