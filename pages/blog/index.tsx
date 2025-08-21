import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Blog from '@/components/Blog';
import SEO from '@/components/SEO';
import { getAllPosts } from '@/lib/posts';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title={t('seo.blogTitle')}
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
