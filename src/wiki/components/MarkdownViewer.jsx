'use client';

/* eslint-disable @next/next/no-img-element */
import { Children, createElement, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkWikiLink from 'remark-wiki-link';
import { Hash } from 'lucide-react';
import Lightbox from './Lightbox';
import styles from './MarkdownViewer.module.css';

function slugify(value = '') {
  return String(value)
    .replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function childrenText(children) {
  return Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return child;
    return child?.props?.children ? childrenText(child.props.children) : '';
  }).join('');
}

function heading(Tag, label) {
  return function Heading({ children, node, ...props }) {
    void node;
    const id = slugify(childrenText(children));
    return (
      <div className={styles.headingWrapper}>
        {createElement(Tag, { id, ...props }, children)}
        <button className={styles.anchorLink} aria-label={label} title={label} onClick={() => {
          window.history.replaceState(null, '', `#${id}`);
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }}><Hash size={14} /></button>
      </div>
    );
  };
}

export default function MarkdownViewer({ content, locale }) {
  const [lightbox, setLightbox] = useState(null);
  const label = locale === 'de' ? 'Link zu diesem Abschnitt' : 'Link to this section';
  const components = {
    h1: heading('h1', label), h2: heading('h2', label), h3: heading('h3', label),
    a({ children, href = '', node, ...props }) {
      void node;
      if (href.startsWith('/')) return <Link href={href} {...props}>{children}</Link>;
      if (/^https?:\/\//.test(href)) return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
      return <a href={href} {...props}>{children}</a>;
    },
    table({ children, node, ...props }) { void node; return <div className={styles.tableWrap}><table {...props}>{children}</table></div>; },
    img({ alt, node, src, ...props }) { void node; return <img src={src} alt={alt || ''} {...props} style={{ cursor: 'zoom-in' }} onClick={() => setLightbox({ alt, src })} />; },
  };

  return (
    <>
      <div className={styles.markdown}>
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm, [remarkWikiLink, { aliasDivider: '|', hrefTemplate: (permalink) => `/${locale}/wiki/${permalink}`, pageResolver: (name) => [name.split('/').map(slugify).join('/')] }]]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
