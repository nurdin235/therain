import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Globe2, Lightbulb, MapPin, Navigation, ShieldCheck, Sparkles, Users } from 'lucide-react';
import './PageStyles.css';
import './AboutPage.css';

const timeline = [
  ['Problem', 'City movement is fragmented, unsafe, and hard to trust.'],
  ['Launch', 'TheRain begins in Bamenda with riders and verified drivers.'],
  ['Scale', 'Smart dispatch, safety systems, and VIP mobility expand across Cameroon.'],
  ['Future', 'A modern African mobility network built for smarter cities.'],
];

const values = [
  ['Safety', ShieldCheck],
  ['Trust', Users],
  ['Innovation', Lightbulb],
  ['Access', Globe2],
  ['Reliability', Navigation],
  ['Premium Care', Sparkles],
];

const team = [
  ['Ndi Rain', 'Founder & Product Lead'],
  ['Acha M.', 'Operations Director'],
  ['Manka F.', 'Safety & Driver Success'],
];

export default function AboutPage() {
  return (
    <main className="premium-page about-page">
      <div className="page-container">
        <section className="page-hero about-hero">
          <motion.div
            className="page-hero__content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="page-kicker">About TheRain</span>
            <h1>Building the Future of Mobility in Africa</h1>
            <p>Premium transportation for riders. Real opportunity for drivers. A smarter way for African cities to move.</p>
          </motion.div>
          <div className="about-hero__visual">
            <span className="city-line city-line--one" />
            <span className="city-line city-line--two" />
            <span className="city-node city-node--one" />
            <span className="city-node city-node--two" />
            <span className="city-node city-node--three" />
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <span className="page-kicker">Company story</span>
              <h2>Born from real transport friction.</h2>
            </div>
            <p>TheRain exists to make everyday movement safer, cleaner, and more rewarding for the people who ride and the people who drive.</p>
          </div>
          <div className="timeline-grid">
            {timeline.map(([label, text], index) => (
              <motion.article
                className="timeline-card"
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <b>{String(index + 1).padStart(2, '0')}</b>
                <h3>{label}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="page-section mission-grid">
          <motion.div className="mission-card" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <Flag size={28} />
            <span>Mission</span>
            <h2>Deliver safe, intelligent, accessible mobility.</h2>
          </motion.div>
          <motion.div className="mission-card mission-card--blue" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <Globe2 size={28} />
            <span>Vision</span>
            <h2>Become Africa&apos;s leading smart mobility ecosystem.</h2>
          </motion.div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <span className="page-kicker">Values</span>
              <h2>The principles behind the platform.</h2>
            </div>
          </div>
          <div className="values-grid">
            {values.map(([label, Icon]) => (
              <div className="value-card" key={label}>
                <Icon size={24} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="section-heading">
            <div>
              <span className="page-kicker">Leadership</span>
              <h2>Built by operators, designers, and mobility thinkers.</h2>
            </div>
            <p>A focused team designing trust, earnings, and premium movement into every layer of TheRain.</p>
          </div>
          <div className="team-grid">
            {team.map(([name, role], index) => (
              <motion.article className="team-card" key={name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, delay: index * 0.07 }}>
                <div className="team-portrait">{name.split(' ').map((part) => part[0]).join('')}</div>
                <h3>{name}</h3>
                <p>{role}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="page-section about-location">
          <div>
            <span className="page-kicker">Headquarters</span>
            <h2>Bamenda, Cameroon</h2>
            <p>TheRain launches where trust, speed, and safer movement matter deeply. Future markers point across Cameroon and Africa.</p>
          </div>
          <div className="about-map">
            <MapPin className="map-main" size={34} />
            <span className="map-pulse" />
            <span className="map-marker map-marker--one" />
            <span className="map-marker map-marker--two" />
            <span className="map-marker map-marker--three" />
          </div>
        </section>

        <section className="page-section about-contact-card">
          <div>
            <span className="page-kicker">Contact</span>
            <h2>Let&apos;s move Africa forward.</h2>
          </div>
          <a className="premium-button" href="#/contact">Contact TheRain</a>
        </section>
      </div>
    </main>
  );
}
