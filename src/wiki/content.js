import 'server-only';

import fs from 'node:fs';
import path from 'node:path';

export const LOCALES = ['de', 'en'];
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://transientrealm.de';
export const SITE_NAME = 'TransientRealm Wiki';

const PAGE_ROUTES = {
  'home': ['', ''],
  'anfaenger-guide': ['anfaenger-guide', 'beginner-guide'],
  'server-systeme': ['server-systeme', 'server-systems'],
  'faq': ['faq', 'faq'],
  'Regelwerk': ['regelwerk', 'rules'],
  'Impressum': ['impressum', 'legal-notice'],
  'privacy': ['privacy', 'privacy'],
  'Anderes/Einführung': ['anderes/einfuehrung', 'other/getting-started'],
  'Anderes/befehle': ['anderes/befehle', 'other/commands'],
  'Anderes/Waehrungen': ['anderes/waehrungen', 'other/currencies'],
  'Anderes/Erlaubte Mods': ['anderes/erlaubte-mods', 'other/allowed-mods'],
  'Anderes/abstimmen': ['anderes/abstimmen', 'other/voting'],
  'Anderes/Citybuild': ['anderes/citybuild', 'other/citybuild'],
  'Anderes/Farmwelt': ['anderes/farmwelt', 'other/resource-world'],
  'Anderes/warps': ['anderes/warps', 'other/warps'],
  'Anderes/kistenshops': ['anderes/kistenshops', 'other/chest-shops'],
  'Anderes/Spieler-Raenge': ['anderes/spieler-raenge', 'other/player-ranks'],
  'Anderes/Advancements': ['anderes/advancements', 'other/advancements'],
  'Anderes/Kisten': ['anderes/kisten', 'other/crates'],
  'Anderes/Login-Belohnungen': ['anderes/login-belohnungen', 'other/login-rewards'],
  'Anderes/Daily Quests': ['anderes/daily-quests', 'other/daily-quests'],
  'Anderes/Badges': ['anderes/badges', 'other/badges'],
  'Anderes/Freunde': ['anderes/freunde', 'other/friends'],
  'Anderes/Labyrinth': ['anderes/labyrinth', 'other/maze'],
  'Anderes/allgemein': ['anderes/allgemein', 'other/overview'],
  'Jobs/allgemein': ['jobs/allgemein', 'jobs/overview'],
  'Jobs/berufe': ['jobs/berufe', 'jobs/professions'],
  'Jobs/Fäller': ['jobs/faeller', 'jobs/lumberjack'],
  'Jobs/Schürfer': ['jobs/schuerfer', 'jobs/miner'],
  'Jobs/Farmer': ['jobs/farmer', 'jobs/farmer'],
  'Jobs/Fleischer': ['jobs/fleischer', 'jobs/butcher'],
  'Jobs/Paladin': ['jobs/paladin', 'jobs/paladin'],
  'Jobs/Gastronom': ['jobs/gastronom', 'jobs/chef'],
  'Jobs/Forscher': ['jobs/forscher', 'jobs/researcher'],
  'Jobs/angeln': ['jobs/angeln', 'jobs/fishing'],
  'Jobs/Siegelmagier': ['jobs/siegelmagier', 'jobs/sigil-mage'],
  'Jobs/Runenmechaniker': ['jobs/runenmechaniker', 'jobs/rune-mechanic'],
  'Jobs/befehle': ['jobs/befehle', 'jobs/commands'],
  'Kult/allgemein': ['kult/allgemein', 'cults/overview'],
  'Kult/kulte': ['kult/kulte', 'cults/management'],
  'Kult/levelsystem': ['kult/levelsystem', 'cults/leveling'],
  'Kult/ränge': ['kult/raenge', 'cults/ranks'],
  'Kult/Fraktionen': ['kult/fraktionen', 'cults/factions'],
  'Kult/Wochenmarkt': ['kult/wochenmarkt', 'cults/weekly-market'],
  'Kult/befehle': ['kult/befehle', 'cults/commands'],
};

const TOP_LEVEL = ['anfaenger-guide', 'server-systeme', 'faq'];

const TITLE_OVERRIDES = {
  de: {
    'Anderes/allgemein': 'Weitere Systeme',
    'Jobs/allgemein': 'Jobs – Übersicht',
    'Kult/allgemein': 'Kulte – Übersicht',
  },
  en: {
    'Anderes/allgemein': 'Other systems',
    'Jobs/allgemein': 'Jobs overview',
    'Kult/allgemein': 'Cults overview',
    'Jobs/Fäller': 'Lumberjack',
    'Jobs/Schürfer': 'Miner',
    'Jobs/Gastronom': 'Chef',
    'Jobs/Siegelmagier': 'Sigil Mage',
    'Kult/Fraktionen': 'Factions',
    'Anderes/Kisten': 'Crates',
    'Anderes/kistenshops': 'Chest Shops',
    'Anderes/Waehrungen': 'Currencies',
  },
};

