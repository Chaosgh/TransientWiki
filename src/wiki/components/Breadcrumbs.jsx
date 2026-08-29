import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ homeLabel, homePath, title }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link href={homePath} className={styles.crumb}>{homeLabel}</Link>
      <span className={styles.sep}>›</span>
      <span className={`${styles.crumb} ${styles.current}`}>{title}</span>
    </nav>
  );
}
