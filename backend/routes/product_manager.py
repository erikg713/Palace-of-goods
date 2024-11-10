from decimal import Decimal
from models import Product
import logging

logger = logging.getLogger(__name__)

class ProductManager:
    def __init__(self):
        self.products = {}

    def add_product(self, product_data: dict) -> Product:
        """Add a new product to the system."""
        try:
            product = Product(
                id=product_data['id'],
                name=product_data['name'],
                description=product_data['description'],
                price=Decimal(product_data['price']),
                stock=product_data['stock'],
                created_at=datetime.now()
            )
            self.products[product.id] = product
            logger.info(f"Added product: {product.name}")
            return product
        except KeyError as e:
            logger.error(f"Missing required product field: {e}")
            raise ValueError("Incomplete product data")
        except Exception as e:
            logger.error(f"Error adding product: {e}")
            raise RuntimeError("Error adding product")

    def get_product(self, product_id: str) -> Product:
        """Get a product by ID."""
        return self.products.get(product_id)

    def update_stock(self, product_id: str, quantity: int) -> bool:
        """Update stock quantity."""
        product = self.products.get(product_id)
        if not product:
            return False
        product.stock += quantity
        logger.info(f"Updated stock for {product.name}: {product.stock}")
        return True

    def list_products(self):
        """List all products."""
        return list(self.products.values())