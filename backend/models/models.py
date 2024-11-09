from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
from . import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password = db.Column('password', db.String(200), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    orders = db.relationship('Order', backref='user', lazy='dynamic')
    
    @hybrid_property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, plain_text_password):
        self._password = generate_password_hash(plain_text_password)
    
    def check_password(self, plain_text_password):
        return check_password_hash(self._password, plain_text_password)
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    sku = db.Column(db.String(50), unique=True)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    orders = db.relationship('Order', backref='product', lazy='dynamic')
    
    @hybrid_property
    def in_stock(self):
        return self.stock > 0
    
    def decrease_stock(self, quantity):
        if self.stock >= quantity:
            self.stock -= quantity
            return True
        return False
    
    def increase_stock(self, quantity):
        self.stock += quantity
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'stock': self.stock,
            'sku': self.sku,
            'is_available': self.is_available,
            'in_stock': self.in_stock,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    status = db.Column(db.String(20), default="pending")
    total_price = db.Column(db.Float, nullable=False)
    shipping_address = db.Column(db.Text)
    tracking_number = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
    
    def __init__(self, **kwargs):
        super(Order, self).__init__(**kwargs)
        if self.product:
            self.total_price = self.product.price * self.quantity
    
    @hybrid_property
    def is_cancelled(self):
        return self.status == 'cancelled'
    
    @hybrid_property
    def is_completed(self):
        return self.status == 'delivered'
    
    def update_status(self, new_status):
        if new_status not in self.ORDER_STATUSES:
            raise ValueError(f"Invalid status. Must be one of: {', '.join(self.ORDER_STATUSES)}")
        self.status = new_status
    
    def cancel(self):
        if self.status not in ['delivered', 'cancelled']:
            self.status = 'cancelled'
            if self.product:
                self.product.increase_stock(self.quantity)
            return True
        return False
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'status': self.status,
            'total_price': self.total_price,
            'shipping_address': self.shipping_address,
            'tracking_number': self.tracking_number,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'product': self.product.to_dict() if self.product else None,
            'user': self.user.to_dict() if self.user else None
        }
