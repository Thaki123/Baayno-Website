import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { getAllPostSlugs, getPostData, type PostData } from '@/lib/posts';

interface BlogPostProps {
  post: PostData;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - Baayno</title>
      </Head>
      <article className="container">
        <h1>{post.title}</h1>
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps, { slug: string }> = async ({ params }) => {
  const post = await getPostData(params!.slug);
  return {
    props: {
      post,
    },
  };
};
