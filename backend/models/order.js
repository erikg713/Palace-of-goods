
# backend/models/order.py
from datetime import datetime
from database import db

class Order(db.Model):
    __tablename__ = 'orders'  # Define table name

    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(100), nullable=False)
    customer_address = db.Column(db.String(255), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # Example: Pi, Credit Card, etc.
    payment_status = db.Column(db.String(50), nullable=False)  # Example: pending, approved, completed, canceled, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, customer_name, customer_email, customer_address, total_price, payment_method, payment_status):
        self.customer_name = customer_name
        self.customer_email = customer_email
        self.customer_address = customer_address
        self.total_price = total_price
        self.payment_method = payment_method
        self.payment_status = payment_status

    def __repr__(self):
        return f"<Order {self.id}>"
from mongoengine import Document, StringField, ListField, DecimalField

class Order(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    address = StringField(required=True)
    payment_method = StringField(required=True)
    total_price = DecimalField(required=True)
    cart_items = ListField()

    meta = {'collection': 'orders'}