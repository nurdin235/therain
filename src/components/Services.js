import React from 'react';
import './Services.css';

const servicesData = [
  {
    title: 'Luxury Car Rental',
    desc: 'Choose from a wide selection of top-tier luxury vehicles for your special occasions.',
    icon: '💎'
  },
  {
    title: 'Chauffeur Service',
    desc: 'Professional drivers to ensure you arrive in style and comfort at your destination.',
    icon: '👔'
  },
  {
    title: 'Airport Pickup',
    desc: 'Seamless airport transfers with our premium meet and greet service.',
    icon: '✈️'
  },
  {
    title: 'Long-term Rental',
    desc: 'Flexible long-term leasing options for corporate and personal needs.',
    icon: '📅'
  }
];

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="services__container">
        <div className="services__header">
          <span className="badge">What We Offer</span>
          <h2 className="title">OUR PREMIUM <span className="text-red">SERVICES</span></h2>
        </div>
        <div className="services__grid">
          {servicesData.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;