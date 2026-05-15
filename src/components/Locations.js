import React from 'react';
import { Activity, Brain, Camera, Headphones, LockKeyhole, Radio, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import './Locations.css';

const safety = [
  ['SOS', ShieldAlert],
  ['Live monitor', Activity],
  ['Verified', LockKeyhole],
  ['Support', Headphones],
  ['Camera-ready', Camera],
  ['Admin view', Radio],
];

const future = ['AI routing', 'Smart dispatch', 'Africa expansion', 'VIP mobility'];

const Locations = () => {
  return (
    <>
      <section className="safety-section" id="safety">
        <div className="locations__container">
          <div className="split-header">
            <div>
              <span className="badge">Safety</span>
              <h2>Trust built into every ride.</h2>
            </div>
            <p>SOS, verified drivers, live trip visibility, and operator support.</p>
          </div>

          <div className="safety-command">
            <motion.div
              className="command-map"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
            >
              <span className="scan-ring scan-ring--one" />
              <span className="scan-ring scan-ring--two" />
              <span className="command-pin command-pin--one" />
              <span className="command-pin command-pin--two" />
              <span className="command-pin command-pin--three" />
              <div className="alert-card">
                <ShieldCheck size={18} />
                <div>
                  <strong>Ride protected</strong>
                  <span>Admin monitoring active</span>
                </div>
              </div>
            </motion.div>

            <div className="safety-tile-grid">
              {safety.map(([label, Icon], index) => (
                <motion.div
                  className="safety-tile"
                  key={label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <Icon size={22} />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="future-section">
        <div className="locations__container future-panel">
          <div className="future-copy">
            <span className="badge">Future of mobility</span>
            <h2>The transportation layer for modern Africa.</h2>
            <div className="future-tags">
              {future.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="future-core">
            <Brain size={58} />
            <span className="core-line core-line--one" />
            <span className="core-line core-line--two" />
            <div className="core-chip core-chip--one"><Zap size={15} /> Demand</div>
            <div className="core-chip core-chip--two">ETA 4 min</div>
            <div className="core-chip core-chip--three">Safe route</div>
          </div>
        </div>
      </section>

      <section className="download-cta" id="download">
        <div className="locations__container download-cta__inner">
          <div>
            <span className="badge">Launch with us</span>
            <h2>Ride better. Drive smarter.</h2>
          </div>
          <div className="download-cta__actions">
            <button>Book a Ride</button>
            <button>Become a Driver</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Locations;
