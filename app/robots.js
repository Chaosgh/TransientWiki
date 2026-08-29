import { SITE_URL } from '../src/wiki/content';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/404.html'] },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
    host: SITE_URL,
  };
}
