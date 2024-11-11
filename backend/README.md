# Palace of Goods Backend

## Setup Instructions

1. Clone the repository and navigate to the `backend` directory.
2. Create a virtual environment and activate it:
    ```
    python3 -m venv env
    source env/bin/activate
    ```
3. Install dependencies:
    ```
    pip install -r requirements.txt
    ```
4. Set environment variables in the `.env` file.
5. Run the Flask app:
    ```
    python main.py
    ```

## API Endpoints

- POST /auth/register - Register a new user
- POST /auth/login - Login with username and password
- GET /products - Get all products
- GET /products/<id> - Get product details by ID
- POST /products -