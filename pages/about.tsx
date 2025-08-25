import Layout from '@/components/Layout';
import About from '@/components/About';
import SEO from '@/components/SEO';

export default function AboutPage() {
  return (
    <Layout>
      <SEO title="About - Baayno" canonical="https://www.baayno.com/about" />
      <About />
    </Layout>
  );
}
