import React from 'react';
import { BadgeCheck, CreditCard, Navigation, Radar, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import './Stats.css';

const reasons = [
  ['Fast pickups', 'Nearby drivers. Shorter waits.', Zap],
  ['Smart routing', 'Better routes through city traffic.', Navigation],
  ['Verified drivers', 'Identity and vehicle checks.', BadgeCheck],
  ['Live tracking', 'See every ride in real time.', Radar],
  ['Secure payments', 'Cashless, mobile-ready trips.', CreditCard],
  ['AI dispatch', 'Demand matched intelligently.', ShieldCheck],
];

const Stats = () => {
  return (
    <section className="stats" id="why">
      <div className="stats__intro">
        <span className="section-kicker">Why TheRain</span>
        <h2>Premium rides. Real driver opportunity.</h2>
      </div>

      <div className="reason-grid">
        {reasons.map(([title, text, Icon], i) => (
          <motion.article
            className="reason-card"
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.52, delay: i * 0.05 }}
          >
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>

      <div className="conversion-strip">
        <div>
          <strong>Riders</strong>
          <span>Book safer rides in seconds.</span>
        </div>
        <div>
          <strong>Drivers</strong>
          <span>Earn on your schedule.</span>
        </div>
        <div>
          <strong>Launch</strong>
          <span>Bamenda first. Africa next.</span>
        </div>
      </div>
    </section>
  );
};

export default Stats;
