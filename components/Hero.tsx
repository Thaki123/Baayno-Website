import BookAnimation from './BookAnimation';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollToQuote = (): void => {
    if (typeof document !== 'undefined') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.content}`}>
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
