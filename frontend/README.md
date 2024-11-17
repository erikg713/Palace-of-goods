Step 1: Set Up Pi Network SDK in Backend

1. Install Pi Network SDK:



First, make sure you have the Pi Network SDK available for use in your project. If you don't have it yet, ensure you install it or download the required Pi Network SDK (depending on the Node.js package or custom SDK).
npm install pi-backend

2. Backend Configuration (env file):



Make sure to add your Pi API Key and wallet private seed to the .env file.

3. Initialize Pi Network SDK in Backend:



Create a new file paymentController.js in your controllers directory, where you’ll handle the payment logic.

Step 2: Set Up Routes

Create a paymentRoutes.js file to define your API endpoints that handle payments.

Step 3: Frontend Integration for Pi Network Payment

1. Frontend: Install Axios (to make API requests):


2. Create Checkout Component (React):



Here’s how you’ll set up your frontend to handle payment creation, submission, and completion using Pi Network:


Step 4: Backend Payment Logic and DB Integration

For a more complete solution, you will need to:

1. Store the payment data (e.g., uid, productId, amount, status, etc.) in your database.


2. Ensure that after each payment step (create, submit, complete), you’re updating your database accordingly.



For example, here's a simple MongoDB setup using Mongoose:

Then, inside your controller, when creating a payment, you can store it:

Step 5: Test Everything

Test the payment flow from frontend to backend.

Make sure the Pi Network API is integrated properly and that payments are successfully created, submitted, and completed.
