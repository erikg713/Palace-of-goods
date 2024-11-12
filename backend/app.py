import os
import requests
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
app.config.from_pyfile('.env')

# Initialize MongoDB
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Collection for storing transactions
transactions = mongo.db.transactions

# Pi Network Payment Verification Route
@app.route('/verify-payment', methods=['POST'])
def verify_payment():
    data = request.json
    transaction_hash = data.get('transaction_hash')
    
    if not transaction_hash:
        raise BadRequest("Transaction hash is required")

    # Pi Network API to fetch transaction details
    api_url = f"https://api.testnet.minepi.com/transactions/{transaction_hash}"
    headers = {
        "Authorization": f"Bearer {os.getenv('PI_API_KEY')}"
    }

    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses
        transaction_data = response.json()

        if transaction_data.get('transaction_successful'):
            # Save transaction details in MongoDB
            transaction = {
                "transaction_hash": transaction_data['transaction_hash'],
                "source_account": transaction_data['source_account'],
                "recipient_address": transaction_data['to'],
                "amount": float(transaction_data['amount']),
                "status": "successful",
            }

            result = transactions.insert_one(transaction)

            return jsonify({
                "message": "Payment verified successfully",
                "transaction_id": str(result.inserted_id)
            }), 200
        else:
            return jsonify({"error": "Payment not successful"}), 400

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
