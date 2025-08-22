import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`container ${styles.about}`}>
      <h2 className="heading-font">About Us</h2>
      <p>Pioneering the market, Fouad Baayno opened his first shop in 1964 and launched the first bookbinding factory in 1972.</p>
    </section>
  );
}
