import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import About from '@/components/About';
import QuoteForm from '@/components/QuoteForm';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Baayno — Bookbinding & Finishing"
        description="Precision bookbinding & finishing"
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
