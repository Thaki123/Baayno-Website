import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Portfolio.module.css';

interface PortfolioItem {
  img: string;
  title: string;
  description: string;
}

const portfolioData: PortfolioItem[] = [
  {
    img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    title: 'Restored Antique Book',
    description: 'Full restoration of a 19th-century volume.'
  },
  {
    img: 'https://images.unsplash.com/photo-1528209390973-5a63a78f9368?auto=format&fit=crop&w=600&q=80',
    title: 'Custom Leather Journal',
    description: 'Hand-stitched leather-bound journal.'
  },
  {
    img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    title: 'Limited Edition Binding',
    description: 'Small-batch artisan book covers.'
  }
];

export default function Portfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [spans, setSpans] = useState<number[]>(portfolioData.map(() => 1));

  const rowHeight = 10;

  const handleLoad = (idx: number, img: HTMLImageElement) => {
    const height = (img.naturalHeight / img.naturalWidth) * img.width;
    const span = Math.ceil(height / rowHeight);
    setSpans((prev) => {
      const next = [...prev];
      next[idx] = span;
      return next;
    });
  };

  const openLightbox = (item: PortfolioItem) => {
    setSelected(item);
    // allow lightbox to mount before fading in
    setTimeout(() => setLightboxOpen(true), 0);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // wait for fade-out transition
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <section id="portfolio" className={`container ${styles.portfolio}`}>
      <h2 className="heading-font">Portfolio</h2>
      <div className={styles.portfolioGrid}>
        {portfolioData.map((item, idx) => (
          <motion.article
            key={idx}
            className={`card ${styles.card}`}
            style={{ gridRowEnd: `span ${spans[idx]}` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => openLightbox(item)}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto' }}
              onLoadingComplete={(img) => handleLoad(idx, img)}
            />
            <div className={styles.caption}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
      {selected && (
        <div
          className={`${styles.lightbox} ${styles.open}`}
          style={{
            opacity: lightboxOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onClick={closeLightbox}
        >
          <span className={styles.lightboxClose} onClick={closeLightbox}>
            &times;
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={selected.img}
              alt={selected.title}
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
            <div className={styles.lightboxCaption}>{selected.title}</div>
          </div>
        </div>
      )}
    </section>
  );
}
