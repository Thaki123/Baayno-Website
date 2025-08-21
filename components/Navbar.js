import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);
  return (
    <header className="navbar">
      <Link href="/" className="logo" onClick={close}>
        <img src="/logo.svg" alt="Fouad Baayno Bookbindery logo" loading="lazy" />
      </Link>
      <nav>
        <ul className={open ? 'nav-links open' : 'nav-links'}>
          <li><Link href="/" onClick={close}>Home</Link></li>
          <li><Link href="/services" onClick={close}>Services</Link></li>
          <li><Link href="/portfolio" onClick={close}>Portfolio</Link></li>
          <li><Link href="/blog" onClick={close}>Blog</Link></li>
          <li><Link href="/contact" onClick={close}>Contact</Link></li>
        </ul>
      </nav>
      <button id="nav-toggle" aria-label="Toggle navigation" aria-controls="nav-links" aria-expanded={open} onClick={toggle}>
        &#9776;
      </button>
    </header>
  );
}
