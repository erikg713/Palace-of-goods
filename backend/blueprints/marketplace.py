from flask import Blueprint, jsonify, request
from models.product import Product
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import Schema, fields, ValidationError
from http import HTTPStatus

marketplace_bp = Blueprint('marketplace', __name__)

class ProductSchema(Schema):
    """Schema for validating product data"""
    name = fields.Str(required=True, error_messages={"required": "Product name is required"})
    price = fields.Float(required=True, validate=lambda p: p >= 0, 
                        error_messages={"required": "Price is required", "validator_failed": "Price must be non-negative"})
    description = fields.Str(required=False, missing="")
    stock = fields.Int(required=False, validate=lambda s: s >= 0, missing=0,
                      error_messages={"validator_failed": "Stock must be non-negative"})

product_schema = ProductSchema()

def handle_validation_error(error):
    """Utility function to format validation errors"""
    return jsonify({
        "error": "Validation error",
        "messages": error.messages
    }), HTTPStatus.BAD_REQUEST

@marketplace_bp.route('/products', methods=['GET'])
def get_products():
    """
    Retrieve all products with optional filtering
    
    Query Parameters:
        - min_price: Minimum price filter
        - max_price: Maximum price filter
        - in_stock: Filter for products in stock (true/false)
    """
    try:
        query = Product.objects

        # Apply filters if provided
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        in_stock = request.args.get('in_stock', type=str)

        if min_price is not None:
            query = query.filter(price__gte=min_price)
        if max_price is not None:
            query = query.filter(price__lte=max_price)
        if in_stock and in_stock.lower() == 'true':
            query = query.filter(stock__gt=0)

        products = query.all()
        return jsonify({
            "status": "success",
            "count": len(products),
            "products": products
        }), HTTPStatus.OK

    except Exception as e:
        return jsonify({
            "error": "Failed to retrieve products",
            "message": str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@marketplace_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    """Create a new product"""
    try:
        # Validate request data
        data = request.get_json()
        if not data:
            return jsonify({
                "error": "No data provided"
            }), HTTPStatus.BAD_REQUEST

        # Validate against schema
        validated_data = product_schema.load(data)
        
        # Create product
        product = Product(
            name=validated_data['name'],
            price=validated_data['price'],
            description=validated_data['description'],
            stock=validated_data['stock'],
            created_by=get_jwt_identity()  # Track who created the product
        )
        product.save()

        return jsonify({
            "status": "success",
            "message": "Product created successfully",
            "product": product
        }), HTTPStatus.CREATED

    except ValidationError as e:
        return handle_validation_error(e)
    
    except Exception as e:
        return jsonify({
            "error": "Failed to create product",
            "message": str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@marketplace_bp.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieve a specific product by ID"""
    try:
        product = Product.objects.get(id=product_id)
        return jsonify({
            "status": "success",
            "product": product
        }), HTTPStatus.OK

    except Product.DoesNotExist:
        return jsonify({
            "error": "Product not found"
        }), HTTPStatus.NOT_FOUND
    
    except Exception as e:
        return jsonify({
            "error": "Failed to retrieve product",
            "message": str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@marketplace_bp.route('/products/<product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    """Update a specific product"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "error": "No data provided"
            }), HTTPStatus.BAD_REQUEST

        # Validate data
        validated_data = product_schema.load(data, partial=True)
        
        # Update product
        product = Product.objects.get(id=product_id)
        for key, value in validated_data.items():
            setattr(product, key, value)
        
        product.save()

        return jsonify({
            "status": "success",
            "message": "Product updated successfully",
            "product": product
        }), HTTPStatus.OK

    except Product.DoesNotExist:
        return jsonify({
            "error": "Product not found"
        }), HTTPStatus.NOT_FOUND

    except ValidationError as e:
        return handle_validation_error(e)
    
    except Exception as e:
        return jsonify({
            "error": "Failed to update product",
            "message": str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@marketplace_bp.route('/products/<product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    """Delete a specific product"""
    try:
        product = Product.objects.get(id=product_id)
        product.delete()

        return jsonify({
            "status": "success",
            "message": "Product deleted successfully"
        }), HTTPStatus.OK

    except Product.DoesNotExist:
        return jsonify({
            "error": "Product not found"
        }), HTTPStatus.NOT_FOUND
    
    except Exception as e:
        return jsonify({
            "error": "Failed to delete product",
            "message": str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR
