import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Blog from '@/components/Blog';
import SEO from '@/components/SEO';
import { getAllPosts, type PostMeta } from '@/lib/posts';

interface BlogPageProps {
  posts: PostMeta[];
}

export default function BlogPage({ posts }: BlogPageProps) {
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

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
