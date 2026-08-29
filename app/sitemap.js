import { LOCALES, PAGE_DEFINITIONS, SITE_URL, wikiPath } from '../src/wiki/content';

export const dynamic = 'force-static';

export default function sitemap() {
  const lastModified = new Date();
  const landingPages = [
    {
      url: new URL('/', SITE_URL).toString(),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          'x-default': new URL('/', SITE_URL).toString(),
          de: new URL('/de/', SITE_URL).toString(),
          en: new URL('/en/', SITE_URL).toString(),
        },
      },
    },
    ...LOCALES.map((locale) => ({
      url: new URL(`/${locale}/`, SITE_URL).toString(),
      lastModified,
      changeFrequency: 'weekly',
      priority: locale === 'de' ? 1 : 0.9,
      alternates: {
        languages: {
          'x-default': new URL('/', SITE_URL).toString(),
          de: new URL('/de/', SITE_URL).toString(),
          en: new URL('/en/', SITE_URL).toString(),
        },
      },
    })),
  ];
  const wikiPages = LOCALES.flatMap((locale) => PAGE_DEFINITIONS.map((definition) => ({
    url: new URL(wikiPath(locale, definition.routes[locale]), SITE_URL).toString(),
    lastModified,
    changeFrequency: definition.id === 'home' ? 'weekly' : 'monthly',
    priority: definition.id === 'home' ? 1 : 0.7,
    alternates: {
      languages: {
        'x-default': new URL(wikiPath('de', definition.routes.de), SITE_URL).toString(),
        de: new URL(wikiPath('de', definition.routes.de), SITE_URL).toString(),
        en: new URL(wikiPath('en', definition.routes.en), SITE_URL).toString(),
      },
    },
  })));
  return [...landingPages, ...wikiPages];
}
