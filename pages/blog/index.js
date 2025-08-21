import Layout from '@/components/Layout';
import Blog from '@/components/Blog';
import SEO from '@/components/SEO';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <SEO
        title="Blog - Baayno"
        canonical="https://www.baayno.com/blog"
      />
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
