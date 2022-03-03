import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
        <Link to="/">
            <h1>Snippet manager</h1>
        </Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Signup</Link>
    </div>      
  );
}
