import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = (): void => setOpen(!open);
  const close = (): void => setOpen(false);
  const router = useRouter();
  const isActive = (path: string): boolean => router.pathname === path;
  return (
    <header className="navbar">
      <Link href="/" className="logo" onClick={close}>
        <Image
          src={`${router.basePath}/logo.svg`}
          alt="Fouad Baayno Bookbindery logo"
          width={640}
          height={289}
        />
      </Link>
      <nav>
        <ul id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
          <li>
            <Link href="/" onClick={close} className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={close} className={isActive('/services') ? 'active' : ''}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/portfolio" onClick={close} className={isActive('/portfolio') ? 'active' : ''}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={close} className={isActive('/blog') ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={close} className={isActive('/contact') ? 'active' : ''}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <motion.button
        id="nav-toggle"
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
