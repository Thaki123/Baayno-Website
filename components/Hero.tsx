import useTranslation from 'next-translate/useTranslation';

export default function Hero() {
  const { t } = useTranslation();
  const scrollToQuote = (): void => {
    if (typeof document !== 'undefined') {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="hero" id="hero">
      <div className="hero-content container">
        <h1 className="heading-font">{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <button className="btn btn-primary" onClick={scrollToQuote}>{t('hero.cta')}</button>
      </div>
    </section>
  );
}
