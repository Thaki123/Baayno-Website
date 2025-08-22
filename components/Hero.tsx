import BookAnimation from './BookAnimation';

export default function Hero() {
  const scrollToQuote = (): void => {
    if (typeof document !== 'undefined') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="hero" id="hero">
      <div className="hero-content container">
        <BookAnimation />
        <h1 className="heading-font">Handcrafted Bookbinding</h1>
        <p>Precision Bookbinding &amp; Finishing</p>
        <button
          className="btn btn-primary"
          onClick={scrollToQuote}
          aria-label="Request a Quote"
        >
          Request a Quote
        </button>
      </div>
    </section>
  );
}
