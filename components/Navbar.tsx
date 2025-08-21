import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = (): void => setOpen(!open);
  const close = (): void => setOpen(false);
  const router = useRouter();
  const { t, lang } = useTranslation();
  return (
    <header className="navbar">
      <Link href="/" className="logo" onClick={close}>
        <Image
          src={`${router.basePath}/logo.svg`}
          alt={t('navbar.logoAlt')}
          width={640}
          height={289}
        />
      </Link>
      <nav>
        <ul className={open ? 'nav-links open' : 'nav-links'}>
          <li><Link href="/" onClick={close}>{t('navbar.home')}</Link></li>
          <li><Link href="/services" onClick={close}>{t('navbar.services')}</Link></li>
          <li><Link href="/portfolio" onClick={close}>{t('navbar.portfolio')}</Link></li>
          <li><Link href="/blog" onClick={close}>{t('navbar.blog')}</Link></li>
          <li><Link href="/contact" onClick={close}>{t('navbar.contact')}</Link></li>
        </ul>
      </nav>
      <select
        className="lang-switcher"
        aria-label={t('navbar.language')}
        value={lang}
        onChange={(e) => router.push(router.asPath, router.asPath, { locale: e.target.value })}
      >
        <option value="en">EN</option>
        <option value="ar">AR</option>
        <option value="fr">FR</option>
      </select>
      <button id="nav-toggle" aria-label="Toggle navigation" aria-controls="nav-links" aria-expanded={open} onClick={toggle}>
        &#9776;
      </button>
    </header>
  );
}
