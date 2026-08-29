import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyIpButton } from "@/app/_components/CopyIpButton";
import { MobileNavigation } from "@/app/_components/MobileNavigation";
import { copy, isLocale, locales } from "@/app/_data/landing";
import styles from "./page.module.css";

const DISCORD_URL = "https://discord.gg/2ru8r3Jedj";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = copy[locale];

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: { "de-DE": "/de/", "en-US": "/en/", "x-default": "/de/" },
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url: `/${locale}/`,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_DE"],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TransientRealm" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.title,
      description: content.metadata.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const content = copy[locale];
  const otherLocale = locale === "de" ? "en" : "de";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "TransientRealm",
    description: content.metadata.description,
    url: `https://transientrealm.de/${locale}/`,
    image: "https://transientrealm.de/og-image.png",
    gamePlatform: "Minecraft Java Edition",
    genre: ["CityBuild", "Role-playing", "Steampunk"],
    inLanguage: locale,
  };

  return (
    <div className={styles.site} lang={locale}>
      <a className={styles.skipLink} href="#main">{locale === "de" ? "Zum Inhalt springen" : "Skip to content"}</a>

      <header className={styles.header}>
        <Link className={styles.brand} href={`/${locale}/`} aria-label="TransientRealm home">
          <Image src="/logo.webp" width={54} height={54} alt="" loading="eager" />
          <span>TRANSIENT<em>REALM</em></span>
        </Link>
        <nav className={styles.nav} aria-label={locale === "de" ? "Hauptnavigation" : "Main navigation"}>
          <a href="#systeme">{content.nav.systems}</a>
          <a href="#start">{content.nav.start}</a>
          <Link href={`/${locale}/wiki/`}>Wiki</Link>
          <a href="#faq">{content.nav.faq}</a>
        </nav>
        <div className={styles.headerActions}>
          <MobileNavigation locale={locale} labels={content.nav} discordUrl={DISCORD_URL} />
          <Link className={styles.language} href={`/${otherLocale}/`} hrefLang={otherLocale} aria-label={locale === "de" ? "Switch to English" : "Zu Deutsch wechseln"}>
            {otherLocale.toUpperCase()}
          </Link>
          <a className={styles.headerCta} href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a>
        </div>
      </header>

      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>{content.hero.title}</h1>
            <p className={styles.lead}>{content.hero.lead}</p>
            <div className={styles.ipPlate}>
              <div><span>{content.hero.ipLabel}</span><code>transientrealm.de</code></div>
              <CopyIpButton compact label={content.hero.copy} copiedLabel={content.hero.copied} />
            </div>
            <div className={styles.heroActions}>
              <a className={styles.secondaryButton} href={DISCORD_URL} target="_blank" rel="noreferrer">{content.hero.discord} <span aria-hidden="true">↗</span></a>
              <Link className={styles.textButton} href={`/${locale}/wiki/`}>{content.hero.wiki} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <span className={styles.heroGear} aria-hidden="true" />
            <div className={styles.logoFrame}>
              <Image src="/logo.webp" width={640} height={640} alt="TransientRealm steampunk locomotive logo" loading="eager" sizes="(max-width: 900px) 78vw, 42vw" />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.systems}`} id="systeme">
          <div className={styles.sectionHeading}>
            <span className={styles.sectionGear} aria-hidden="true" />
            <h2>{content.features.title}</h2>
            <p>{content.features.text}</p>
          </div>
          <div className={styles.systemList}>
            {content.features.items.map((feature) => (
              <article className={styles.systemRow} key={feature.marker}>
                <span className={styles.systemIndex}>{feature.marker}</span>
                <div className={styles.systemCopy}>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
                <ul className={styles.systemFacts}>
                  {feature.facts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
                <Link className={styles.systemLink} href={`/${locale}/wiki/${feature.path}/`}>
                  {content.features.link} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.foundation}`}>
          <div className={styles.foundationIntro}>
            <h2>{content.foundation.title}</h2>
            <p>{content.foundation.text}</p>
          </div>
          <dl className={styles.foundationList}>
            {content.foundation.items.map((item) => (
              <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>
            ))}
          </dl>
        </section>

        <section className={`${styles.section} ${styles.start}`} id="start">
          <div className={styles.sectionIntro}>
            <h2>{content.steps.title}</h2>
            <p>{content.steps.text}</p>
          </div>
          <ol className={styles.steps}>
            {content.steps.items.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.faq}`} id="faq">
          <div className={styles.sectionIntro}>
            <h2>{content.faq.title}</h2>
          </div>
          <div className={styles.faqList}>
            {content.faq.items.map((item, index) => (
              <details key={item.question}>
                <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Image src="/logo.webp" width={64} height={64} alt="" />
          <div><strong>TransientRealm</strong><span>{content.footer.tagline}</span></div>
        </div>
        <nav aria-label={locale === "de" ? "Fußzeile" : "Footer"}>
          <Link href={`/${locale}/wiki/`}>{content.footer.wiki}</Link>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer">{content.footer.discord}</a>
          <Link href={`/${locale}/wiki/${locale === "en" ? "legal-notice" : "impressum"}/`}>
            {content.footer.imprint}
          </Link>
          <Link href={`/${locale}/wiki/privacy/`}>{content.footer.privacy}</Link>
        </nav>
        <p>Minecraft is a trademark of Mojang Studios. TransientRealm is not affiliated with Mojang.</p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </div>
  );
}
