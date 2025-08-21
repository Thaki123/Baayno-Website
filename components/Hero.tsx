export default function Hero() {
  const scrollToQuote = (): void => {
    if (typeof document !== 'undefined') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="hero" id="hero">
      <div className="hero-content container">
        <h1 className="heading-font">Handcrafted Bookbinding</h1>
        <p>Precision Bookbinding &amp; Finishing</p>
        <button className="btn btn-primary" onClick={scrollToQuote}>Request a Quote</button>
      </div>
    </section>
  );
}
