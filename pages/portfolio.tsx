import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import SEO from '@/components/SEO';
import useTranslation from 'next-translate/useTranslation';

export default function PortfolioPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title={t('seo.portfolioTitle')}
        canonical="https://www.baayno.com/portfolio"
      />
      <Portfolio />
    </Layout>
  );
}