const CATEGORY_CONFIG = [
  {
    icon: 'compass',
    labels: { de: 'Erste Schritte', en: 'Getting started' },
    ids: ['Anderes/Einführung', 'Anderes/befehle', 'Anderes/Waehrungen', 'Anderes/Erlaubte Mods', 'Anderes/abstimmen'],
  },
  {
    icon: 'pickaxe',
    labels: { de: 'Jobs & Berufe', en: 'Jobs & professions' },
    ids: ['Jobs/allgemein', 'Jobs/berufe', 'Jobs/Fäller', 'Jobs/Schürfer', 'Jobs/Farmer', 'Jobs/Fleischer', 'Jobs/Paladin', 'Jobs/Gastronom', 'Jobs/Forscher', 'Jobs/angeln', 'Jobs/Siegelmagier', 'Jobs/Runenmechaniker', 'Jobs/befehle'],
  },
  {
    icon: 'building',
    labels: { de: 'Citybuild & Welt', en: 'Citybuild & world' },
    ids: ['Anderes/Citybuild', 'Anderes/Farmwelt', 'Anderes/warps', 'Anderes/kistenshops'],
  },
  {
    icon: 'flame',
    labels: { de: 'Kulte & Fraktionen', en: 'Cults & factions' },
    ids: ['Kult/allgemein', 'Kult/kulte', 'Kult/levelsystem', 'Kult/ränge', 'Kult/Fraktionen', 'Kult/Wochenmarkt', 'Kult/befehle'],
  },
  {
    icon: 'trophy',
    labels: { de: 'Fortschritt & Belohnungen', en: 'Progress & rewards' },
    ids: ['Anderes/Spieler-Raenge', 'Anderes/Advancements', 'Anderes/Kisten', 'Anderes/Login-Belohnungen', 'Anderes/Daily Quests', 'Anderes/Badges'],
  },
  {
    icon: 'users',
    labels: { de: 'Community & Aktivitäten', en: 'Community & activities' },
    ids: ['Anderes/Freunde', 'Anderes/Labyrinth'],
  },
];

const UI = {
  de: {
    breadcrumbHome: 'Startseite',
    defaultDescription: 'Offizielles Wiki für den Minecraft-Server TransientRealm mit Guides zu Jobs, Quests, Citybuild, Kisten, Wirtschaft und weiteren Spielsystemen.',
    homeTitle: 'TransientRealm Wiki | Guides, Jobs, Quests und Server-Systeme',
  },
  en: {
    breadcrumbHome: 'Home',
    defaultDescription: 'Official wiki for the TransientRealm Minecraft server, with guides to jobs, quests, Citybuild, crates, the economy and other game systems.',
    homeTitle: 'TransientRealm Wiki | Guides, Jobs, Quests and Server Systems',
  },
};

export function isLocale(locale) {
  return LOCALES.includes(locale);
}

export function wikiPath(locale, route = '') {
  return `/${locale}/wiki${route ? `/${route}` : ''}`;
}

export function absoluteUrl(urlPath) {
  return new URL(urlPath, SITE_URL).toString();
}

function sourceFile(locale, id) {
  return path.join(process.cwd(), 'content', locale, `${id}.md`);
}

export function getRawContent(locale, id) {
  return fs.readFileSync(sourceFile(locale, id), 'utf8');
}

function stripMarkdown(value = '') {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[`*_~>#|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(content, fallback) {
  const markdownHeading = content.match(/^#\s+(.+)$/m)?.[1];
  const htmlHeading = content.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1];
  return stripMarkdown(markdownHeading || htmlHeading || fallback);
}

function descriptionFrom(content, locale) {
  const paragraph = content
    .split(/\n{2,}/)
    .map(stripMarkdown)
    .find((block) => block.length > 90 && !block.startsWith('|'));
  const value = paragraph || UI[locale].defaultDescription;
  return value.length > 165 ? `${value.slice(0, 164).trimEnd()}…` : value;
}

function slugifyHeading(value = '') {
  return String(value)
    .replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function headings(content) {
  const result = [];
  const pattern = /^(#{1,3})\s+(.+)$|<h([1-3])[^>]*>(.*?)<\/h\3>/gim;
  let match;
  while ((match = pattern.exec(content))) {
    result.push(slugifyHeading(stripMarkdown(match[2] || match[4])));
  }
  return result;
}

export const PAGE_DEFINITIONS = Object.entries(PAGE_ROUTES).map(([id, [de, en]]) => ({
  id,
  routes: { de, en },
}));

const DEFINITION_BY_ID = new Map(PAGE_DEFINITIONS.map((entry) => [entry.id, entry]));

export function getDefinitionBySlug(locale, slug = []) {
  const route = Array.isArray(slug) ? slug.join('/') : slug;
  return PAGE_DEFINITIONS.find((entry) => entry.routes[locale] === route) || null;
}

function anchorMap(id, locale) {
  if (locale === 'de') return new Map();
  const source = headings(getRawContent('de', id));
  const target = headings(getRawContent('en', id));
  return new Map(source.map((heading, index) => [heading, target[index] || heading]));
}

function resolveOldWikiRoute(value) {
  const normalized = decodeURIComponent(value)
    .replace(/^#?\/?wiki\/?/i, '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map(slugifyHeading)
    .join('/');
  return PAGE_DEFINITIONS.find((entry) => entry.routes.de === normalized) || null;
}

export function localizeContent(content, locale, currentId) {
  const currentAnchors = anchorMap(currentId, locale);
  const rewrite = (href) => {
    if (!href) return href;

    const legacyExternal = href.match(/^https?:\/\/wiki\.transientrealm\.de\/#?\/?wiki\/(.+)$/i);
    const internal = legacyExternal?.[1] || href.match(/^#?\/?wiki\/(.+)$/i)?.[1];
    if (!internal) {
      return href.startsWith('#')
        ? `#${currentAnchors.get(href.slice(1)) || href.slice(1)}`
        : href;
    }

    const [routePart, hash] = internal.split('#');
    const definition = resolveOldWikiRoute(routePart);
    if (!definition) return href;
    const localizedHash = hash
      ? anchorMap(definition.id, locale).get(hash) || hash
      : '';
    return `${wikiPath(locale, definition.routes[locale])}${localizedHash ? `#${localizedHash}` : ''}`;
  };

  return content
    .replace(/(href=["'])([^"']+)(["'])/gi, (_match, before, href, after) => `${before}${rewrite(href)}${after}`)
    .replace(/(\]\()([^)]+)(\))/g, (_match, before, href, after) => `${before}${rewrite(href)}${after}`);
}

