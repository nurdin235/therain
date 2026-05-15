import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleHash = () => setRoute(window.location.hash || '#/');
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'About', href: '#/about' },
    { name: 'Safety', href: '#/safety-policy' },
    { name: 'Contact', href: '#/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="navbar__logo"
        >
          <span className="logo-card">THE</span>
          <span className="logo-zilla">RAIN</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="navbar__links-container hidden lg:flex">
          <ul className="navbar__links">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className={`navbar__link ${route === link.href ? 'navbar__link--active' : ''}`}
                >
            {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="navbar__actions flex items-center gap-6">
          <button className="btn-login">
            Sign In
          </button>
          
          <button className="btn-book">
            BOOK RIDE
          </button>
        </div>

        {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="flex flex-col items-center gap-8 pt-20">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} className={route === link.href ? 'navbar__mobile-link navbar__mobile-link--active' : 'navbar__mobile-link'} onClick={() => setMenuOpen(false)}>{link.name}</a>
            </li>
          ))}
          <li className="flex flex-col gap-4 w-full px-10">
            <button className="btn-login-mobile w-full py-4 rounded-xl bg-white/10 text-white font-bold uppercase">Sign In</button>
            <button className="btn-book-mobile w-full py-4 rounded-xl bg-red-600 text-white font-bold uppercase">Book Ride</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
