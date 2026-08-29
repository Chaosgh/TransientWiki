'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Building2, ChevronDown, Compass, Flame, Github, Lock, Mail, Pickaxe, Shield, Trophy, Users, Youtube } from 'lucide-react';
import styles from './Sidebar.module.css';

const ICONS = { building: Building2, compass: Compass, flame: Flame, pickaxe: Pickaxe, trophy: Trophy, users: Users };
const COPY = {
  de: { contact: 'Kontakt', legal: 'Impressum', privacy: 'Datenschutz', rules: 'Regelwerk', home: 'Startseite' },
  en: { contact: 'Contact', legal: 'Legal notice', privacy: 'Privacy', rules: 'Rules', home: 'Home' },
};

function NavItem({ item, onClose, sub = false }) {
  const pathname = usePathname();
  return (
    <Link href={item.path} className={`${styles.link} ${sub ? styles.subLink : ''} ${pathname === item.path ? styles.activeLink : ''}`} onClick={onClose}>
      {item.name}
    </Link>
  );
}

export default function Sidebar({ isOpen, locale, navigation, onClose }) {
  const [openFolders, setOpenFolders] = useState({});
  const copy = COPY[locale];
  const isFolderOpen = (name) => openFolders[name] !== false;

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav} aria-label="Wiki">
          <NavItem item={{ ...navigation.home, name: copy.home }} onClose={onClose} />
          {navigation.topLevel.map((item) => <NavItem key={item.id} item={item} onClose={onClose} />)}
          {navigation.folders.map((folder) => {
            const CategoryIcon = ICONS[folder.icon];
            const open = isFolderOpen(folder.name);
            return (
              <div key={folder.name}>
                <button className={styles.categoryHeader} onClick={() => setOpenFolders((state) => ({ ...state, [folder.name]: !open }))} aria-expanded={open}>
                  {CategoryIcon && <CategoryIcon size={13} className={styles.categoryIcon} />}
                  {folder.name}
                  <ChevronDown size={12} className={`${styles.chevron} ${!open ? styles.chevronClosed : ''}`} />
                </button>
                <div className={`${styles.folderItems} ${!open ? styles.folderItemsClosed : ''}`}>
                  <div className={styles.folderItemsInner}>
                    {folder.items.map((item) => <NavItem key={item.id} item={item} sub onClose={onClose} />)}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="mailto:business@transientcodes.de" className={styles.footerLink} title={copy.contact}><Mail size={18} /><span>{copy.contact}</span></a>
            <Link href={navigation.footer.legal.path} className={styles.footerLink} title={copy.legal}><Shield size={18} /><span>{copy.legal}</span></Link>
            <Link href={navigation.footer.rules.path} className={styles.footerLink} title={copy.rules}><Book size={18} /><span>{copy.rules}</span></Link>
            <Link href={navigation.footer.privacy.path} className={styles.footerLink} title={copy.privacy}><Lock size={18} /><span>{copy.privacy}</span></Link>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://discord.gg/9ccpRrWejj" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Discord" aria-label="Discord">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </a>
            <a href="https://www.youtube.com/@TransientRealmDE" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="YouTube" aria-label="YouTube"><Youtube size={18} /></a>
            <a href="https://github.com/TransientCodes" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="GitHub" aria-label="GitHub"><Github size={18} /></a>
          </div>
          <div className={styles.copyright}>© 2026 Transient Realm</div>
        </div>
      </aside>
    </>
  );
}
