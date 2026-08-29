import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./root.module.css";

export const metadata: Metadata = {
  title: "TransientRealm — Choose your language",
  description: "Choose German or English to enter TransientRealm.",
  alternates: {
    canonical: "/",
    languages: { "de-DE": "/de/", "en": "/en/", "x-default": "/" },
  },
};

export default function LanguagePage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <section className={styles.card} aria-labelledby="language-title">
        <Image className={styles.logo} src="/logo.png" width={240} height={240} alt="TransientRealm" priority />
        <p className={styles.eyebrow}>Minecraft Java · Steampunk CityBuild & RPG</p>
        <h1 id="language-title">Enter the Realm</h1>
        <p className={styles.intro}>Wähle deine Sprache · Choose your language</p>
        <div className={styles.choices}>
          <Link href="/de/" hrefLang="de" lang="de">
            <span>DE</span>
            <strong>Deutsch</strong>
            <small>Das Realm betreten →</small>
          </Link>
          <Link href="/en/" hrefLang="en" lang="en">
            <span>EN</span>
            <strong>English</strong>
            <small>Enter the Realm →</small>
          </Link>
        </div>
        <code>transientrealm.de</code>
      </section>
    </main>
  );
}
