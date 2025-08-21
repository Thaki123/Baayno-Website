import { useEffect, ReactNode } from 'react';
import Navbar from './Navbar';
import useTranslation from 'next-translate/useTranslation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
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
        <p>{t('layout.footer')}</p>
      </footer>
    </>
  );
}
