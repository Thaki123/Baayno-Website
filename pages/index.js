import Head from 'next/head';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import QuoteForm from '@/components/QuoteForm';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Baayno — Bookbinding & Finishing</title>
        <meta name="description" content="Precision bookbinding & finishing" />
      </Head>
      <Hero />
      <About />
      <QuoteForm />
      <Services />
      <Portfolio />
      <Blog />
    </Layout>
  );
}
