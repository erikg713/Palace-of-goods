# Palace of Goods Backend # (FLASK)

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
## File Structure

project-root/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   ├── db.js
│   │   └── stripe.js
│   ├── .env
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ProductList.js
│   │   │   ├── Checkout.js
│   │   │   └── OrderList.js
│   │   ├── App.js
│   │   └── index.js
├── README.md
└── package.json

## API Endpoints

- POST /auth/register - Register a new user
- POST /auth/login - Login with username and password
- GET /products - Get all products
- GET /products/<id> - Get product details by ID
- `POST /auth/register` - Register a new user
  - Request body: `{ "username": "username", "password": "password" }`
  - Response: `{ "message": "User registered" }`

- `POST /auth/login` - Login with username and password
  - Request body: `{ "username": "username", "password": "password" }`
  - Response: `{ "access_token": "jwt_token" }`

- `GET /products` - Get a list of all products
  - Response: 
    ```json
    [
      { "id": 1, "name": "Product1", "description": "Description", "price": 100.0 },
      { "id": 2, "name": "Product2", "description": "Description", "price": 150.0 }
    ]
    ```

- `GET /products/<id>` - Get product details by ID
  - Response: 
    ```json
    { "id": 1, "name": "Product1", "description": "Description", "price": 100.0 }
    ```

- `POST /products` - Add a new product
  - Request body: `{ "name": "Product name", "description": "Description", "price": 100.0 }`
  - Response: `{ "message": "Product added successfully" }`

npm install bcryptjs jsonwebtoken
