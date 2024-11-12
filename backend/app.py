from mongoengine import connect, connection
import logging

try:
    db_connection = connect(host=os.getenv('DATABASE_URL', 'mongodb://localhost:27017/palace_of_goods'))
    logging.debug("Connected to MongoDB successfully.")
except connection.ConnectionError as e:
    logging.error(f"Error connecting to MongoDB: {e}")
