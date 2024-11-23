from flask import Flask, jsonify, request
from flask_cors import CORS
from models.order import Order
from database import db_session
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to make API calls

@app.route('/api/submit-order', methods=['POST'])
def submit_order():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    # Extract data from the request
    customer_info = data.get('customerInfo')
    cart_items = data.get('cartItems')
    total_price = data.get('totalPrice')
    payment_method = data.get('paymentMethod')

    if not all([customer_info, cart_items, total_price, payment_method]):
        return jsonify({"error": "Missing required fields"}), 400

    # Create a new Order instance (model)
    order = Order(
        name=customer_info['name'],
        email=customer_info['email'],
        address=customer_info['address'],
        payment_method=payment_method,
        total_price=total_price,
        cart_items=cart_items,
    )

    # Save to the database
    db_session.add(order)
    db_session.commit()

    return jsonify({"message": "Order submitted successfully!", "orderId": order.id}), 200

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
    app.run(debug=debug_mode)
