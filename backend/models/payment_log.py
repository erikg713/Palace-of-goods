from datetime import datetime
from database import db

class PaymentLog(db.Model):
    __tablename__ = 'payment_logs'  # Define table name

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    payment_id = db.Column(db.String(100), nullable=False)
    txid = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(50), nullable=False)  # Example: initiated, completed, failed
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    # Define relationship with the Order model
    order = db.relationship('Order', back_populates='payment_logs')

    def __init__(self, order_id, payment_id, status, txid=None):
        self.order_id = order_id
        self.payment_id = payment_id
        self.status = status
        self.txid = txid

    def __repr__(self):
        return f"<PaymentLog {self.id}>"

# Add the relationship to the Order model
Order.payment_logs = db.relationship('PaymentLog', back_populates='order', cascade="all, delete-orphan")