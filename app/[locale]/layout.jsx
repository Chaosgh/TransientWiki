import '../globals.css';
import { LOCALES, isLocale } from '../../src/wiki/content';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL('https://transientrealm.de'),
  applicationName: 'TransientRealm',
  icons: { icon: '/icon.png', apple: '/icon.png' },
  openGraph: {
    type: 'website',
    siteName: 'TransientRealm',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TransientRealm' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};

export const viewport = { colorScheme: 'dark', themeColor: '#0d1016' };

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale}><body>{children}</body></html>;
}
