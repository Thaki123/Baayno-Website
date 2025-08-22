import Image from 'next/image';
import { useState } from 'react';

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
    <section id="portfolio" className="portfolio container">
      <h2 className="heading-font">Portfolio</h2>
      <div className="portfolio-grid">
        {portfolioData.map((item, idx) => (
          <article key={idx} className="card">
            <Image
              src={item.img}
              alt={item.title}
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto' }}
              onClick={() => openLightbox(item)}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      {selected && (
        <div
          className="lightbox open"
          style={{
            opacity: lightboxOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onClick={closeLightbox}
        >
          <span className="lightbox-close" onClick={closeLightbox}>
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
            <div className="lightbox-caption">{selected.title}</div>
          </div>
        </div>
      )}
    </section>
  );
}
