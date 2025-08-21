import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Blog from '@/components/Blog';
import SEO from '@/components/SEO';
import { getAllPosts } from '@/lib/posts';

interface Post {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

interface BlogPageProps {
  posts: Post[];
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
  const posts = getAllPosts() as Post[];
  return {
    props: {
      posts,
    },
  };
};
