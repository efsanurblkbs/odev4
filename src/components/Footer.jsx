// src/components/Footer.js

import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Kampüs Film Kulübü - 
          Ödev-3 - 
          <strong>Efsa Nur Bölükbaş</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;