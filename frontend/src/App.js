import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Import pages and components
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Marketplace from './components/Marketplace';

const App = () => (
  <Router>
    <div>
      <h1>Palace of Goods</h1>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Routes and Components */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </div>
  </Router>
);

export default App;
// frontend/src/App.js
import React from 'react';
import PaymentForm from './components/PaymentForm';

function App() {
  return (
    <div>
      <h1>Palace of Goods - Payment Portal</h1>
      <PaymentForm />
    </div>
  );
}

export default App;
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
