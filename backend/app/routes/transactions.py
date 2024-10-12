from flask import Blueprint, request, jsonify
from app.models import Transaction, db

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    transactions_list = [{"id": transaction.id, "user_id": transaction.user_id, "product_id": transaction.product_id, "status": transaction.status} for transaction in transactions]
    return jsonify(transactions_list), 200

@transactions_bp.route('/', methods=['POST'])
def create_transaction():
    data = request.get_json()
    new_transaction = Transaction(user_id=data['user_id'], product_id=data['product_id'], status=data['status'])

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Transaction created"}), 201


