import React from 'react';
import '../styles/notFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="home-link">Back to Home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;