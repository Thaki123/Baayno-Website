import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import LanguageModal from './LanguageModal';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const main = document.querySelector('main');
    if (!main) return;
    const sections = main.querySelectorAll('section');
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
  }, [router.asPath]);

  return (
    <div className="gradient-bg">
      <LanguageModal />
      <div className="sticky-header">
        <Navbar />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <main>
            {children}
            <footer>
              <p>&copy; 2025 Baayno Website</p>
            </footer>
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

