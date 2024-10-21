# Palace of Goods - Frontend

The **frontend** for Palace of Goods is built using **React** and integrates with the backend via **Axios** to provide a responsive, user-friendly marketplace experience. The frontend is designed as a **Progressive Web App (PWA)**, which means users can install it on their devices and access it offline.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Frontend](#running-the-frontend)
- [Using Docker](#using-docker)
- [Available Scripts](#available-scripts)
- [PWA (Progressive Web App)](#pwa-progressive-web-app)
- [Environment Variables](#environment-variables)
- [Security Considerations](#security-considerations)
- [License](#license)

---

## Features

- **User Authentication**: Integration with the backend to allow users to register, log in, and authenticate via JWT tokens.
- **Product Listings**: Users can browse and view available products on the marketplace.
- **Responsive Design**: The frontend is fully responsive and optimized for mobile, tablet, and desktop views.
- **Pi Network Payments**: Allows users to make payments using Pi cryptocurrency through the Pi Network integration.
- **Progressive Web App (PWA)**: Users can install the app on their devices and access it offline.

---

## Tech Stack

- **React**: Frontend framework for building UI components.
- **Axios**: HTTP client used for making requests to the backend API.
- **Bootstrap**: For responsive, mobile-first UI components and layout.
- **Service Workers**: Enable the app to work offline and improve performance.
- **Pi Network**: Integrated Pi Network payments for secure transactions.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (14+)
- **npm** (Node package manager)

Or, if using **Docker**:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/palace-of-goods.git
cd frontend
```

### 2. Install Dependencies
Install the required npm packages:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the **frontend** directory with the following content:

```bash
REACT_APP_API_URL=http://localhost:5000
```

- **REACT_APP_API_URL**: This should point to your backend API URL. In development, it is likely `http://localhost:5000`.

---

## Running the Frontend

### 1. Running Locally
To start the development server, run:
```bash
npm start
```

This will start the frontend on `http://localhost:3000`. The app will automatically reload if you make changes to the source files.

---

## Using Docker

If you prefer to run the frontend using Docker, follow these steps:

### 1. Build the Docker Image
Navigate to the `frontend/` directory and run:
```bash
docker build -t palace-frontend .
```

### 2. Run the Docker Container
After building the image, run the container:
```bash
docker run -d -p 3000:3000 --env-file .env palace-frontend
```

This will start the frontend on `http://localhost:3000`.

---

## Available Scripts

In the **frontend** directory, you can run the following npm scripts:

### 1. `npm start`
Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will automatically reload if you make edits.

### 2. `npm run build`
Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.

### 3. `npm run test`
Runs the test suite for the React components.

---

## PWA (Progressive Web App)

This frontend is designed as a **Progressive Web App (PWA)**, which means users can install it on their devices and access it offline.

### Key PWA Features:
1. **Service Worker**: Enables caching and offline capabilities. Service workers run in the background, ensuring the app loads even when there’s no internet connection.
2. **Web App Manifest**: Defines how the app appears to users when installed on their device (e.g., name, icons, start URL).

### Registering the Service Worker

To register the service worker and enable PWA functionality, the app automatically registers the service worker during production builds.

The registration happens in `serviceWorkerRegistration.js`:
```javascript
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}
```

---

## Environment Variables

In the **frontend** directory, the `.env` file is used to store environment-specific variables.

### Example `.env` file:
```bash
REACT_APP_API_URL=http://localhost:5000
```

- **REACT_APP_API_URL**: The backend API URL that the frontend communicates with.

---

## Security Considerations

- **HTTPS**: Ensure that the app is deployed behind HTTPS in production to secure communication between the frontend and backend.
- **Environment Variables**: Use environment variables for storing sensitive information such as the API URL. Do not hardcode these values in the codebase.
- **CORS**: Ensure that your backend API allows **Cross-Origin Resource Sharing (CORS)** for secure communication between the frontend and backend.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

This **README.md** file provides comprehensive instructions for setting up, running, and maintaining the **frontend** of the **Palace of Goods** project, including information about its PWA features. Feel free to customize it further based on your specific project needs. Let me know if you need more adjustments!
