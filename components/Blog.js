const blogData = [
  {
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    title: 'The Art of Book Restoration',
    description: 'A behind-the-scenes look at bringing books back to life.'
  },
  {
    img: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=80',
    title: 'Choosing the Right Paper',
    description: 'Tips for selecting paper for your project.'
  },
  {
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    title: 'Binding Trends 2025',
    description: 'What’s new in the world of bookbinding.'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="blog container">
      <h2 className="heading-font">Blog</h2>
      <div className="blog-grid">
        {blogData.map((post, idx) => (
          <article key={idx} className="card">
            <img src={post.img} alt={post.title} loading="lazy" />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
