import useTranslation from 'next-translate/useTranslation';

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="about container">
      <h2 className="heading-font">{t('about.title')}</h2>
      <p>{t('about.text')}</p>
    </section>
  );
}
