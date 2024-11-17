// payment.js

// Initialize Pi SDK (place in your main HTML file if not done globally)
document.addEventListener("DOMContentLoaded", () => {
  Pi.init({
    version: "2.0",
    sandbox: true,  // Change to false in production
    appId: "your_pi_network_sdk_key"  // Replace with your actual app ID
  });
});

const Pi = window.Pi;
let paymentId;
let accessToken = "user_access_token";  // Replace with secure token management in production

// Function to create a payment
function createPayment(amount, memo, itemId) {
  const paymentData = {
    amount: amount,
    memo: memo || "Purchase from Palace of Goods",
    metadata: { itemId: itemId }  // Unique item identifier in Palace of Goods
  };

  const paymentCallbacks = {
    onReadyForServerApproval: (paymentDTO) => handleServerApproval(paymentDTO),
    onReadyForServerCompletion: (paymentDTO, txid) => handleServerCompletion(paymentDTO, txid),
    onCancel: (paymentDTO) => handlePaymentCancel(paymentDTO),
    onError: (paymentDTO) => handlePaymentError(paymentDTO),
    onIncompletePaymentFound: (paymentDTO) => handleIncompletePayment(paymentDTO)
  };

  Pi.createPayment(paymentData, paymentCallbacks);
}

// Handle server approval by sending a request to the backend
function handleServerApproval(paymentDTO) {
  paymentId = paymentDTO.identifier;
  fetch('/payment/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, accessToken })
  }).then(response => response.json())
    .then(data => console.log("Server approval response:", data))
    .catch(error => console.error("Error approving payment:", error));
}

// Handle server completion by sending a request to complete the payment
function handleServerCompletion(paymentDTO, txid) {
  paymentId = paymentDTO.identifier;
  fetch('/payment/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, txid })
  }).then(response => response.json())
    .then(data => console.log("Server completion response:", data))
    .catch(error => console.error("Error completing payment:", error));
}

// Handle payment cancellation by notifying the server
function handlePaymentCancel(paymentDTO) {
  paymentId = paymentDTO.identifier;
  fetch('/payment/cancel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId })
  }).then(response => response.json())
    .then(data => console.log("Payment canceled:", data))
    .catch(error => console.error("Error canceling payment:", error));
}

// Handle any payment error by notifying the server
function handlePaymentError(paymentDTO) {
  paymentId = paymentDTO.identifier;
  fetch('/payment/error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId })
  }).then(response => response.json())
    .then(data => console.log("Payment error reported:", data))
    .catch(error => console.error("Error reporting payment issue:", error));
}

// Handle incomplete payments found by retrying completion
function handleIncompletePayment(paymentDTO) {
  paymentId = paymentDTO.identifier;
  const txid = paymentDTO.transaction.txid;
  fetch('/payment/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentId, txid })
  }).then(response => response.json())
    .then(data => console.log("Incomplete payment completed:", data))
    .catch(error => console.error("Error completing incomplete payment:", error));
}

// Authenticate the user and retrieve access token if required
function authenticateUser() {
  const scopes = ['payments'];
  Pi.authenticate(scopes).then(auth => {
    console.log("Authentication successful:", auth);
    // Retrieve access token or other data here if necessary
  }).catch(error => {
    console.error("Authentication error:", error);
  });
}

// Export functions for use in other parts of the app
export { createPayment, authenticateUser };
