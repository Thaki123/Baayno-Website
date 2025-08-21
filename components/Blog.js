import Link from 'next/link';
import Image from 'next/image';

export default function Blog({ posts = [] }) {
  return (
    <section id="blog" className="blog container">
      <h2 className="heading-font">Blog</h2>
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
            <Link href={`/blog/${post.slug}`}>Read more</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
