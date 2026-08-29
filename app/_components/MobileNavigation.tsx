"use client";

import { useId, useState } from "react";
import Link from "next/link";
import styles from "@/app/[locale]/page.module.css";

type MobileNavigationProps = {
  locale: "de" | "en";
  labels: { systems: string; start: string; faq: string };
  discordUrl: string;
};

export function MobileNavigation({ locale, labels, discordUrl }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const close = () => setOpen(false);

  return (
    <div className={styles.mobileMenu} onKeyDown={(event) => event.key === "Escape" && close()}>
      <button
        type="button"
        className={styles.mobileMenuButton}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={locale === "de" ? "Menü öffnen" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>
      {open && (
        <nav id={menuId} className={styles.mobileMenuPanel} aria-label={locale === "de" ? "Mobile Navigation" : "Mobile navigation"}>
          <a href="#systeme" onClick={close}>{labels.systems}</a>
          <a href="#start" onClick={close}>{labels.start}</a>
          <Link href={`/${locale}/wiki/`} onClick={close}>Wiki</Link>
          <a href="#faq" onClick={close}>{labels.faq}</a>
          <a href={discordUrl} target="_blank" rel="noreferrer" onClick={close}>Discord <span aria-hidden="true">↗</span></a>
        </nav>
      )}
    </div>
  );
}
