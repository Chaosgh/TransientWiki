export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type LandingCopy = {
  metadata: { title: string; description: string };
  nav: { systems: string; start: string; faq: string };
  hero: {
    title: string; lead: string; discord: string;
    wiki: string; ipLabel: string; copy: string; copied: string;
  };
  features: {
    title: string; text: string; link: string;
    items: { marker: string; title: string; text: string; facts: string[]; path: string }[];
  };
  foundation: {
    title: string; text: string;
    items: { title: string; text: string }[];
  };
  steps: {
    title: string; text: string;
    items: { title: string; text: string }[];
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  footer: { tagline: string; wiki: string; discord: string; imprint: string; privacy: string };
};

export const copy: Record<Locale, LandingCopy> = {
  de: {
    metadata: {
      title: "TransientRealm — Minecraft CityBuild mit eigenen Systemen",
      description: "Minecraft-Java-Server mit Custom-Angeln, Runen und Siegeln, Kulten, Fraktionen und dem prozeduralen Transient Maze.",
    },
    nav: { systems: "Systeme", start: "Verbinden", faq: "FAQ" },
    hero: {
      title: "Plots, Kulte, Runen und das Transient Maze.",
      lead: "TransientRealm verbindet CityBuild-Systeme miteinander: Fische liefern Auren, Auren werden zu Siegeln und Kult-Fortschritt schaltet Fraktionen, Boni und Märkte frei.",
      discord: "Discord", wiki: "Wiki öffnen",
      ipLabel: "Server-Adresse", copy: "IP kopieren", copied: "Kopiert!",
    },
    features: {
      title: "Vier Systeme, die den Server prägen.",
      text: "Keine Feature-Namensliste: Das hier sind die Mechaniken, die sich durch den Spielfortschritt ziehen. Details, Rezepte und Befehle stehen direkt im Wiki.",
      link: "Im Wiki",
      items: [
        {
          marker: "01", title: "Custom-Angeln",
          text: "Jeder Biss startet ein eigenes Reaktions-Minispiel. Fischart, Gewicht, Qualität und Biom bestimmen Seltenheit und Verkaufspreis; das Anglerbuch hält jeden Erstfang fest.",
          facts: ["5 Schwierigkeitsgrade", "45 Plätze im Angelbeutel", "Biomabhängige Fische"],
          path: "jobs/angeln",
        },
        {
          marker: "02", title: "Runen & Siegel",
          text: "Runenmechaniker und Siegelmagier arbeiten an eigenen Werkbänken. Auren aus Forschung, Angeln und Maze werden zu dauerhaften Effekten für Werkzeuge, Waffen und Angelruten.",
          facts: ["Runentisch & Siegelaltar", "Auren aus anderen Systemen", "Eigene Item-Effekte"],
          path: "jobs/siegelmagier",
        },
        {
          marker: "03", title: "Kulte & Fraktionen",
          text: "Kulte besitzen Bank, Ränge und ein eigenes Levelsystem. Ab Level 5 öffnet der Wochenmarkt; ab Level 10 entscheidet ihr euch für Orden, Kaufmannsbund oder Bauernschaft.",
          facts: ["3 Fraktionen", "Kultweite Boni", "Wöchentliches Marktangebot"],
          path: "kult/fraktionen",
        },
        {
          marker: "04", title: "Transient Maze",
          text: "Der Einstieg setzt dich zufällig in ein prozedurales Labyrinth. Hinter Illusionswänden warten Fallen, Raidkammern, Parkour, Tresore und die Gift-Aura für Siegel.",
          facts: ["7 Fallentypen", "Boss- & Rätselräume", "Maze-Schlüssel & Tresore"],
          path: "anderes/labyrinth",
        },
      ],
    },
    foundation: {
      title: "Darunter läuft ein klarer CityBuild-Kern.",
      text: "Die eigenen Systeme ersetzen den normalen Serverablauf nicht. Sie bauen auf Plots, Berufen, Quests und einer getrennten Wirtschaft auf.",
      items: [
        { title: "Plots", text: "Einladungen, Merge, Flags und Kistenshops." },
        { title: "Berufe", text: "Zehn Jobs parallel leveln und Rezepte freischalten." },
        { title: "Tägliche Quests", text: "Drei Aufgaben pro Tag; neuer Satz um 0 Uhr." },
        { title: "Wirtschaft", text: "Pfund, Ectoplasma und Rubine mit festen Aufgaben." },
      ],
    },
    steps: {
      title: "In drei Schritten auf den Server.",
      text: "Du brauchst Minecraft Java. Die Server-Adresse lautet transientrealm.de.",
      items: [
        { title: "Server hinzufügen", text: "Öffne Mehrspieler und trage transientrealm.de als Serveradresse ein." },
        { title: "Plot beanspruchen", text: "Nutze /plot auto, um automatisch ein freies Grundstück zu erhalten." },
        { title: "Systeme öffnen", text: "Starte mit /job und /quests. Alle weiteren Befehle stehen im Wiki." },
      ],
    },
    faq: {
      title: "Vor dem ersten Join.",
      items: [
        { question: "Welche Minecraft-Version brauche ich?", answer: "TransientRealm läuft auf Minecraft Java. Die aktuell unterstützte Version findest du jederzeit im Discord und im Wiki." },
        { question: "Ist der Server kostenlos?", answer: "Ja, der Beitritt und das Spielen sind kostenlos." },
        { question: "Wie bekomme ich ein Plot?", answer: "Nutze nach dem Beitritt /plot auto. Weitere Plot-Befehle und Flags stehen im Wiki." },
        { question: "Wo finde ich Befehle und Hilfe?", answer: "Befehle und System-Guides stehen im Wiki. Für direkte Hilfe gibt es den Discord." },
      ],
    },
    footer: { tagline: "Minecraft Java: CityBuild, Kulte, Runen und Maze.", wiki: "Wiki", discord: "Discord", imprint: "Impressum", privacy: "Datenschutz" },
  },
  en: {
    metadata: {
      title: "TransientRealm — Minecraft CityBuild with custom systems",
      description: "Minecraft Java server with custom fishing, runes and sigils, cults, factions, and the procedural Transient Maze.",
    },
    nav: { systems: "Systems", start: "Connect", faq: "FAQ" },
    hero: {
      title: "Plots, cults, runes, and the Transient Maze.",
      lead: "TransientRealm connects its CityBuild systems: fish provide auras, auras become sigils, and cult progression unlocks factions, bonuses, and markets.",
      discord: "Discord", wiki: "Open the wiki",
      ipLabel: "Server address", copy: "Copy IP", copied: "Copied!",
    },
    features: {
      title: "Four systems that define the server.",
      text: "This is not a list of feature names. These mechanics connect across your progression. Detailed recipes, commands, and rules are documented in the wiki.",
      link: "View in wiki",
      items: [
        {
          marker: "01", title: "Custom fishing",
          text: "Every bite starts a reaction minigame. Species, weight, quality, and biome determine rarity and value; the fishing book records every first catch.",
          facts: ["5 difficulty levels", "45-slot fishing bag", "Biome-specific fish"],
          path: "jobs/fishing",
        },
        {
          marker: "02", title: "Runes & sigils",
          text: "Rune mechanics and sigil mages use dedicated workstations. Auras from research, fishing, and the Maze become permanent effects for tools, weapons, and fishing rods.",
          facts: ["Rune table & sigil altar", "Auras from linked systems", "Custom item effects"],
          path: "jobs/sigil-mage",
        },
        {
          marker: "03", title: "Cults & factions",
          text: "Cults have a bank, ranks, and their own leveling system. Level 5 opens the weekly market; at level 10 you choose the Order, Merchants' Guild, or Peasantry.",
          facts: ["3 factions", "Cult-wide bonuses", "Weekly market rotation"],
          path: "cults/factions",
        },
        {
          marker: "04", title: "Transient Maze",
          text: "Entry drops you at a random point in a procedural maze. Illusion walls hide traps, raid chambers, parkour, vaults, and the poison aura used for sigils.",
          facts: ["7 trap types", "Boss & puzzle rooms", "Maze keys & vaults"],
          path: "other/maze",
        },
      ],
    },
    foundation: {
      title: "Underneath is a clear CityBuild core.",
      text: "The custom systems do not replace the standard server loop. They build on plots, professions, quests, and a separated economy.",
      items: [
        { title: "Plots", text: "Invites, merging, flags, and chest shops." },
        { title: "Professions", text: "Level ten jobs in parallel and unlock recipes." },
        { title: "Daily quests", text: "Three tasks per day; a new set at midnight." },
        { title: "Economy", text: "Pounds, ectoplasm, and rubies with fixed purposes." },
      ],
    },
    steps: {
      title: "Join the server in three steps.",
      text: "You need Minecraft Java. The server address is transientrealm.de.",
      items: [
        { title: "Add the server", text: "Open Multiplayer and enter transientrealm.de as the server address." },
        { title: "Claim a plot", text: "Use /plot auto to claim an available plot automatically." },
        { title: "Open the systems", text: "Start with /job and /quests. Every other command is in the wiki." },
      ],
    },
    faq: {
      title: "Before your first join.",
      items: [
        { question: "Which Minecraft version do I need?", answer: "TransientRealm runs on Minecraft Java. You can always find the currently supported version on Discord and in the wiki." },
        { question: "Is the server free?", answer: "Yes. Joining and playing are free." },
        { question: "How do I claim a plot?", answer: "Use /plot auto after joining. More plot commands and flags are documented in the wiki." },
        { question: "Where can I find commands and help?", answer: "Commands and system guides are in the wiki. For direct help, use Discord." },
      ],
    },
    footer: { tagline: "Minecraft Java: CityBuild, cults, runes, and Maze.", wiki: "Wiki", discord: "Discord", imprint: "Legal notice", privacy: "Privacy" },
  },
};
