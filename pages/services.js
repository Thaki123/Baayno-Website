import Head from 'next/head';
import Layout from '@/components/Layout';
import Services from '@/components/Services';

export default function ServicesPage() {
  return (
    <Layout>
      <Head>
        <title>Services - Baayno</title>
      </Head>
      <Services />
    </Layout>
  );
}
