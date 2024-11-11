# Palace of Goods Frontend

## Setup Instructions

1. Clone the repository and navigate to the `frontend` directory.
2. Install dependencies:
    ```
    npm install
    ```
3. Add the Pi SDK to `public/index.html`:
    ```html
    <script src="https://sdk.minepi.com/pi-sdk.js"></script>
    <script>
      Pi.init({ version: "2.0", sandbox: true });
    </script>
    ```
4. Run the React app:
    ```
    npm start
    ```

## Pages

- **Home Page** (`/`) - Displays a welcome message.
- **Product Detail Page** (`/product/:id`) - Displays product details and a button to make payments with Pi Network.

### Payment Integration with Pi SDK

To handle payments with Pi Network, the `ProductDetail` page includes the following logic:

```tsx
const handlePayment = () => {
  Pi.createPayment({
    amount: 100,
    memo: "Purchase Product",
    metadata: { productId: "123" }
  }).then((payment) => {
    payment.complete()
      .then(() => alert('Payment complete!'))
      .catch((error) => console.error("Payment failed:", error));
  });
};