import { LOCALES, PAGE_DEFINITIONS, SITE_URL, wikiPath } from '../src/wiki/content';

export const dynamic = 'force-static';

function absolutePath(pathname) {
  const canonicalPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return new URL(canonicalPath, SITE_URL).toString();
}

export default function sitemap() {
  const landingPages = LOCALES.map((locale) => ({
      url: new URL(`/${locale}/`, SITE_URL).toString(),
      changeFrequency: 'weekly',
      priority: locale === 'de' ? 1 : 0.9,
      alternates: {
        languages: {
          'x-default': new URL('/de/', SITE_URL).toString(),
          'de-DE': new URL('/de/', SITE_URL).toString(),
          'en-US': new URL('/en/', SITE_URL).toString(),
        },
      },
    }));
  const wikiPages = LOCALES.flatMap((locale) => PAGE_DEFINITIONS.map((definition) => ({
    url: absolutePath(wikiPath(locale, definition.routes[locale])),
    changeFrequency: definition.id === 'home' ? 'weekly' : 'monthly',
    priority: definition.id === 'home' ? 1 : 0.7,
    alternates: {
      languages: {
        'x-default': absolutePath(wikiPath('de', definition.routes.de)),
        'de-DE': absolutePath(wikiPath('de', definition.routes.de)),
        'en-US': absolutePath(wikiPath('en', definition.routes.en)),
      },
    },
  })));
  return [...landingPages, ...wikiPages];
}
