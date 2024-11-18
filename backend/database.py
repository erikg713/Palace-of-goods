# backend/database.py

from mongoengine import connect

def init_db():
    connect('palace_of_goods_db', host='localhost', port=27017)