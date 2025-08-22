import Link from 'next/link';
import Image from 'next/image';
import type { PostMeta } from '@/lib/posts';
import styles from './Blog.module.css';
import cardStyles from './Card.module.css';

interface BlogProps {
  posts?: PostMeta[];
}

export default function Blog({ posts = [] }: BlogProps) {
  return (
    <section id="blog" className={`container ${styles.blog}`}>
      <h2 className="heading-font">Blog</h2>
      <div className={styles.blogGrid}>
        {posts.map((post) => (
          <article key={post.slug} className={cardStyles.card}>
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
            <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${post.title}`}>
              Read more
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
