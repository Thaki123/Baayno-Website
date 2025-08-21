import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import SEO from '@/components/SEO';

export default function PortfolioPage() {
  return (
    <Layout>
      <SEO
        title="Portfolio - Baayno"
        canonical="https://www.baayno.com/portfolio"
      />
      <Portfolio />
    </Layout>
  );
}
