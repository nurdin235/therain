import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="navbar__logo">
              <span className="logo-card">CARD</span>
              <span className="logo-zilla">ZILLA</span>
            </div>
            <p>Premium car rental service for those who appreciate luxury, performance, and style.</p>
          </div>
          
          <div className="footer__links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#cars">Car Fleet</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#locations">Locations</a></li>
            </ul>
          </div>
          
          <div className="footer__contact">
            <h4>Contact Us</h4>
            <ul>
              <li>Email: info@cardzilla.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Luxury Blvd, Beverly Hills, CA</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2024 CARDZILLA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;