import styles from './Hero.module.css';

export default function Hero() {
  const scrollToQuote = (): void => {
    if (typeof document !== 'undefined') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className={styles.hero} id="hero">
      <div className={`${styles.content} container`}>
        <h1 className="heading-font">Handcrafted Bookbinding</h1>
        <p>Precision Bookbinding &amp; Finishing</p>
        <button className="btn btn-primary" onClick={scrollToQuote}>Request a Quote</button>
      </div>
    </section>
  );
}
