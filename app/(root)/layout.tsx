import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://transientrealm.de"),
  title: "TransientRealm — Steampunk CityBuild & RPG",
  description: "A Minecraft Java realm built around CityBuild, custom professions, quests, factions, and meaningful progression.",
  applicationName: "TransientRealm",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: {
    type: "website",
    siteName: "TransientRealm",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TransientRealm" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0d1016",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
