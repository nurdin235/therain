import React from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Stats from './components/Stats';
import BestDeals from './components/BestDeals';
import Services from './components/Services';
import Locations from './components/Locations';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroCarousel />
      {/* BookingBar is now inside HeroCarousel for better placement with 3D scene */}
      <Stats />
      <BestDeals />
      <Services />
      <Locations />
      <Footer />
    </div>
  );
}

export default App;