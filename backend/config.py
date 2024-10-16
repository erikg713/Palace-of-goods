import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    DATABASE_URL = os.getenv('DATABASE_URL')
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')

    @staticmethod
    def init_app(app):
        pass
