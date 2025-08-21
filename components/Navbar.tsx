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
          <li><Link href="/" onClick={close}>Home</Link></li>
          <li><Link href="/services" onClick={close}>Services</Link></li>
          <li><Link href="/portfolio" onClick={close}>Portfolio</Link></li>
          <li><Link href="/blog" onClick={close}>Blog</Link></li>
          <li><Link href="/contact" onClick={close}>Contact</Link></li>
        </ul>
      </nav>
      <button className={styles.navToggle} aria-label="Toggle navigation" aria-controls="nav-links" aria-expanded={open} onClick={toggle}>
        &#9776;
      </button>
    </header>
  );
}
