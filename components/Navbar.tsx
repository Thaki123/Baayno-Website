import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = (): void => setOpen(!open);
  const close = (): void => setOpen(false);
  const router = useRouter();
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
        <AnimatePresence>
          {open && (
            <motion.ul
              id="nav-links"
              className="nav-links open"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              exit={{ x: '100%', opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            >
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link href="/" onClick={close}>Home</Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Link href="/services" onClick={close}>Services</Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link href="/portfolio" onClick={close}>Portfolio</Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/blog" onClick={close}>Blog</Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Link href="/contact" onClick={close}>Contact</Link>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
      <motion.button
        id="nav-toggle"
        aria-label="Toggle navigation"
        aria-controls="nav-links"
        aria-expanded={open}
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
      >
        &#9776;
      </motion.button>
    </header>
  );
}
