import Layout from '@/components/Layout';
import Services from '@/components/Services';
import SEO from '@/components/SEO';
import useTranslation from 'next-translate/useTranslation';

export default function ServicesPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title={t('seo.servicesTitle')}
        canonical="https://www.baayno.com/services"
      />
      <Services />
    </Layout>
  );
}
