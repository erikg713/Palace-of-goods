// Initialize Pi SDK
document.addEventListener("DOMContentLoaded", () => {
  if (window.Pi) {
    Pi.init({
      version: "2.0",
      sandbox: true, // Set to false in production
      appId: "your_pi_network_sdk_key"  // Replace with your Pi Network SDK app ID
    });
  } else {
    console.error("Pi SDK not loaded.");
  }
});

const Pi = window.Pi;
let paymentId;
let accessToken = "user_access_token";  // Secure token management should be used in production

// Create a payment with the provided details
function createPayment(amount, memo, itemId) {
  const paymentData = {
    amount: amount,
    memo: memo || "Purchase from Palace of Goods", // Default memo text
    metadata: { itemId: itemId }  // Unique identifier for the item in your store
  };

  const paymentCallbacks = {
    onReadyForServerApproval: (paymentDTO) => handleServerApproval(paymentDTO),
    onReadyForServerCompletion: (paymentDTO, txid) => handleServerCompletion(paymentDTO, txid),
    onCancel: (paymentDTO) => handlePaymentCancel(paymentDTO),
    onError: (paymentDTO) => handlePaymentError(paymentDTO),
    onIncompletePaymentFound: (paymentDTO) => handleIncompletePayment(paymentDTO)
  };

  // Create the payment via the Pi SDK
  Pi.createPayment(paymentData, paymentCallbacks);
}

// Handle server-side approval (notify backend to approve payment)
function handleServerApproval(paymentDTO) {
  paymentId = paymentDTO.identifier;

  fetch('/payment/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, accessToken })  // Send paymentId and accessToken to backend
  })
    .then(response => response.json())
    .then(data => console.log("Server approval response:", data))
    .catch(error => console.error("Error approving payment:", error));
}

// Handle server-side completion (notify backend to complete payment)
function handleServerCompletion(paymentDTO, txid) {
  paymentId = paymentDTO.identifier;

  fetch('/payment/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, txid })  // Send paymentId and txid to backend for completion
  })
    .then(response => response.json())
    .then(data => console.log("Server completion response:", data))
    .catch(error => console.error("Error completing payment:", error));
}

// Handle payment cancellation (notify backend to cancel payment)
function handlePaymentCancel(paymentDTO) {
  paymentId = paymentDTO.identifier;

  fetch('/payment/cancel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId })  // Send paymentId to backend to cancel payment
  })
    .then(response => response.json())
    .then(data => console.log("Payment canceled:", data))
    .catch(error => console.error("Error canceling payment:", error));
}

// Handle payment errors (notify backend of payment issues)
function handlePaymentError(paymentDTO) {
  paymentId = paymentDTO.identifier;

  fetch('/payment/error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId })  // Send paymentId to backend to log errors
  })
    .then(response => response.json())
    .then(data => console.log("Payment error reported:", data))
    .catch(error => console.error("Error reporting payment issue:", error));
}

// Handle incomplete payments (attempt to retry payment completion)
function handleIncompletePayment(paymentDTO) {
  paymentId = paymentDTO.identifier;
  const txid = paymentDTO.transaction.txid;

  fetch('/payment/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, txid })  // Retry payment completion
  })
    .then(response => response.json())
    .then(data => console.log("Incomplete payment completed:", data))
    .catch(error => console.error("Error completing incomplete payment:", error));
}

// Authenticate the user and retrieve access token if required
function authenticateUser() {
  const scopes = ['payments'];  // Scopes required for authentication

  Pi.authenticate(scopes).then(auth => {
    console.log("Authentication successful:", auth);
    // Store the access token securely for future use
    accessToken = auth.accessToken;  // Replace with secure token management
  }).catch(error => {
    console.error("Authentication error:", error);
  });
}

// Export functions for use in other parts of the app
export { createPayment, authenticateUser };