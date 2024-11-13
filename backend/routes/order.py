# order.py (continued)
from utils import validate_items

class OrderManager:
    # ... (existing code)

    def create_order(self, user, items, currency="USD"):
        validate_items(items)  # DRY: we validate items once, here.
        total_amount = sum(item['price'] for item in items)
        self.payment_processor.process_payment(total_amount, currency)
        print(f"Order created for user {user} with total: {total_amount} {currency}")
