// NotFound404.js
import React, { useEffect } from 'react';
import './404Page.css'
import { Button } from 'antd';
const NotFound404 = () => {
  const handleBackToHome = () => {
    // Implement the logic to navigate back to the home page
    // You can use react-router-dom or any other routing library for this
    window.location.href = '/pocetna';
  };

  return (
    <div className="not-found-container">
      <h1>404 - Stranica nije pronađena</h1>
      <p>Nažalost, tražena stranica ne postoji.</p>
      <Button className='btn-primary'  onClick={handleBackToHome}>Nazad na početnu stranicu</Button>
    </div>
  );
};

export default NotFound404;
