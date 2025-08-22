import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggle = (): void => setOpen(!open);
  const close = (): void => setOpen(false);
  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  const router = useRouter();
  const isActive = (path: string): boolean => router.pathname === path;
  const { t } = useTranslation('common');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = stored ?? 'dark';
    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
  }, []);
  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo} onClick={close}>
        <Image
          src={`${router.basePath}/logo.svg`}
          alt="Fouad Baayno Bookbindery logo"
          width={640}
          height={289}
        />
      </Link>
      <nav>
        <ul id="nav-links" className={`${styles.navLinks} ${open ? styles.open : ''}`}>
          <li>
            <Link href="/" onClick={close} className={isActive('/') ? styles.active : ''}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={close} className={isActive('/services') ? styles.active : ''}>
              {t('services')}
            </Link>
          </li>
          <li>
            <Link href="/portfolio" onClick={close} className={isActive('/portfolio') ? styles.active : ''}>
              {t('portfolio')}
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={close} className={isActive('/blog') ? styles.active : ''}>
              {t('blog')}
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={close} className={isActive('/contact') ? styles.active : ''}>
              {t('contact')}
            </Link>
          </li>
        </ul>
      </nav>
      <button onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? t('themeDark') : t('themeLight')}
      </button>
      <motion.button
        className={styles.navToggle}
        aria-label="Toggle navigation"
        aria-controls="nav-links"
        aria-expanded={open}
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.button>
    </header>
  );
}
