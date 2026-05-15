import React from 'react';
import './Footer.css';

const footerGroups = [
  ['Product', [
    ['Rider App', '#/'],
    ['Driver App', '#/'],
    ['Safety Center', '#/safety-policy'],
    ['Contact Support', '#/contact'],
  ]],
  ['Drivers', [
    ['Apply to Drive', '#/contact'],
    ['Verification', '#/safety-policy'],
    ['Earnings', '#/'],
    ['Driver Support', '#/contact'],
  ]],
  ['Company', [
    ['About TheRain', '#/about'],
    ['Bamenda Launch', '#/about'],
    ['Future Vision', '#/about'],
    ['Contact', '#/contact'],
  ]],
  ['Legal', [
    ['Privacy', '#/privacy'],
    ['Terms', '#/terms'],
    ['Safety Policy', '#/safety-policy'],
    ['Payments', '#/terms'],
  ]],
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
                {links.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
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
