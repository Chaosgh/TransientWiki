'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Lightbox.module.css';

export default function Lightbox({ alt, onClose, src }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.close} onClick={onClose} aria-label="Close"><X size={20} /></button>
      <img src={src} alt={alt || ''} className={styles.image} onClick={(event) => event.stopPropagation()} />
    </div>
  );
}
