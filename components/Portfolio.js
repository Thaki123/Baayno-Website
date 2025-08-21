const portfolioData = [
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
  return (
    <section id="portfolio" className="portfolio container">
      <h2 className="heading-font">Portfolio</h2>
      <div className="portfolio-grid">
        {portfolioData.map((item, idx) => (
          <article key={idx} className="card">
            <img src={item.img} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
