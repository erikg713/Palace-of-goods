from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React frontend to communicate with Flask

@app.route('/create_account', methods=['POST'])
def create_account():
    data = request.get_json()
    wallet_address = data.get('wallet_address')

    if not wallet_address:
        return jsonify({"error": "Wallet address is required!"}), 400

    # Simulate account creation (you could save to a database here)
    return jsonify({"message": "Account created successfully!"}), 200

if __name__ == "__main__":
    app.run(debug=True)