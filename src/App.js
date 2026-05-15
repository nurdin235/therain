import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Stats from './components/Stats';
import BestDeals from './components/BestDeals';
import Services from './components/Services';
import Locations from './components/Locations';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import LegalPage from './pages/LegalPage';
import SafetyPolicyPage from './pages/SafetyPolicyPage';
import ContactPage from './pages/ContactPage';
import './App.css';

const pageMap = {
  '/about': AboutPage,
  '/privacy': () => <LegalPage type="privacy" />,
  '/terms': () => <LegalPage type="terms" />,
  '/safety-policy': SafetyPolicyPage,
  '/contact': ContactPage,
};

function getRoute() {
  const route = window.location.hash.replace('#', '');
  return route.startsWith('/') ? route : '/';
}

function App() {
  const [route, setRoute] = useState(getRoute);
  const Page = pageMap[route];

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app">
      <Navbar />
      {Page ? (
        <Page />
      ) : (
        <>
          <HeroCarousel />
          <Stats />
          <BestDeals />
          <Services />
          <Locations />
          <Testimonials />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
