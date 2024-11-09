import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';

function App() {
    return (
        <Router>
            <div>
                <h1>Palace of Goods</h1>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import Marketplace from './components/Marketplace';

function App() {
  return (
    <div className="App">
      <Marketplace />
    </div>
  );
}

export default App;
