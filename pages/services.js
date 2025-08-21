import Layout from '@/components/Layout';
import Services from '@/components/Services';
import SEO from '@/components/SEO';

export default function ServicesPage() {
  return (
    <Layout>
      <SEO
        title="Services - Baayno"
        canonical="https://www.baayno.com/services"
      />
      <Services />
    </Layout>
  );
}
