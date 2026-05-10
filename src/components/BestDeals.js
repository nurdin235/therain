import React from 'react';
import { cars } from '../data/cars';
import { Star, Fuel, Settings, Users } from 'lucide-react';
import './BestDeals.css';

const BestDeals = () => {
  return (
    <section className="best-deals" id="cars">
      <div className="best-deals__container">
        <div className="best-deals__header">
          <span className="badge">Our Fleet</span>
          <h2 className="title">FIND <span className="text-red">BEST DEALS</span> FOR YOU</h2>
          <p className="subtitle">Explore our diverse collection of premium vehicles tailored for every journey.</p>
        </div>

        <div className="best-deals__grid">
          {cars.map((car, i) => (
            <div key={i} className="car-card">
              <div className="car-card__image">
                <img src={car.image} alt={car.name} />
                <div className="price-tag">${car.price}<span>/day</span></div>
              </div>
              
              <div className="car-card__content">
                <div className="car-card__header">
                  <h3>{car.name}</h3>
                  <div className="rating">
                    <Star size={14} fill="currentColor" />
                    <span>4.9 (120 Reviews)</span>
                  </div>
                </div>

                <div className="car-card__info">
                  <div className="info-item"><Users size={16}/><span>4 Seats</span></div>
                  <div className="info-item"><Settings size={16}/><span>Auto</span></div>
                  <div className="info-item"><Fuel size={16}/><span>Hybrid</span></div>
                </div>

                <div className="car-card__footer">
                  <button className="btn-details">View Details</button>
                  <button className="btn-rent">Rent Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;