import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './index.css'; // Custom styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
import 'bootstrap/dist/css/bootstrap.min.css';import 'bootstrap/dist/css/bootstrap.min.css';
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
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { Web3Provider } from './context/Web3Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
