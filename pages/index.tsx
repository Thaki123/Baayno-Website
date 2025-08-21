import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import About from '@/components/About';
import QuoteForm from '@/components/QuoteForm';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import useTranslation from 'next-translate/useTranslation';

export default function Home() {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title={t('seo.homeTitle')}
        description={t('seo.homeDescription')}
        canonical="https://www.baayno.com/"
      />
      <Hero />
      <About />
      <QuoteForm />
      <Services />
      <Portfolio />
      <Blog />
    </Layout>
  );
}
