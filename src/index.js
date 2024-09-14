// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css'; // Import your global styles
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
