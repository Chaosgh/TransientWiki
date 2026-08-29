export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type LandingCopy = {
  metadata: { title: string; description: string };
  nav: { systems: string; start: string; faq: string };
  hero: {
    eyebrow: string; title: string; lead: string; play: string; discord: string;
    wiki: string; ipLabel: string; copy: string; copied: string;
  };
  pillars: { value: string; label: string }[];
  features: {
    eyebrow: string; title: string; text: string;
    items: { marker: string; title: string; text: string }[];
  };
  steps: {
    eyebrow: string; title: string; text: string;
    items: { title: string; text: string }[];
  };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  footer: { tagline: string; wiki: string; discord: string; imprint: string; privacy: string };
};

export const copy: Record<Locale, LandingCopy> = {
  de: {
    metadata: {
      title: "TransientRealm — Steampunk CityBuild & RPG",
      description: "Minecraft-Java-CityBuild mit zehn Jobs, täglichen Quests, Kulten, eigener Wirtschaft und einem prozeduralen Labyrinth.",
    },
    nav: { systems: "Systeme", start: "Verbinden", faq: "FAQ" },
    hero: {
      eyebrow: "Minecraft Java · CityBuild · Online",
      title: "CityBuild mit Jobs, Kulten und eigenem Labyrinth.",
      lead: "Hol dir ein Plot, levele zehn Berufe parallel, erledige täglich drei Quests oder gründe einen Kult mit eigener Bank und Levelsystem.",
      play: "Server-IP kopieren", discord: "Discord beitreten", wiki: "Wiki entdecken",
      ipLabel: "Server-Adresse", copy: "Kopieren", copied: "Kopiert!",
    },
    pillars: [
      { value: "10", label: "Jobs gleichzeitig" }, { value: "3", label: "tägliche Quests" },
      { value: "3", label: "getrennte Währungen" }, { value: "1", label: "prozedurales Labyrinth" },
    ],
    features: {
      eyebrow: "Server-Systeme", title: "Was tatsächlich drin ist.",
      text: "Die wichtigsten Mechaniken in Kurzform. Befehle und vollständige Erklärungen stehen im Wiki.",
      items: [
        { marker: "01", title: "CityBuild", text: "Eigene Plots mit Einladungen, Merge, einstellbaren Flags und Kistenshops." },
        { marker: "02", title: "Zehn Jobs", text: "Alle Berufe können parallel laufen. Arbeit bringt Pfund, Job-XP und neue Rezepte." },
        { marker: "03", title: "Daily Quests", text: "Drei Aufgaben pro Tag für Mining, Angeln, Crafting oder Kampf. Reset um 0 Uhr." },
        { marker: "04", title: "Kulte", text: "Eigene Gruppen mit Bank, Levelsystem, Rängen, Fraktionen und Wochenmarkt." },
        { marker: "05", title: "Wirtschaft", text: "Pfund für Handel, Ectoplasma für Kisten und Rubine für Kult-Upgrades." },
        { marker: "06", title: "Labyrinth", text: "Prozedurales Maze mit zufälligem Einstieg, Fallen, Bossräumen, Tresoren und Schlüsseln." },
      ],
    },
    steps: {
      eyebrow: "Direkt loslegen", title: "Verbinden, Plot holen, spielen.",
      text: "Du brauchst Minecraft Java. Die Server-Adresse lautet transientrealm.de.",
      items: [
        { title: "Server hinzufügen", text: "Öffne Mehrspieler und trage transientrealm.de als Serveradresse ein." },
        { title: "Plot beanspruchen", text: "Nutze /plot auto, um dir automatisch ein freies Grundstück zu holen." },
        { title: "Systeme öffnen", text: "Starte mit /job und /quests; alle weiteren Befehle findest du im Wiki." },
      ],
    },
    faq: {
      eyebrow: "Kurzinfo", title: "Häufige Fragen.",
      items: [
        { question: "Welche Minecraft-Version brauche ich?", answer: "TransientRealm läuft auf Minecraft Java. Die aktuell unterstützte Version findest du jederzeit im Discord und im Wiki." },
        { question: "Ist der Server kostenlos?", answer: "Ja, der Beitritt und das Spielen sind kostenlos." },
        { question: "Wie bekomme ich ein Plot?", answer: "Nutze nach dem Beitritt /plot auto. Weitere Plot-Befehle und Flags stehen im Wiki." },
        { question: "Wo finde ich Befehle und Hilfe?", answer: "Befehle und System-Guides stehen im Wiki. Für direkte Hilfe gibt es den Discord." },
      ],
    },
    footer: { tagline: "Steampunk CityBuild & RPG für Minecraft Java.", wiki: "Wiki", discord: "Discord", imprint: "Impressum", privacy: "Datenschutz" },
  },
  en: {
    metadata: {
      title: "TransientRealm — Steampunk CityBuild & RPG",
      description: "Minecraft Java CityBuild with ten jobs, daily quests, cults, its own economy, and a procedural maze.",
    },
    nav: { systems: "Systems", start: "Connect", faq: "FAQ" },
    hero: {
      eyebrow: "Minecraft Java · CityBuild · Online", title: "CityBuild with jobs, cults, and a procedural maze.",
      lead: "Claim a plot, level ten professions at once, complete three daily quests, or create a cult with its own bank and leveling system.",
      play: "Copy server IP", discord: "Join Discord", wiki: "Explore the wiki",
      ipLabel: "Server address", copy: "Copy", copied: "Copied!",
    },
    pillars: [
      { value: "10", label: "simultaneous jobs" }, { value: "3", label: "daily quests" },
      { value: "3", label: "separate currencies" }, { value: "1", label: "procedural maze" },
    ],
    features: {
      eyebrow: "Server systems", title: "What is actually included.",
      text: "The main mechanics in brief. Commands and complete explanations are available in the wiki.",
      items: [
        { marker: "01", title: "CityBuild", text: "Personal plots with invitations, merging, configurable flags, and chest shops." },
        { marker: "02", title: "Ten jobs", text: "All professions can run in parallel. Work earns pounds, job XP, and new recipes." },
        { marker: "03", title: "Daily quests", text: "Three tasks per day covering mining, fishing, crafting, or combat. Reset at midnight." },
        { marker: "04", title: "Cults", text: "Player groups with a bank, leveling system, ranks, factions, and weekly market." },
        { marker: "05", title: "Economy", text: "Pounds for trading, ectoplasm for crates, and rubies for cult upgrades." },
        { marker: "06", title: "Maze", text: "Procedural maze with random entry points, traps, boss rooms, vaults, and keys." },
      ],
    },
    steps: {
      eyebrow: "Start directly", title: "Connect, claim a plot, play.",
      text: "You need Minecraft Java. The server address is transientrealm.de.",
      items: [
        { title: "Add the server", text: "Open Multiplayer and enter transientrealm.de as the server address." },
        { title: "Claim a plot", text: "Use /plot auto to claim an available plot automatically." },
        { title: "Open the systems", text: "Start with /job and /quests; all other commands are documented in the wiki." },
      ],
    },
    faq: {
      eyebrow: "Quick facts", title: "Frequently asked questions.",
      items: [
        { question: "Which Minecraft version do I need?", answer: "TransientRealm runs on Minecraft Java. You can always find the currently supported version on Discord and in the wiki." },
        { question: "Is the server free?", answer: "Yes. Joining and playing are free." },
        { question: "How do I claim a plot?", answer: "Use /plot auto after joining. More plot commands and flags are documented in the wiki." },
        { question: "Where can I find commands and help?", answer: "Commands and system guides are in the wiki. For direct help, use Discord." },
      ],
    },
    footer: { tagline: "Steampunk CityBuild & RPG for Minecraft Java.", wiki: "Wiki", discord: "Discord", imprint: "Legal notice", privacy: "Privacy" },
  },
};
