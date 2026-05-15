import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Building2, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react';
import './PageStyles.css';
import './ContactPage.css';

const supportOptions = [
  ['Rider support', 'Trip questions, payments, refunds, lost items.', MessageCircle],
  ['Driver support', 'Applications, verification, payouts, app help.', ShieldCheck],
  ['Partnerships', 'Business rides, VIP transport, city operations.', Building2],
];

const faqs = [
  ['How do I become a driver?', 'Start from the driver form. TheRain reviews identity, documents, and vehicle readiness.'],
  ['Is TheRain live in my city?', 'TheRain launches first in Bamenda, with expansion planned across Cameroon.'],
  ['How do emergency reports work?', 'Safety reports are routed to support and reviewed with trip data where available.'],
];

export default function ContactPage() {
  return (
    <main className="premium-page contact-page">
      <div className="page-container">
        <section className="page-hero contact-hero">
          <motion.div className="page-hero__content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="page-kicker">Contact TheRain</span>
            <h1>Support that feels human, fast, and premium.</h1>
            <p>Questions from riders, drivers, partners, and operators all start here.</p>
          </motion.div>
        </section>

        <section className="page-section contact-grid">
          <div className="contact-panel">
            <span className="page-kicker">Send a message</span>
            <h2>Tell us what you need.</h2>
            <form className="premium-form">
              <input aria-label="Full name" placeholder="Full name" />
              <input aria-label="Email" placeholder="Email address" type="email" />
              <select aria-label="Support category" defaultValue="">
                <option value="" disabled>Support category</option>
                <option>Rider support</option>
                <option>Driver application</option>
                <option>Safety report</option>
                <option>Partnership</option>
              </select>
              <textarea aria-label="Message" placeholder="How can TheRain help?" />
              <button className="premium-button" type="button">Send Message <Send size={16} /></button>
            </form>
          </div>

          <div className="contact-side">
            <div className="emergency-card">
              <AlertTriangle size={24} />
              <h3>Emergency support</h3>
              <p>For active ride safety issues, use SOS in the app first. Support can review ride details and escalate urgent reports.</p>
              <a href="#/safety-policy">View Safety Policy <ArrowRight size={16} /></a>
            </div>

            <div className="office-card">
              <MapPin size={22} />
              <h3>Bamenda HQ</h3>
              <p>Launching in Bamenda, Cameroon.</p>
              <div><Mail size={16} /> hello@therain.africa</div>
              <div><Phone size={16} /> +237 6XX XXX XXX</div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <span className="page-kicker">Support channels</span>
              <h2>Choose the fastest path.</h2>
            </div>
          </div>
          <div className="glass-grid">
            {supportOptions.map(([title, text, Icon], index) => (
              <motion.article className="glass-card" key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05 }}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="page-section faq-preview">
          <div>
            <span className="page-kicker">FAQ preview</span>
            <h2>Quick answers.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="page-section contact-map-section">
          <div className="contact-map">
            <span className="contact-map__pulse" />
            <span className="contact-map__marker" />
            <span className="contact-map__marker contact-map__marker--two" />
            <span className="contact-map__marker contact-map__marker--three" />
          </div>
          <div>
            <span className="page-kicker">Office</span>
            <h2>Built from Bamenda for African mobility.</h2>
            <p>Riders, drivers, partners, and city operators can reach TheRain through the channels above.</p>
            <div className="contact-socials">
              <a href="#/contact">X</a>
              <a href="#/contact">LinkedIn</a>
              <a href="#/contact">Instagram</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
