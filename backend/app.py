import os
import logging
from flask import Flask
from flask_login import LoginManager
from mongoengine import connect, DoesNotExist
from blueprints.auth import auth_bp
from blueprints.marketplace import marketplace_bp
from blueprints import register_blueprints

# Initialize the app
app = Flask(__name__)

# Register blueprints
register_blueprints(app)

# Initialize the Flask app
app = Flask(__name__)

# Load configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = app.config['FLASK_ENV'] == 'development'
app.config['MONGO_URI'] = os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace_of_goods')

# Logging setup (differentiating between development and production)
logging_level = logging.DEBUG if app.config['DEBUG'] else logging.WARNING
logging.basicConfig(level=logging_level)
logger = logging.getLogger(__name__)

# Connect to MongoDB with error handling
try:
    connect(host=app.config['MONGO_URI'])
    logger.info("Connected to MongoDB successfully!")
except Exception as e:
    logger.error(f"Error connecting to MongoDB: {e}")
    raise

# Set up Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# Import user model after database connection
from models.user import User

@login_manager.user_loader
def load_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except DoesNotExist:
        logger.error(f"User with ID {user_id} does not exist.")
        return None

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(marketplace_bp, url_prefix='/marketplace')

# Run the app with safe debug mode
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
Python
header = {
    'Authorization': "Key YOUR-API-KEY"
}
Python
@app.route('/payment/approve', methods=['POST'])
def approve():
    # Build the header for user authentication
    accessToken = request.form.get('accessToken')
    userheader = {
        'Authorization': f"Bearer {accessToken}"
    }
    paymentId = request.form.get('paymentId')
    approveurl = f"https://api.minepi.com/v2/payments/{paymentId}/approve"
    response = requests.post(approveurl, headers=header)
    userurl = "https://api.minepi.com/v2/me"
    userresponse = requests.get(userurl, headers=userheader)
    userjson = json.loads(userresponse.text)
    return(response.text)

@app.route('/payment/complete', methods=['POST'])
def complete():   
    # Build the header for user authentication
    accessToken = request.form.get('accessToken')
    userheader = {
        'Authorization': f"Bearer {accessToken}"
    }
    paymentId = request.form.get('paymentId')
    txid = request.form.get('txid')
    userurl = "https://api.minepi.com/v2/me"
    userresponse = requests.get(userurl, headers=userheader)
    data = {'txid': txid}
    approveurl = f"https://api.minepi.com/v2/payments/{paymentId}/complete"
    response = requests.post(approveurl, headers=header, data=data)
    return(response.text)

@app.route('/payment/cancel', methods=['POST'])
def cancel():    
    paymentId = request.form.get('paymentId')
    approveurl = f"https://api.minepi.com/v2/payments/{paymentId}/cancel"
    response = requests.post(approveurl, headers=header)
    return(response.text)

@app.route('/payment/error', methods=['POST'])
def error():    
    paymentId = request.form.get('paymentId')
    approveurl = f"https://api.minepi.com/v2/payments/{paymentId}/cancel"
    response = requests.post(approveurl, headers=header)
    return(response.text)

@app.route('/me', methods=['POST'])
def getme():
    userurl = "https://api.minepi.com/v2/me"
    response = requests.post(userurl, headers=header)
    return(response.text)
