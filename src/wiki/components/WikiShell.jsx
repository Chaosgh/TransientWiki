'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, Languages, Menu, Search as SearchIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './Layout.module.css';
import Search from './Search';
import Sidebar from './Sidebar';

const COPY = {
  de: { menu: 'Menü umschalten', search: 'Suchen', skip: 'Zum Inhalt springen', top: 'Nach oben' },
  en: { menu: 'Toggle menu', search: 'Search', skip: 'Skip to content', top: 'Back to top' },
};

export default function WikiShell({ children, locale, navigation, searchIndex }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef(null);
  const pathname = usePathname();
  const copy = COPY[locale];

  const languageHref = useMemo(() => {
    const allLinks = [
      navigation.home,
      ...navigation.topLevel,
      ...navigation.folders.flatMap((folder) => folder.items),
      ...Object.values(navigation.footer),
    ];
    return allLinks.find((link) => link.path === pathname)?.alternate || `/${locale === 'de' ? 'en' : 'de'}/wiki`;
  }, [locale, navigation, pathname]);

  const searchKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    const frame = window.requestAnimationFrame(() => {
      setProgress(0);
      setIsSidebarOpen(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      } else if (
        event.key === '/' &&
        !isSearchOpen &&
        !['INPUT', 'TEXTAREA'].includes(event.target.tagName) &&
        !event.target.isContentEditable
      ) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSearchOpen]);

  const handleScroll = () => {
    const element = contentRef.current;
    if (!element) return;
    const available = element.scrollHeight - element.clientHeight;
    setProgress(available > 0 ? Math.min(100, (element.scrollTop / available) * 100) : 0);
  };

  return (
    <div className={styles.container}>
      <a href="#main-content" className={styles.skipLink}>{copy.skip}</a>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} aria-hidden="true" />

      <header className={styles.header}>
        <button className={styles.menuButton} onClick={() => setIsSidebarOpen((value) => !value)} aria-label={copy.menu}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={styles.branding}>
          <Image src="/logo.png" alt="TransientRealm" className={styles.logo} width={38} height={28} priority />
          <Link href={navigation.home.path} className={styles.title}>TransientRealm Wiki</Link>
        </div>
        <div className={styles.headerActions}>
          <Link href={languageHref} className={styles.languageButton} hrefLang={locale === 'de' ? 'en' : 'de'}>
            <Languages size={15} />
            <span>{locale === 'de' ? 'EN' : 'DE'}</span>
          </Link>
          <button className={styles.searchButton} onClick={() => setIsSearchOpen(true)} aria-label={copy.search}>
            <SearchIcon size={15} />
            <span className={styles.searchLabel}>{copy.search}</span>
            <kbd className={styles.searchKbd}>{searchKey}</kbd>
          </button>
        </div>
      </header>

      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} locale={locale} navigation={navigation} onClose={() => setIsSidebarOpen(false)} />
        <main className={styles.content} ref={contentRef} onScroll={handleScroll} id="main-content" tabIndex={-1}>
          <div className={styles.contentInner}>{children}</div>
        </main>
      </div>

      {progress > 20 && (
        <button className={styles.backTop} onClick={() => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={copy.top} title={copy.top}>
          <ArrowUp size={18} />
        </button>
      )}

      {isSearchOpen && <Search entries={searchIndex} locale={locale} onClose={() => setIsSearchOpen(false)} />}
    </div>
  );
}
