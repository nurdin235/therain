import React from 'react';
import './Locations.css';

const locationsData = [
  { city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop' },
  { city: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop' },
  { city: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop' },
  { city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop' },
];

const Locations = () => {
  return (
    <section className="locations" id="locations">
      <div className="locations__container">
        <div className="locations__header">
          <span className="badge">Global Presence</span>
          <h2 className="title">OUR <span className="text-red">LOCATIONS</span></h2>
        </div>
        <div className="locations__grid">
          {locationsData.map((loc, i) => (
            <div key={i} className="location-card">
              <img src={loc.image} alt={loc.city} />
              <div className="location-info">
                <h3>{loc.city}</h3>
                <p>{loc.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;