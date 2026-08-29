'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import styles from './Search.module.css';

const COPY = {
  de: { dialog: 'Wiki-Suche', empty: 'Keine Ergebnisse für', hint: 'Tippe einen Suchbegriff — z. B. „Jobs“ oder „Plot“', placeholder: 'Suchen…' },
  en: { dialog: 'Wiki search', empty: 'No results for', hint: 'Enter a search term — e.g. “jobs” or “plot”', placeholder: 'Search…' },
};

const ALIASES = {
  de: { heimat: ['home'], zuhause: ['home'], geld: ['pfund', 'währung'], ip: ['adresse', 'transientrealm.de'], gilde: ['kult'], clan: ['kult'], beruf: ['job'] },
  en: { money: ['pounds', 'currency'], ip: ['address', 'transientrealm.de'], guild: ['cult'], clan: ['cult'], profession: ['job'], resource: ['farmworld'] },
};

function occurrences(haystack, needle) {
  return needle ? haystack.split(needle).length - 1 : 0;
}

function snippet(content, query) {
  const index = content.toLowerCase().indexOf(query.toLowerCase());
  const start = index < 0 ? 0 : Math.max(0, index - 45);
  const value = content.slice(start, index < 0 ? 125 : index + query.length + 90);
  return `${start > 0 ? '…' : ''}${value}${value.length < content.length ? '…' : ''}`;
}

export default function Search({ entries, locale, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef(null);
  const router = useRouter();
  const copy = COPY[locale];

  const results = useMemo(() => {
    const term = query.toLocaleLowerCase(locale).trim();
    if (!term) return [];
    const terms = [term, ...(ALIASES[locale][term] || [])];
    return entries
      .map((entry) => {
        const title = entry.title.toLocaleLowerCase(locale);
        const clean = entry.clean.toLocaleLowerCase(locale);
        let rank = Infinity;
        let frequency = 0;
        terms.forEach((candidate) => {
          if (title === candidate) rank = Math.min(rank, 0);
          else if (title.startsWith(candidate)) rank = Math.min(rank, 1);
          else if (title.includes(candidate)) rank = Math.min(rank, 2);
          else if (clean.includes(candidate)) rank = Math.min(rank, 3);
          frequency += occurrences(clean, candidate);
        });
        return { ...entry, frequency, rank };
      })
      .filter((entry) => Number.isFinite(entry.rank))
      .sort((left, right) => left.rank - right.rank || right.frequency - left.frequency)
      .slice(0, 7)
      .map((entry) => ({ ...entry, snippet: snippet(entry.clean, terms.find((term) => entry.clean.toLocaleLowerCase(locale).includes(term)) || term) }));
  }, [entries, locale, query]);

  const select = useCallback((route) => {
    router.push(route);
    onClose();
  }, [onClose, router]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((value) => Math.min(value + 1, results.length - 1)); }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((value) => Math.max(value - 1, -1)); }
      if (event.key === 'Enter' && selected >= 0 && results[selected]) select(results[selected].route);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, results, select, selected]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={copy.dialog} onClick={(event) => event.stopPropagation()}>
        <div className={styles.inputRow}>
          <SearchIcon size={16} className={styles.icon} />
          <input ref={inputRef} className={styles.input} placeholder={copy.placeholder} aria-label={copy.dialog} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(-1); }} />
          <button className={styles.close} onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        {query && results.length === 0 && <div className={styles.empty}>{copy.empty} “{query}”</div>}
        {results.length > 0 && (
          <ul className={styles.results}>
            {results.map((result, index) => (
              <li key={result.route}>
                <button className={`${styles.result} ${index === selected ? styles.resultActive : ''}`} onClick={() => select(result.route)} onMouseEnter={() => setSelected(index)}>
                  <span className={styles.resultHead}><span className={styles.resultTitle}>{result.title}</span>{result.category && <span className={styles.resultCat}>{result.category}</span>}</span>
                  <span className={styles.resultSnippet}>{result.snippet}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {!query && <div className={styles.empty}>{copy.hint}</div>}
      </div>
    </div>
  );
}
