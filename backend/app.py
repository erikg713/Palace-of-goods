from flask import Flask, jsonify, request
import requests
import logging

app = Flask(__name__)
app.config['DEBUG'] = True  # Ensure debug is set

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

header = {"Authorization": "Bearer YOUR_ACCESS_TOKEN"}  # Replace with actual token

@app.route('/payment/complete', methods=['POST'])
def complete_payment():
    payment_id = request.json.get('paymentId')
    txid = request.json.get('txid')

    if not payment_id or not txid:
        return jsonify({"error": "Missing paymentId or txid"}), 400

    complete_url = f"https://api.minepi.com/v2/payments/{payment_id}/complete"
    data = {'txid': txid}

    try:
        response = requests.post(complete_url, headers=header, json=data)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        logger.error(f"Error completing payment: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/payment/cancel', methods=['POST'])
def cancel_payment():
    payment_id = request.json.get('paymentId')

    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    cancel_url = f"https://api.minepi.com/v2/payments/{payment_id}/cancel"

    try:
        response = requests.post(cancel_url, headers=header)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        logger.error(f"Error cancelling payment: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/payment/error', methods=['POST'])
def report_payment_error():
    payment_id = request.json.get('paymentId')
    error = request.json.get('error')

    if not payment_id:
        return jsonify({"error": "Missing paymentId"}), 400

    logger.error(f"Error with payment {payment_id}: {error}")
    return jsonify({"status": "error logged"}), 200

# Run the app with safe debug mode
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
