import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/de/" },
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/de/" />
      <script dangerouslySetInnerHTML={{ __html: "window.location.replace('/de/');" }} />
      <noscript><Link href="/de/">Weiter zu TransientRealm</Link></noscript>
    </>
  );
}
