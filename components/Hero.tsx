import BookAnimation from './BookAnimation';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setShowVideo(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToQuote = (): void => {
    if (typeof document !== 'undefined') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className={styles.hero} id="hero">
      {showVideo && (
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1280&q=80"
          aria-hidden="true"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-reading-a-book-7985/1080p.mp4"
            type="video/mp4"
          />
        </video>
      )}
      <div className={`container ${styles.content}`}>
        <BookAnimation />
        <motion.h1
          className="heading-font"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          Handcrafted Bookbinding
        </motion.h1>
        <p>Precision Bookbinding &amp; Finishing</p>
        <motion.button
          className="btn btn-primary"
          onClick={scrollToQuote}
          aria-label="Request a Quote"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeInOut' }}
        >
          Request a Quote
        </motion.button>
      </div>
    </section>
  );
}
