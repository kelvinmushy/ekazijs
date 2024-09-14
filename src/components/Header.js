// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css'; // Optional, for styling

const Header = () => (
  <header className="header">
    <h1>Job Portal</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  </header>
);

export default Header;
