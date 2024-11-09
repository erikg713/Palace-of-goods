const CartModal = ({ isOpen, onClose, cart, removeFromCart, updateQuantity, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#cartModal');
    const firstFocusableElement = modal?.querySelectorAll(focusableElements)[0];
    const focusableContent = modal?.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) { // If Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement?.focus();
          }
        } else { // If Tab
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement?.focus();
          }
        }
      }
      if (e.key === 'Escape') onClose();
    });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="cartModal"
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      role="dialog"
    >
      {/* Rest of CartModal code */}
    </div>
  );
};
