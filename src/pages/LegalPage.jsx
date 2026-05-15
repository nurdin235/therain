import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, LockKeyhole, Scale } from 'lucide-react';
import './PageStyles.css';

const privacySections = [
  ['Information Collection', 'We collect account details, contact information, device signals, and ride preferences needed to operate TheRain safely.', ['Name, phone number, email, and profile details', 'Driver documents, vehicle details, and verification records', 'Support messages and safety reports']],
  ['GPS and Location Data', 'Location data powers pickup accuracy, live tracking, route safety, and driver dispatch.', ['Pickup and destination coordinates', 'Real-time ride location while a trip is active', 'Approximate device location for demand and safety signals']],
  ['Ride History', 'Trips are stored to support receipts, support reviews, safety audits, and platform reliability.', ['Routes, timestamps, driver/rider match records', 'Ratings, cancellations, and support outcomes']],
  ['Payment Information', 'Payment details are processed securely through trusted payment partners where available.', ['Transaction references and payment status', 'Mobile money or card metadata, not full sensitive credentials']],
  ['Account Security', 'We use access controls, verification, monitoring, and security checks to protect accounts.', ['Login protections and suspicious activity review', 'Driver verification and account moderation']],
  ['Cookies', 'Cookies and similar technologies help us improve performance and understand product usage.', ['Session preferences', 'Analytics and reliability signals']],
  ['Third-Party Services', 'TheRain may connect with mapping, payment, cloud, messaging, and support providers.', ['Used only to operate, protect, and improve platform services']],
  ['Data Sharing', 'We share limited data when needed for rides, safety, legal compliance, payments, or support.', ['Driver and rider trip-matching details', 'Emergency or legal requests when required']],
  ['User Rights', 'Users may request access, correction, export, or deletion where legally and operationally possible.', ['Contact support to manage data rights', 'Some safety and transaction records may be retained']],
  ['Account Deletion', 'Users can request account deletion through support channels.', ['Open balances, investigations, or legal records may delay deletion']],
  ['Data Retention', 'We keep information only as long as needed for safety, operations, compliance, and dispute resolution.', ['Retention periods vary by data category and legal need']],
];

const termsSections = [
  ['Account Rules', 'Users must provide accurate information, protect account access, and use TheRain lawfully.', ['One person per account', 'No impersonation, fraud, or account resale']],
  ['Rider Responsibilities', 'Riders must be respectful, ready at pickup, and follow safety guidance during trips.', ['No harassment or unsafe conduct', 'Pay completed fares and applicable fees']],
  ['Driver Responsibilities', 'Drivers must stay verified, maintain vehicles, follow local laws, and deliver safe service.', ['Valid documents and roadworthy vehicles', 'Professional conduct with riders']],
  ['Payment Policies', 'Fares, fees, promotions, and payouts may vary by location, demand, and service type.', ['Payment failures may restrict account access', 'Driver payouts follow TheRain payout schedules']],
  ['Cancellations', 'Cancellation rules protect both riders and drivers from wasted time.', ['Fees may apply after a driver is assigned or en route']],
  ['Prohibited Activities', 'TheRain may suspend conduct that threatens trust, safety, or platform integrity.', ['Fraud, abuse, weapons, illegal goods, off-platform manipulation']],
  ['Dispute Resolution', 'Support reviews trip records, GPS signals, payments, and user reports to resolve disputes.', ['Users should report issues quickly with accurate details']],
  ['Platform Limitations', 'Availability may depend on demand, driver supply, network connectivity, and local conditions.', ['TheRain does not guarantee uninterrupted access']],
  ['Liability', 'TheRain provides a technology platform and manages safety systems within operational limits.', ['Nothing here limits rights that cannot be limited by law']],
  ['Suspension Policies', 'Accounts may be reviewed, restricted, or removed for safety, fraud, non-payment, or policy violations.', ['Severe incidents can lead to immediate action']],
];

const content = {
  privacy: {
    icon: LockKeyhole,
    kicker: 'Privacy Policy',
    title: 'Your data should move with the same care as your ride.',
    lede: 'A clear view of how TheRain handles location, ride, payment, and account information.',
    updated: 'Effective May 15, 2026',
    sections: privacySections,
  },
  terms: {
    icon: Scale,
    kicker: 'Terms & Conditions',
    title: 'Simple rules for a trusted mobility network.',
    lede: 'The standards that protect riders, drivers, payments, and the reliability of TheRain.',
    updated: 'Effective May 15, 2026',
    sections: termsSections,
  },
};

export default function LegalPage({ type }) {
  const page = content[type] || content.privacy;
  const Icon = page.icon;

  return (
    <main className="premium-page">
      <div className="page-container">
        <section className="page-hero">
          <motion.div className="page-hero__content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="page-kicker">{page.kicker}</span>
            <h1>{page.title}</h1>
            <p>{page.lede}</p>
          </motion.div>
        </section>

        <section className="page-section">
          <div className="legal-layout">
            <aside className="legal-index">
              <div className="legal-index__stamp">
                <Icon size={22} />
                <span>{page.updated}</span>
              </div>
              {page.sections.map(([title]) => (
                <a key={title} href={`#${slug(title)}`}>{title}</a>
              ))}
            </aside>

            <div className="legal-stack">
              <motion.article className="legal-card legal-card--intro" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <FileCheck size={24} />
                <h2>Designed for clarity.</h2>
                <p>This page is a product-friendly summary for trust and transparency. Formal versions may be updated as TheRain launches services, payments, and regional operations.</p>
              </motion.article>

              {page.sections.map(([title, body, points], index) => (
                <motion.article
                  className="legal-card"
                  id={slug(title)}
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.18) }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{title}</h2>
                  <p>{body}</p>
                  <ul>
                    {points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
