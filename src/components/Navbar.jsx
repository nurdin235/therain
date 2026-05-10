import React, { useState, useEffect } from 'react';
import { User, Menu, X, Search, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rent', href: '#rent' },
    { name: 'Share', href: '#share' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
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
          <span className="logo-card">CARD</span>
          <span className="logo-zilla text-red-600">ZILLA</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="navbar__links-container hidden lg:flex">
          <ul className="navbar__links">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="navbar__link"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="navbar__actions flex items-center gap-6">
          <button className="text-white hover:text-red-500 transition-colors hidden md:block" aria-label="Search cars">
            <Search size={20} />
          </button>
          
          <div className="flex items-center gap-2 text-white cursor-pointer hover:text-red-500 transition-colors hidden md:flex">
            <Globe size={18} />
            <span className="text-xs font-bold">EN</span>
          </div>

          <button className="btn-login flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2 rounded-full border border-white/10 transition-all">
            <User size={18} className="text-red-500" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Login</span>
          </button>
          
          <button className="btn-book bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold text-sm tracking-widest transition-all hover:scale-105 shadow-lg shadow-red-600/20">
            BOOK NOW
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
              <a href={link.href} className="text-2xl font-black uppercase text-white hover:text-red-600" onClick={() => setMenuOpen(false)}>{link.name}</a>
            </li>
          ))}
          <li className="flex flex-col gap-4 w-full px-10">
            <button className="btn-login-mobile w-full py-4 rounded-xl bg-white/10 text-white font-bold uppercase">Login</button>
            <button className="btn-book-mobile w-full py-4 rounded-xl bg-red-600 text-white font-bold uppercase">BOOK NOW</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
