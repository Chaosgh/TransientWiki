"use client";

import { useState } from "react";

type Props = {
  label: string;
  copiedLabel: string;
  className?: string;
  compact?: boolean;
};

export function CopyIpButton({ label, copiedLabel, className, compact = false }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyIp() {
    try {
      await navigator.clipboard.writeText("transientrealm.de");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Server IP", "transientrealm.de");
    }
  }

  return (
    <button type="button" className={className} onClick={copyIp} aria-live="polite">
      {!compact && <span className="buttonDot" aria-hidden="true" />}
      {copied ? copiedLabel : label}
    </button>
  );
}
