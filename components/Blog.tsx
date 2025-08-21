import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

interface Post {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

interface BlogProps {
  posts?: Post[];
}

export default function Blog({ posts = [] }: BlogProps) {
  const { t } = useTranslation();
  return (
    <section id="blog" className="blog container">
      <h2 className="heading-font">{t('blog.title')}</h2>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <Link href={`/blog/${post.slug}`}>{t('blog.readMore')}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
