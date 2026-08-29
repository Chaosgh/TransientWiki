import { notFound } from 'next/navigation';
import Breadcrumbs from '../../../../src/wiki/components/Breadcrumbs';
import MarkdownViewer from '../../../../src/wiki/components/MarkdownViewer';
import styles from './page.module.css';
import {
  PAGE_DEFINITIONS,
  getBreadcrumbHome,
  getDefinitionBySlug,
  getJsonLd,
  getPage,
  getPageMetadata,
  isLocale,
  wikiPath,
} from '../../../../src/wiki/content';

export const dynamicParams = false;

export function generateStaticParams({ params }) {
  if (!isLocale(params.locale)) return [];
  return PAGE_DEFINITIONS.map((definition) => ({
    slug: definition.routes[params.locale] ? definition.routes[params.locale].split('/') : [],
  }));
}

export async function generateMetadata({ params }) {
  const { locale, slug = [] } = await params;
  const definition = isLocale(locale) ? getDefinitionBySlug(locale, slug) : null;
  if (!definition) return {};
  return getPageMetadata(locale, definition);
}

export default async function WikiPage({ params }) {
  const { locale, slug = [] } = await params;
  const definition = isLocale(locale) ? getDefinitionBySlug(locale, slug) : null;
  if (!definition) notFound();
  const page = getPage(locale, definition);
  const jsonLd = getJsonLd(locale, page);
  const hasPrimaryHeading = /(^|\n)#\s+.+/.test(page.content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      {!page.isHome && <Breadcrumbs homeLabel={getBreadcrumbHome(locale)} homePath={wikiPath(locale)} title={page.title} />}
      {!hasPrimaryHeading && <h1 className={styles.pageTitle}>{page.title}</h1>}
      <MarkdownViewer content={page.content} locale={locale} />
    </>
  );
}
