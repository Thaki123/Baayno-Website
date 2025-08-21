import { useEffect } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => {
      sections.forEach(sec => observer.unobserve(sec));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="sticky-header">
        <Navbar />
      </div>
      {children}
      <footer>
        <p>&copy; 2025 Baayno Website</p>
      </footer>
    </>
  );
}
