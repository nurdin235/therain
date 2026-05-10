import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Hero3DCar from "./Hero3DCar";
import BookingBar from "./BookingBar";
import { cars } from "../data/cars";
import "./HeroCarousel.css";

const titleAnim = {
  hidden: {
    opacity: 0,
    x: -90,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: 2.0,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const subtitleAnim = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 2.2,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemAnim = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 2.4 + index * 0.13,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const buttonAnim = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.96,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 2.8 + index * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCar = cars[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % cars.length);
    }, 8500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-carousel" id="rent">
      <Hero3DCar modelPath={activeCar.modelPath} playKey={activeIndex} />

      <div className="hero-carousel__studio-gradient" />
      <div className="hero-carousel__text-vignette" />

      <div className="hero-carousel__content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCar.id}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
            className="hero-carousel__copy"
          >
            <motion.p variants={subtitleAnim} className="hero-carousel__eyebrow">
              Premium {activeCar.category} Rental
            </motion.p>

            <motion.h1 variants={titleAnim} className="hero-carousel__title">
              {activeCar.name}
            </motion.h1>

            <motion.p variants={subtitleAnim} className="hero-carousel__subtitle">
              {activeCar.tagline}
            </motion.p>

            <div className="hero-carousel__features">
              {activeCar.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  custom={index}
                  variants={itemAnim}
                  className="hero-carousel__feature"
                >
                  {feature}
                </motion.div>
              ))}
            </div>

            <div className="hero-carousel__actions">
              <motion.button custom={0} variants={buttonAnim} className="hero-carousel__button hero-carousel__button--primary">
                Rent Now
              </motion.button>

              <motion.button custom={1} variants={buttonAnim} className="hero-carousel__button hero-carousel__button--glass">
                View Details
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-carousel__dots">
        {cars.map((car, index) => (
          <button
            key={car.id}
            onClick={() => setActiveIndex(index)}
            className={`hero-carousel__dot ${index === activeIndex ? "hero-carousel__dot--active" : ""}`}
            aria-label={`Show ${car.name}`}
          />
        ))}
      </div>

      <BookingBar />
    </section>
  );
}