export function getPage(locale, definition) {
  const raw = getRawContent(locale, definition.id);
  const title = TITLE_OVERRIDES[locale][definition.id] || extractTitle(raw, definition.id.split('/').at(-1));
  const route = wikiPath(locale, definition.routes[locale]);
  const otherLocale = locale === 'de' ? 'en' : 'de';
  return {
    ...definition,
    alternate: wikiPath(otherLocale, definition.routes[otherLocale]),
    content: localizeContent(raw, locale, definition.id),
    description: descriptionFrom(raw, locale),
    isHome: definition.id === 'home',
    locale,
    route,
    title,
  };
}

export function getNavigation(locale) {
  const link = (id) => {
    const definition = DEFINITION_BY_ID.get(id);
    const page = getPage(locale, definition);
    return { alternate: page.alternate, id, name: page.title, path: page.route };
  };
  return {
    home: link('home'),
    topLevel: TOP_LEVEL.map(link),
    folders: CATEGORY_CONFIG.map((category) => ({
      icon: category.icon,
      name: category.labels[locale],
      items: category.ids.map(link),
    })),
    footer: {
      legal: link('Impressum'),
      privacy: link('privacy'),
      rules: link('Regelwerk'),
    },
  };
}

export function getSearchIndex(locale) {
  const categoryById = new Map();
  CATEGORY_CONFIG.forEach((category) => {
    category.ids.forEach((id) => categoryById.set(id, category.labels[locale]));
  });
  return PAGE_DEFINITIONS.filter((entry) => !['Impressum', 'privacy', 'Regelwerk'].includes(entry.id)).map((definition) => {
    const page = getPage(locale, definition);
    return {
      alternate: page.alternate,
      category: categoryById.get(definition.id) || null,
      clean: stripMarkdown(page.content),
      id: definition.id,
      route: page.route,
      title: page.title,
    };
  });
}

export function getPageMetadata(locale, definition) {
  const page = getPage(locale, definition);
  const title = page.isHome ? UI[locale].homeTitle : `${page.title} | ${SITE_NAME}`;
  return {
    title,
    description: page.description,
    alternates: {
      canonical: page.route,
      languages: {
        'de-DE': wikiPath('de', definition.routes.de),
        'en-US': wikiPath('en', definition.routes.en),
        'x-default': wikiPath('de', definition.routes.de),
      },
    },
    openGraph: {
      title,
      description: page.description,
      type: page.isHome ? 'website' : 'article',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? ['en_US'] : ['de_DE'],
      siteName: SITE_NAME,
      url: page.route,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
      images: ['/og-image.png'],
    },
  };
}

export function getJsonLd(locale, page) {
  const language = locale === 'de' ? 'de-DE' : 'en-US';
  const graph = [{
    '@type': page.isHome ? 'WebSite' : 'Article',
    headline: page.title,
    name: page.title,
    url: absoluteUrl(page.route),
    inLanguage: language,
    description: page.description,
    image: absoluteUrl('/og-image.png'),
    publisher: { '@type': 'Organization', name: 'TransientRealm' },
  }];
  if (!page.isHome) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: UI[locale].breadcrumbHome, item: absoluteUrl(wikiPath(locale)) },
        { '@type': 'ListItem', position: 2, name: page.title, item: absoluteUrl(page.route) },
      ],
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function getBreadcrumbHome(locale) {
  return UI[locale].breadcrumbHome;
}
