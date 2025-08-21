import { useEffect, ReactNode } from 'react';
import Navbar from './Navbar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
      <div className={styles.stickyHeader}>
        <Navbar />
      </div>
      {children}
      <footer>
        <p>&copy; 2025 Baayno Website</p>
      </footer>
    </>
  );
}
