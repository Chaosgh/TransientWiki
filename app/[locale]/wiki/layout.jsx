import WikiShell from '../../../src/wiki/components/WikiShell';
import { getNavigation, isLocale } from '../../../src/wiki/content';
import { notFound } from 'next/navigation';

export default async function WikiLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <WikiShell locale={locale} navigation={getNavigation(locale)}>
      {children}
    </WikiShell>
  );
}
