# backend/models/order.py

from mongoengine import Document, StringField, ListField, DecimalField

class Order(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    address = StringField(required=True)
    payment_method = StringField(required=True)
    total_price = DecimalField(required=True)
    cart_items = ListField()

    meta = {'collection': 'orders'}