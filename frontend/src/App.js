import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import './App.css'; // Custom styles

// Import pages and components
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Marketplace from './components/Marketplace';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';

const App = () => (
  <Router>
    {/* Navbar */}
    <Navbar />

    {/* Main content */}
    <div className="container mt-4">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>

    {/* Footer */}
    <Footer />
  </Router>
);

export default App;