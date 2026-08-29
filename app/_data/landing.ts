export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type LandingCopy = {
  metadata: { title: string; description: string };
  nav: { experience: string; systems: string; start: string; faq: string };
  hero: {
    eyebrow: string; title: string; lead: string; play: string; discord: string;
    wiki: string; ipLabel: string; copy: string; copied: string;
  };
  pillars: { value: string; label: string }[];
  experience: { eyebrow: string; title: string; text: string; callout: string; calloutText: string };
  features: {
    eyebrow: string; title: string; text: string;
    items: { marker: string; title: string; text: string }[];
  };
  steps: {
    eyebrow: string; title: string; text: string;
    items: { title: string; text: string }[];
  };
  community: {
    eyebrow: string; title: string; text: string; eventLabel: string;
    eventTitle: string; eventText: string; eventCta: string;
  };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  final: { title: string; text: string; play: string; wiki: string };
  footer: { tagline: string; wiki: string; discord: string; imprint: string; privacy: string };
};

export const copy: Record<Locale, LandingCopy> = {
  de: {
    metadata: {
      title: "TransientRealm — Steampunk CityBuild & RPG",
      description: "Baue deine Stadt, meistere eigene Jobs und entdecke ein deutsches Minecraft-Java-Erlebnis voller Quests, Kulte und langfristigem Fortschritt.",
    },
    nav: { experience: "Erlebnis", systems: "Systeme", start: "Loslegen", faq: "FAQ" },
    hero: {
      eyebrow: "Minecraft Java · Jetzt online",
      title: "Baue nicht nur eine Stadt. Hinterlasse eine Spur.",
      lead: "TransientRealm verbindet tiefes CityBuild mit Steampunk-RPG: eigene Jobs, Quests, Kulte und eine Welt, in der dein Fortschritt wirklich zählt.",
      play: "Server-IP kopieren", discord: "Discord beitreten", wiki: "Wiki entdecken",
      ipLabel: "Deine Verbindung ins Realm", copy: "Kopieren", copied: "Kopiert!",
    },
    pillars: [
      { value: "Eigene", label: "Jobs & Berufe" }, { value: "Tiefe", label: "Progression" },
      { value: "Gemeinsame", label: "Kulte & Fraktionen" }, { value: "Laufende", label: "Quests & Events" },
    ],
    experience: {
      eyebrow: "Mehr als Standard-CityBuild", title: "Eine Welt, die auf deinen nächsten Schritt wartet.",
      text: "Errichte dein Zuhause, entwickle eine Spezialisierung und werde Teil einer Gemeinschaft. Die Systeme greifen ineinander, statt nur nebeneinander zu existieren.",
      callout: "Dein Weg, dein Tempo",
      calloutText: "Starte entspannt mit einem Plot oder tauche direkt in Jobs, Handel, Kulte und die Geheimnisse des Realms ein.",
    },
    features: {
      eyebrow: "Kernsysteme", title: "Zahnräder, die ineinandergreifen.",
      text: "Jedes System gibt dir neue Ziele, ohne dir vorzuschreiben, wie du spielen musst.",
      items: [
        { marker: "01", title: "CityBuild", text: "Baue, gestalte und entwickle deinen eigenen Ort im Realm." },
        { marker: "02", title: "Jobs & Berufe", text: "Wähle deinen Weg und schalte langfristig neue Möglichkeiten frei." },
        { marker: "03", title: "Quests", text: "Erlebe tägliche Aufgaben, Fortschritt und neue Gründe zurückzukehren." },
        { marker: "04", title: "Kulte & Fraktionen", text: "Schließe dich zusammen, wachse als Gruppe und hinterlasse Einfluss." },
        { marker: "05", title: "Wirtschaft", text: "Handle, eröffne Shops und finde deinen Platz in einer lebendigen Ökonomie." },
        { marker: "06", title: "Labyrinth & Geheimnisse", text: "Verlasse die sichere Routine und entdecke, was unter der Oberfläche liegt." },
      ],
    },
    steps: {
      eyebrow: "Dein Einstieg", title: "In drei Schritten ins Realm.",
      text: "Minecraft Java reicht — alles Weitere lernst du im Spiel oder im Wiki.",
      items: [
        { title: "Server hinzufügen", text: "Öffne Mehrspieler und trage transientrealm.de als Serveradresse ein." },
        { title: "Ankommen", text: "Folge dem Einstieg, sichere dir deinen Platz und entdecke die ersten Systeme." },
        { title: "Deinen Weg wählen", text: "Baue, spezialisiere dich, handle oder schließe dich anderen Spielern an." },
      ],
    },
    community: {
      eyebrow: "Zusammen lebendig", title: "Ein Realm entsteht nicht allein.",
      text: "Auf Discord findest du Mitspieler, Ankündigungen und direkten Kontakt zum Projekt. Gemeinsame Spielzeiten bringen neue und erfahrene Spieler zusammen.",
      eventLabel: "Nächste gemeinsame Runde", eventTitle: "Spielabende & Events",
      eventText: "Termine, Themen und spontane Aktionen kündigen wir zentral auf Discord an.", eventCta: "Zu den Ankündigungen",
    },
    faq: {
      eyebrow: "Kurz beantwortet", title: "Bevor du loslegst.",
      items: [
        { question: "Welche Minecraft-Version brauche ich?", answer: "TransientRealm läuft auf Minecraft Java. Die aktuell unterstützte Version findest du jederzeit im Discord und im Wiki." },
        { question: "Ist der Server kostenlos?", answer: "Ja. Du kannst TransientRealm kostenlos betreten und die Welt entdecken." },
        { question: "Muss ich schon CityBuild-Erfahrung haben?", answer: "Nein. Der Einstieg und das Wiki führen dich durch die wichtigsten Schritte und Systeme." },
        { question: "Wo finde ich Hilfe?", answer: "Im Wiki stehen ausführliche Guides. Für persönliche Hilfe erreichst du die Community und das Team auf Discord." },
      ],
    },
    final: { title: "Das Realm wartet nicht auf Helden. Es macht sie.", text: "Starte auf transientrealm.de oder lerne die Welt zuerst im Wiki kennen.", play: "Server-IP kopieren", wiki: "Zum Wiki" },
    footer: { tagline: "Steampunk CityBuild & RPG für Minecraft Java.", wiki: "Wiki", discord: "Discord", imprint: "Impressum", privacy: "Datenschutz" },
  },
  en: {
    metadata: {
      title: "TransientRealm — Steampunk CityBuild & RPG",
      description: "Build your city, master custom professions, and discover a Minecraft Java realm filled with quests, factions, and meaningful progression.",
    },
    nav: { experience: "Experience", systems: "Systems", start: "Get started", faq: "FAQ" },
    hero: {
      eyebrow: "Minecraft Java · Live now", title: "Don’t just build a city. Leave your mark.",
      lead: "TransientRealm brings deep CityBuild and steampunk RPG together: custom professions, quests, factions, and a world where your progress matters.",
      play: "Copy server IP", discord: "Join Discord", wiki: "Explore the wiki",
      ipLabel: "Your connection to the Realm", copy: "Copy", copied: "Copied!",
    },
    pillars: [
      { value: "Custom", label: "jobs & professions" }, { value: "Deep", label: "progression" },
      { value: "Shared", label: "factions & groups" }, { value: "Ongoing", label: "quests & events" },
    ],
    experience: {
      eyebrow: "Beyond standard CityBuild", title: "A world waiting for your next move.",
      text: "Create your home, develop a specialisation, and become part of a community. Every system connects to the next instead of existing in isolation.",
      callout: "Your path, your pace",
      calloutText: "Start with a relaxed plot or dive straight into professions, trading, factions, and the mysteries of the Realm.",
    },
    features: {
      eyebrow: "Core systems", title: "Every gear moves another.",
      text: "Each system gives you new goals without telling you how you have to play.",
      items: [
        { marker: "01", title: "CityBuild", text: "Build, shape, and grow a place of your own in the Realm." },
        { marker: "02", title: "Jobs & professions", text: "Choose your craft and unlock new possibilities over time." },
        { marker: "03", title: "Quests", text: "Take on daily goals, progress, and find new reasons to return." },
        { marker: "04", title: "Factions & groups", text: "Team up, grow together, and leave a lasting influence." },
        { marker: "05", title: "Economy", text: "Trade, open shops, and find your place in a living economy." },
        { marker: "06", title: "Maze & mysteries", text: "Step outside the safe routine and uncover what lies beneath." },
      ],
    },
    steps: {
      eyebrow: "Your first steps", title: "Enter the Realm in three steps.",
      text: "All you need is Minecraft Java — learn everything else in-game or in the wiki.",
      items: [
        { title: "Add the server", text: "Open Multiplayer and enter transientrealm.de as the server address." },
        { title: "Find your footing", text: "Follow the introduction, claim your place, and discover the first systems." },
        { title: "Choose your path", text: "Build, specialise, trade, or join forces with other players." },
      ],
    },
    community: {
      eyebrow: "Alive together", title: "A Realm is never built alone.",
      text: "Meet players, follow announcements, and talk directly to the project on Discord. Shared play sessions bring newcomers and experienced players together.",
      eventLabel: "Next shared session", eventTitle: "Game nights & events",
      eventText: "Dates, themes, and spontaneous activities are announced in one place on Discord.", eventCta: "See announcements",
    },
    faq: {
      eyebrow: "Quick answers", title: "Before you begin.",
      items: [
        { question: "Which Minecraft version do I need?", answer: "TransientRealm runs on Minecraft Java. You can always find the currently supported version on Discord and in the wiki." },
        { question: "Is the server free?", answer: "Yes. You can join TransientRealm and explore the world for free." },
        { question: "Do I need CityBuild experience?", answer: "No. The introduction and wiki guide you through the most important steps and systems." },
        { question: "Where can I get help?", answer: "The wiki has detailed guides. For personal help, reach the community and team on Discord." },
      ],
    },
    final: { title: "The Realm doesn’t wait for heroes. It makes them.", text: "Start at transientrealm.de or explore the world in the wiki first.", play: "Copy server IP", wiki: "Open the wiki" },
    footer: { tagline: "Steampunk CityBuild & RPG for Minecraft Java.", wiki: "Wiki", discord: "Discord", imprint: "Legal notice", privacy: "Privacy" },
  },
};
