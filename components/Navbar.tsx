import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = (): void => setOpen(!open);
  const close = (): void => setOpen(false);
  const router = useRouter();
  const isActive = (path: string): boolean => router.pathname === path;
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
            <Link href="/" className={isActive('/') ? styles.active : undefined} onClick={close}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" className={isActive('/services') ? styles.active : undefined} onClick={close}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className={isActive('/portfolio') ? styles.active : undefined} onClick={close}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/blog" className={isActive('/blog') ? styles.active : undefined} onClick={close}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className={isActive('/contact') ? styles.active : undefined} onClick={close}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <button className={styles.navToggle} aria-label="Toggle navigation" aria-controls="nav-links" aria-expanded={open} onClick={toggle}>
        &#9776;
      </button>
    </header>
  );
}
