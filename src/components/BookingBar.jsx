import React from 'react';
import { MapPin, Calendar, Car, Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import './BookingBar.css';

const BookingBar = () => {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="booking-bar-wrapper"
    >
      <div className="booking-bar">
        <div className="booking-bar__container">
          <div className="booking-field group">
            <div className="field-icon text-red-500 transition-transform group-hover:scale-110">
              <MapPin size={22} />
            </div>
            <div className="field-content">
              <label>Pick-up Location</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="Dubai, UAE" className="bg-transparent border-none outline-none text-white font-bold w-full" />
                <ChevronDown size={14} className="text-white/40" />
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="booking-field group">
            <div className="field-icon text-red-500 transition-transform group-hover:scale-110">
              <Calendar size={22} />
            </div>
            <div className="field-content">
              <label>Pick-up Date</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="12 May, 2026" className="bg-transparent border-none outline-none text-white font-bold w-full" />
                <ChevronDown size={14} className="text-white/40" />
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="booking-field group">
            <div className="field-icon text-red-500 transition-transform group-hover:scale-110">
              <Calendar size={22} />
            </div>
            <div className="field-content">
              <label>Return Date</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="15 May, 2026" className="bg-transparent border-none outline-none text-white font-bold w-full" />
                <ChevronDown size={14} className="text-white/40" />
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="booking-field group">
            <div className="field-icon text-red-500 transition-transform group-hover:scale-110">
              <Car size={22} />
            </div>
            <div className="field-content">
              <label>Car Brand</label>
              <div className="flex items-center gap-1">
                <select className="bg-transparent border-none outline-none text-white font-bold w-full appearance-none cursor-pointer">
                  <option className="bg-[#111]">Audi</option>
                  <option className="bg-[#111]">BMW</option>
                  <option className="bg-[#111]">Mercedes</option>
                </select>
                <ChevronDown size={14} className="text-white/40" />
              </div>
            </div>
          </div>

          <button className="btn-search-premium">
            <Search size={22} />
            <span className="font-black tracking-widest uppercase text-xs">Find a Car</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingBar;
