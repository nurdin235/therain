import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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
      delay: 2.75,
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
      delay: 2.95,
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
      delay: 3.15 + index * 0.13,
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
      delay: 3.45 + index * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playbackId, setPlaybackId] = useState(0);
  const activeCar = cars[activeIndex];
  const sectionStyle = useMemo(
    () => ({
      "--hero-bg-top": activeCar.studio.bgTop,
      "--hero-bg-mid": activeCar.studio.bgMid,
      "--hero-bg-bottom": activeCar.studio.bgBottom,
      "--hero-glow": activeCar.studio.glow,
      "--hero-glow-soft": activeCar.studio.glowSoft,
      "--hero-floor-tint": activeCar.studio.floorTint,
      "--hero-theme": activeCar.themeColor,
    }),
    [activeCar]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % cars.length);
      setPlaybackId((current) => current + 1);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setPlaybackId((current) => current + 1);
  };

  return (
    <section className="hero-carousel" id="rent" style={sectionStyle}>
      <AnimatePresence mode="sync">
        <motion.div
          key={`${activeCar.id}-background`}
          className="hero-carousel__theme-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <Hero3DCar
        modelPath={activeCar.modelPath}
        playKey={`${activeIndex}-${playbackId}`}
        studio={activeCar.studio}
      />

      <div className="hero-carousel__studio-gradient" />
      <div className="hero-carousel__text-vignette" />

      <div className="hero-carousel__content">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCar.id}-${playbackId}`}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -42, filter: "blur(6px)", transition: { duration: 0.32 } }}
            className="hero-carousel__copy"
          >
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
            onClick={() => handleDotClick(index)}
            className={`hero-carousel__dot ${index === activeIndex ? "hero-carousel__dot--active" : ""}`}
            aria-label={`Show ${car.name}`}
          />
        ))}
      </div>

      <BookingBar />
    </section>
  );
}
