import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import About from '@/components/About';
import QuoteForm from '@/components/QuoteForm';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <SEO
        title={t('seoTitle')}
        description={t('seoDescription')}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
