from flask_mongoengine import MongoEngine

db = MongoEngine()

class Product(db.Document):
    name = db.StringField(required=True)
    price = db.FloatField(required=True)
    description = db.StringField()

