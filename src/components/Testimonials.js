import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonialsData = [
  {
    name: 'Manka A.',
    role: 'Rider in Bamenda',
    text: 'Fast pickup. Clean tracking. It feels like the city finally has a modern ride experience.',
  },
  {
    name: 'Foncha N.',
    role: 'Driver applicant',
    text: 'The earning dashboard is what caught me. It feels serious, organized, and built for drivers.',
  },
  {
    name: 'Claudia T.',
    role: 'Business rider',
    text: 'VIP rides with live safety and verified drivers is exactly what I want for work trips.',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <span className="badge">People feel it</span>
          <h2 className="title">Premium mobility has to feel safe, fast, and worth it.</h2>
        </div>
        <div className="testimonials__grid">
          {testimonialsData.map((testimonial, index) => (
            <motion.article
              className="testimonial-card"
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Quote size={24} />
              <p>{testimonial.text}</p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">{testimonial.name.slice(0, 1)}</div>
                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
