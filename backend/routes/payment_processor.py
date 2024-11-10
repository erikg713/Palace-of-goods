import logging
from datetime import datetime
from decimal import Decimal
from models import PaymentOperation

logger = logging.getLogger(__name__)

class PaymentProcessor:
    def __init__(self, merchant_account: str):
        self.payment_history = {}
        self.merchant_account = merchant_account

    def process_payment(self, payment_data: dict) -> PaymentOperation:
        """Process a payment operation."""
        try:
            payment = PaymentOperation(
                id=payment_data['id'],
                paging_token=payment_data['paging_token'],
                transaction_successful=payment_data['transaction_successful'],
                source_account=payment_data['source_account'],
                transaction_hash=payment_data['transaction_hash'],
                asset_type=payment_data['asset_type'],
                from_account=payment_data['from'],
                to_account=payment_data['to'],
                to_muxed=payment_data.get('to_muxed'),
                to_muxed_id=payment_data.get('to_muxed_id'),
                amount=Decimal(payment_data['amount']),
                created_at=datetime.strptime(payment_data['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            )

            if payment.transaction_successful and payment.to_account == self.merchant_account:
                self.payment_history[payment.id] = payment
                logger.info(f"Payment processed: {payment.amount} from {payment.from_account} to {payment.to_account}")
            else:
                logger.warning(f"Payment failed or incorrect account: {payment.id}")
            return payment
        except KeyError as e:
            logger.error(f"Missing field in payment data: {e}")
            raise ValueError("Incomplete payment data")
        except Exception as e:
            logger.error(f"Error processing payment: {e}")
            raise RuntimeError("Payment processing error")