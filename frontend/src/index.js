import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global CSS
import App from './App'; // Main app component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Where to mount the app in the HTML
);
