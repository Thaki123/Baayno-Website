import Link from 'next/link';

export default function Blog({ posts = [] }) {
  return (
    <section id="blog" className="blog container">
      <h2 className="heading-font">Blog</h2>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            {post.image && (
              <img src={post.image} alt={post.title} loading="lazy" />
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
