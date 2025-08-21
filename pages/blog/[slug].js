import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { getAllPostSlugs, getPostData } from '@/lib/posts';

export default function BlogPost({ post }) {
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

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostData(params.slug);
  return {
    props: {
      post,
    },
  };
}
