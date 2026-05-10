import React from 'react';
import './Stats.css';

const statsData = [
  { value: 500, suffix: '+', label: 'Premium Cars' },
  { value: 15, suffix: 'K+', label: 'Happy Customers' },
  { value: 25, suffix: '+', label: 'Global Locations' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' },
];

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats__container">
        {statsData.map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">
              {stat.value}<span>{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;