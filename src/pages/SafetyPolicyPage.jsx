import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BellRing, Camera, Headphones, LockKeyhole, Radio, Route, ShieldAlert, ShieldCheck, UserCheck } from 'lucide-react';
import './PageStyles.css';
import './SafetyPolicyPage.css';

const safetySystems = [
  ['Emergency SOS', 'Escalation workflows for urgent rider or driver situations.', ShieldAlert],
  ['Live Ride Tracking', 'Trip movement and route progress visible during active rides.', Route],
  ['Driver Verification', 'Identity, document, and vehicle checks before activation.', UserCheck],
  ['Admin Oversight', 'Operator tools for monitoring active rides and incidents.', Radio],
  ['Incident Support', 'Structured reporting and support follow-up after problems.', Headphones],
  ['AI Safety Signals', 'Risk signals for route, behavior, demand, and unusual activity.', Activity],
];

const responseSteps = [
  'Detect risk',
  'Alert support',
  'Monitor ride',
  'Escalate incident',
  'Resolve and review',
];

export default function SafetyPolicyPage() {
  return (
    <main className="premium-page safety-policy-page">
      <div className="page-container">
        <section className="page-hero safety-policy-hero">
          <motion.div className="page-hero__content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="page-kicker">Safety Policy</span>
            <h1>Protection you can feel before the ride starts.</h1>
            <p>Verified drivers, live tracking, emergency workflows, and operator oversight built into TheRain.</p>
          </motion.div>
          <div className="safety-radar">
            <span className="radar-ring radar-ring--one" />
            <span className="radar-ring radar-ring--two" />
            <ShieldCheck size={58} />
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <span className="page-kicker">Safety stack</span>
              <h2>Every ride runs on a protection layer.</h2>
            </div>
            <p>TheRain combines human operations and smart platform signals to make riders and drivers feel protected.</p>
          </div>

          <div className="glass-grid">
            {safetySystems.map(([title, text, Icon], index) => (
              <motion.article
                className="glass-card"
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
              >
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="page-section safety-dashboard">
          <div className="dashboard-visual">
            <div className="dashboard-map">
              <span className="dash-route dash-route--one" />
              <span className="dash-route dash-route--two" />
              <span className="dash-pin dash-pin--one" />
              <span className="dash-pin dash-pin--two" />
              <span className="dash-pin dash-pin--three" />
            </div>
            <div className="dashboard-feed">
              <div><BellRing size={16} /> SOS armed</div>
              <div><LockKeyhole size={16} /> Driver verified</div>
              <div><Camera size={16} /> Camera-ready workflow</div>
              <div><Activity size={16} /> Route scan active</div>
            </div>
          </div>
          <div className="dashboard-copy">
            <span className="page-kicker">Emergency response</span>
            <h2>From signal to support in one controlled flow.</h2>
            <div className="response-steps">
              {responseSteps.map((step, index) => (
                <div key={step}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section legal-stack">
          {[
            ['Riders', 'Share trip details, confirm driver identity, use SOS when necessary, and report unsafe behavior quickly.'],
            ['Drivers', 'Maintain verification, follow routes responsibly, respect riders, and report emergencies or incidents.'],
            ['TheRain', 'Monitor active safety signals, review reports, support users, and take action on unsafe accounts.'],
          ].map(([title, body], index) => (
            <motion.article className="legal-card" key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05 }}>
              <span>Responsibility</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
