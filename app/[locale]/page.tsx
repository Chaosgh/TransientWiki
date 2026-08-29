import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyIpButton } from "@/app/_components/CopyIpButton";
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
      languages: { "de-DE": "/de/", en: "/en/", "x-default": "/" },
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
          <Image src="/logo.png" width={54} height={54} alt="" loading="eager" />
          <span>TRANSIENT<em>REALM</em></span>
        </Link>
        <nav className={styles.nav} aria-label={locale === "de" ? "Hauptnavigation" : "Main navigation"}>
          <a href="#systeme">{content.nav.systems}</a>
          <a href="#start">{content.nav.start}</a>
          <Link href={`/${locale}/wiki/`}>Wiki</Link>
          <a href="#faq">{content.nav.faq}</a>
        </nav>
        <div className={styles.headerActions}>
          <Link className={styles.headerWiki} href={`/${locale}/wiki/`}>Wiki</Link>
          <Link className={styles.language} href={`/${otherLocale}/`} hrefLang={otherLocale} aria-label={locale === "de" ? "Switch to English" : "Zu Deutsch wechseln"}>
            {otherLocale.toUpperCase()}
          </Link>
          <a className={styles.headerCta} href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a>
        </div>
      </header>

      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span />{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            <p className={styles.lead}>{content.hero.lead}</p>
            <div className={styles.heroActions}>
              <CopyIpButton className={styles.primaryButton} label={content.hero.play} copiedLabel={content.hero.copied} />
              <a className={styles.secondaryButton} href={DISCORD_URL} target="_blank" rel="noreferrer">{content.hero.discord} <span aria-hidden="true">↗</span></a>
              <Link className={styles.textButton} href={`/${locale}/wiki/`}>{content.hero.wiki} <span aria-hidden="true">→</span></Link>
            </div>
            <div className={styles.ipPlate}>
              <span>{content.hero.ipLabel}</span>
              <code>transientrealm.de</code>
              <CopyIpButton compact label={content.hero.copy} copiedLabel={content.hero.copied} />
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.logoHalo} aria-hidden="true" />
            <Image src="/logo.png" width={640} height={640} alt="TransientRealm steampunk locomotive logo" loading="eager" sizes="(max-width: 900px) 78vw, 45vw" />
            <div className={`${styles.orbitLabel} ${styles.orbitTop}`}>RPG <b>×</b> CITYBUILD</div>
          </div>
          <div className={styles.scrollHint} aria-hidden="true"><span />Scroll</div>
        </section>

        <section className={styles.pillars} aria-label={locale === "de" ? "Spielschwerpunkte" : "Game pillars"}>
          {content.pillars.map((pillar) => (
            <div key={pillar.label}><strong>{pillar.value}</strong><span>{pillar.label}</span></div>
          ))}
        </section>

        <section className={`${styles.section} ${styles.systems}`} id="systeme">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}><span />{content.features.eyebrow}</p>
              <h2>{content.features.title}</h2>
            </div>
            <p>{content.features.text}</p>
          </div>
          <div className={styles.featureGrid}>
            {content.features.items.map((feature) => (
              <article className={styles.featureCard} key={feature.marker}>
                <span>{feature.marker}</span>
                <div className={styles.cardGlyph} aria-hidden="true"><i /><i /></div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.start}`} id="start">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}><span />{content.steps.eyebrow}</p>
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
          <div className={styles.commandLine}>
            <span>SERVER ADDRESS</span><code>transientrealm.de</code>
            <CopyIpButton compact label={content.hero.copy} copiedLabel={content.hero.copied} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.faq}`} id="faq">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}><span />{content.faq.eyebrow}</p>
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
          <Image src="/logo.png" width={64} height={64} alt="" />
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
