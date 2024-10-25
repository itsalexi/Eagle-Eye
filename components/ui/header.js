import React from 'react';
import "./style/layout.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src='./assets/temp-logo.png'>
        
        </img>
      </div>
      <div className="logo-name">
        <h2>Eagle Eye</h2>
      </div>
    </header>
  );
};

export default Header;
