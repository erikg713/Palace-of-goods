from database import db

class PaymentRequest(db.Model):
    __tablename__ = 'payment_requests'  # Define table name

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    memo = db.Column(db.String(255), nullable=True)
    item_id = db.Column(db.String(100), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # Pi, Credit Card, etc.
    payment_status = db.Column(db.String(50), default='pending')  # Example: pending, approved, completed, canceled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, amount, memo, item_id, payment_method):
        self.amount = amount
        self.memo = memo
        self.item_id = item_id
        self.payment_method = payment_method

    def __repr__(self):
        return f"<PaymentRequest {self.id}>"