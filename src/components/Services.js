import React from 'react';
import { ChevronRight, Crown, Headphones, Map, ShieldAlert, Smartphone, WalletCards } from 'lucide-react';
import { motion } from 'framer-motion';
import './Services.css';

const riderFlow = ['Pickup', 'Driver match', 'Live route', 'Pay'];
const driverFlow = ['Online', 'Trip request', 'Navigate', 'Earn'];

const Services = () => {
  return (
    <section className="experience-showcase" id="experience">
      <div className="experience-showcase__container">
        <div className="experience-showcase__header">
          <span className="badge">App experience</span>
          <h2>Feels premium before the ride even starts.</h2>
        </div>

        <div className="app-stage">
          <motion.div
            className="app-card app-card--rider"
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62 }}
          >
            <div className="app-card__title">
              <Smartphone size={22} />
              <div>
                <span>Rider app</span>
                <h3>Book the easy way.</h3>
              </div>
            </div>
            <div className="flow-list">
              {riderFlow.map((step, index) => (
                <div key={step}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{step}</span>
                  <ChevronRight size={16} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="center-device"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <div className="device-screen">
              <div className="device-map">
                <span className="device-path" />
                <span className="device-car" />
              </div>
              <div className="device-sheet">
                <span>Route active</span>
                <strong>Up Station to City Chemist</strong>
                <div>
                  <i><Map size={16} /> 8.4 km</i>
                  <i><WalletCards size={16} /> 2,400 XAF</i>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="app-card app-card--driver"
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62 }}
          >
            <div className="app-card__title">
              <Crown size={22} />
              <div>
                <span>Driver app</span>
                <h3>Work with control.</h3>
              </div>
            </div>
            <div className="flow-list">
              {driverFlow.map((step, index) => (
                <div key={step}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{step}</span>
                  <ChevronRight size={16} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="premium-grid">
          <PremiumCard icon={ShieldAlert} title="SOS ready" text="Emergency escalation built into the ride." />
          <PremiumCard icon={Headphones} title="Live support" text="Admin operators can monitor and assist." />
          <PremiumCard icon={Crown} title="VIP rides" text="Premium service for events and executive travel." />
        </div>
      </div>
    </section>
  );
};

function PremiumCard({ icon: Icon, title, text }) {
  return (
    <motion.article
      className="premium-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
    >
      <Icon size={22} />
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}

export default Services;
