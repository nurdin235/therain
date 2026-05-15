import React from 'react';
import './Footer.css';

const footerGroups = [
  ['Product', ['Rider App', 'Driver App', 'Admin Dashboard', 'Safety Center']],
  ['Drivers', ['Apply to Drive', 'Verification', 'Earnings', 'Driver Support']],
  ['Company', ['About TheRain', 'Bamenda Launch', 'Future Vision', 'Careers']],
  ['Legal', ['Privacy', 'Terms', 'Safety Policy', 'Payments']],
];

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__brand-row">
          <div className="footer__brand">
            <div className="footer__logo">
              <span>THE</span>RAIN
            </div>
            <p>Ride better. Drive smarter. TheRain is premium mobility for riders and drivers in Cameroon.</p>
          </div>
          <div className="footer__contact">
            <h4>Contact</h4>
            <p>hello@therain.africa</p>
            <p>Bamenda, Cameroon</p>
            <p>Partnerships, drivers, riders, and operators</p>
          </div>
        </div>

        <div className="footer__grid">
          {footerGroups.map(([title, links]) => (
            <div className="footer__links" key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}><a href="#rent">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 TheRain Mobility. All rights reserved.</p>
          <div className="footer__socials">
            <a href="#rent">X</a>
            <a href="#rent">LinkedIn</a>
            <a href="#rent">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
