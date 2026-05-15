import React from 'react';
import { ArrowRight, Banknote, Clock3, Gauge, MapPin, Navigation2, ShieldCheck, TrendingUp, WalletCards } from 'lucide-react';
import { motion } from 'framer-motion';
import './BestDeals.css';

const riderTags = ['Book in seconds', 'Track live', 'Pay easily', 'Ride VIP'];
const driverStats = [
  ['Weekly', 'Payout rhythm'],
  ['Low', 'Commission model'],
  ['Live', 'Demand heatmap'],
];

const BestDeals = () => {
  return (
    <section className="conversion-stories" id="riders">
      <div className="conversion-stories__container">
        <motion.div
          className="story-panel story-panel--rider"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <div className="story-copy">
            <span className="badge">For riders</span>
            <h2>Tap. Track. Arrive.</h2>
            <p>Clean booking. Clear pricing. Premium movement across your city.</p>
            <div className="tag-row">
              {riderTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <button className="story-button">Book a Ride <ArrowRight size={18} /></button>
          </div>

          <div className="rider-visual" aria-label="TheRain rider app mockup">
            <div className="phone-shell">
              <div className="phone-top">
                <span>TheRain</span>
                <strong>4 min</strong>
              </div>
              <div className="mini-map">
                <span className="route route--one" />
                <span className="route route--two" />
                <span className="pin pin--pickup"><MapPin size={14} /></span>
                <span className="pin pin--driver"><Navigation2 size={14} /></span>
              </div>
              <div className="ride-card">
                <div>
                  <strong>Premium Ride</strong>
                  <span>Commercial Avenue</span>
                </div>
                <b>1,800 XAF</b>
              </div>
              <div className="payment-row">
                <WalletCards size={18} />
                <span>Mobile money ready</span>
              </div>
            </div>
            <div className="floating-badge floating-badge--eta"><Clock3 size={16} /> Driver arriving</div>
            <div className="floating-badge floating-badge--safe"><ShieldCheck size={16} /> Verified</div>
          </div>
        </motion.div>

        <motion.div
          className="story-panel story-panel--driver"
          id="drivers"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <div className="driver-visual" aria-label="TheRain driver earnings dashboard">
            <div className="earnings-card">
              <span>This week</span>
              <strong>86,500 XAF</strong>
              <div className="earnings-bars">
                <i style={{ height: '36%' }} />
                <i style={{ height: '68%' }} />
                <i style={{ height: '52%' }} />
                <i style={{ height: '86%' }} />
                <i style={{ height: '74%' }} />
                <i style={{ height: '94%' }} />
              </div>
            </div>
            <div className="driver-metric"><TrendingUp size={17} /> Peak demand nearby</div>
            <div className="driver-metric driver-metric--right"><Gauge size={17} /> Smart navigation</div>
            <div className="driver-metric driver-metric--bottom"><Banknote size={17} /> Weekly payouts</div>
          </div>

          <div className="story-copy">
            <span className="badge">For drivers</span>
            <h2>Earn with freedom.</h2>
            <p>Join a premium driver network with smarter trips, better tools, and a cleaner path to income.</p>
            <div className="driver-stat-grid">
              {driverStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <button className="story-button story-button--dark">Become a Driver <ArrowRight size={18} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BestDeals;
