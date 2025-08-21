import Head from 'next/head';
import Layout from '@/components/Layout';
import Blog from '@/components/Blog';

export default function BlogPage() {
  return (
    <Layout>
      <Head>
        <title>Blog - Baayno</title>
      </Head>
      <Blog />
    </Layout>
  );
}
