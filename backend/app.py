from flask import Flask
from config import Config
from models import db
from blueprints import api_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize the database
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(api_blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return {"message": "Welcome to the Palace of Goods API"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
