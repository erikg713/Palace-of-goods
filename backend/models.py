from mongoengine import Document, StringField, FloatField, IntField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    password_hash = StringField(required=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Product(Document):
    name = StringField(required=True)
    price = FloatField(required=True)
    description = StringField()
    stock = IntField(default=0)

