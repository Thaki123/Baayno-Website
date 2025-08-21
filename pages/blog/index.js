import Head from 'next/head';
import Layout from '@/components/Layout';
import Blog from '@/components/Blog';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Blog - Baayno</title>
      </Head>
      <Blog posts={posts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
