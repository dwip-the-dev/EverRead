export type Verse = {
  number: number;
  text: string;
  original?: string;
  transliteration?: string;
};

export type Chapter = {
  number: number;
  name?: string;
  subtitle?: string;
  verses: Verse[];
};

export type Section = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type Book = {
  id: BookId;
  name: string;
  religion: string;
  translation: string;
  unitLabel?: string;
  sections: Section[];
};

export type PlanReading = {
  section: string;
  chapter: number;
  from: number;
  to: number;
  full: boolean;
};

export type PlanDay = { day: number; read: PlanReading[] };

export type Plan = {
  id: string;
  book: BookId;
  name: string;
  totalDays: number;
  days: PlanDay[];
};

export type BookId =
  | "bible"
  | "quran"
  | "gita"
  | "upanishads"
  | "vedas"
  | "dhammapada"
  | "tanakh"
  | "granth"
  | "taoteching"
  | "analects"
  | "jain-agamas"
  | "kojiki"
  | "avesta"
  | "bahai";

export type BookMeta = {
  id: BookId;
  name: string;
  religion: string;
  tradition: string;
  symbol: string;
  blurb: string;
  unitLabel: string;
  chapterCount: number;
  plans: { id: string; name: string; days: number; note: string }[];
};

export const BOOKS: BookMeta[] = [
  // 1. Christianity
  {
    id: "bible",
    name: "The Holy Bible",
    religion: "Christianity",
    tradition: "Christianity",
    symbol: "✝",
    blurb: "World English Bible & King James heritage — Old and New Testaments, Genesis to Revelation.",
    unitLabel: "Chapter",
    chapterCount: 534,
    plans: [
      { id: "90-day", name: "90-Day Journey", days: 90, note: "Brisk pace (~6 chapters a day)" },
      { id: "180-day", name: "180-Day Steady", days: 180, note: "Steady pace (~3 chapters a day)" },
      { id: "365-day", name: "One Year", days: 365, note: "Unhurried daily rhythm (~1-2 chapters)" },
    ],
  },
  // 2. Islam
  {
    id: "quran",
    name: "The Holy Quran",
    religion: "Islam",
    tradition: "Islam",
    symbol: "☾",
    blurb: "All 114 surahs in Arabic with clear English rendering and verse-by-verse translation.",
    unitLabel: "Surah",
    chapterCount: 114,
    plans: [
      { id: "30-day", name: "30-Day Pace", days: 30, note: "One Juz equivalent per day" },
      { id: "60-day", name: "60-Day Steady", days: 60, note: "Half-Juz daily portions" },
      { id: "120-day", name: "120-Day Slow", days: 120, note: "Reflective quarter-Juz portions" },
    ],
  },
  // 3. Hinduism - Bhagavad Gita
  {
    id: "gita",
    name: "Bhagavad Gita",
    religion: "Hinduism",
    tradition: "Hinduism",
    symbol: "ॐ",
    blurb: "All 18 chapters, 701 verses, with authentic Sanskrit original, transliteration, and English.",
    unitLabel: "Chapter",
    chapterCount: 18,
    plans: [
      { id: "9-day", name: "9-Day Intensive", days: 9, note: "Exactly two full chapters a day" },
      { id: "18-day", name: "18 Days", days: 18, note: "Exactly one full chapter a day" },
      { id: "40-day", name: "40-Day Gentle", days: 40, note: "A peaceful handful of verses daily (~17 verses)" },
    ],
  },
  // 4. Hinduism - The Upanishads
  {
    id: "upanishads",
    name: "The Upanishads",
    religion: "Hinduism",
    tradition: "Hinduism",
    symbol: "🕉",
    blurb: "Principal Upanishads (Isha, Katha, Mundaka, Mandukya) on the supreme Self and Brahman.",
    unitLabel: "Upanishad",
    chapterCount: 3,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Meditate on key Upanishadic verses daily" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Deep contemplative daily practice" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "A comprehensive month of non-dual wisdom" },
    ],
  },
  // 5. Hinduism - The Vedas
  {
    id: "vedas",
    name: "The Vedas",
    religion: "Hinduism",
    tradition: "Hinduism",
    symbol: "🔥",
    blurb: "Rigveda Sacred Hymns of Creation (Nasadiya Sukta), Gayatri, and Cosmic Harmony.",
    unitLabel: "Hymn",
    chapterCount: 2,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Sacred mantras and hymns of dawn" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Rhythmic Vedic contemplation" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Full monthly immersion in sacred sound" },
    ],
  },
  // 6. Buddhism - The Dhammapada
  {
    id: "dhammapada",
    name: "The Dhammapada",
    religion: "Buddhism",
    tradition: "Buddhism",
    symbol: "☸",
    blurb: "The timeless verses of the Buddha from the Pali Canon (Tripitaka) with Pali and English.",
    unitLabel: "Chapter",
    chapterCount: 10,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Mindfulness & twin verses daily" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Steady step-by-step noble path" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Mastery of the Noble Eightfold Path" },
    ],
  },
  // 7. Judaism - The Tanakh & Pirkei Avot
  {
    id: "tanakh",
    name: "The Tanakh & Pirkei Avot",
    religion: "Judaism",
    tradition: "Judaism",
    symbol: "✡",
    blurb: "Torah declarations (Shema), wisdom of the prophets, and Pirkei Avot (Ethics of the Fathers).",
    unitLabel: "Chapter",
    chapterCount: 2,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Daily foundational ethical study" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Three pillars of virtue habit" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Reflective month of ancient wisdom" },
    ],
  },
  // 8. Taoism - Tao Te Ching
  {
    id: "taoteching",
    name: "Tao Te Ching",
    religion: "Taoism",
    tradition: "Taoism",
    symbol: "☯",
    blurb: "Lao Tzu's classic of the Way and its Virtue — effortless action (Wu Wei) and natural harmony.",
    unitLabel: "Chapter",
    chapterCount: 7,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Daily stillness and simplicity" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "The art of non-contention" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Complete immersion in the Tao" },
    ],
  },
  // 9. Confucianism - The Analects
  {
    id: "analects",
    name: "The Analects",
    religion: "Confucianism",
    tradition: "Confucianism",
    symbol: "📜",
    blurb: "The sayings of Confucius (Lunyu) on moral character, filial devotion, and the golden rule of Reciprocity.",
    unitLabel: "Book",
    chapterCount: 2,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Self-examination and integrity" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Virtuous conduct and learning" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Daily cultivation of the noble character" },
    ],
  },
  // 10. Sikhism - Sri Guru Granth Sahib
  {
    id: "granth",
    name: "Sri Guru Granth Sahib",
    religion: "Sikhism",
    tradition: "Sikhism",
    symbol: "☬",
    blurb: "Japji Sahib and sacred hymns of Guru Nanak Dev Ji with Gurmukhi original and English.",
    unitLabel: "Pauri",
    chapterCount: 2,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Mool Mantar & foundational Pauris" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Devotional remembrance of the One" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Complete daily Japji rhythm" },
    ],
  },
  // 11. Jainism - The Jain Agamas
  {
    id: "jain-agamas",
    name: "The Jain Agamas",
    religion: "Jainism",
    tradition: "Jainism",
    symbol: "🪷",
    blurb: "Tattvartha Sutra and Acaranga Sutra on Ahimsa (universal non-violence) and the Three Jewels.",
    unitLabel: "Chapter",
    chapterCount: 1,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Ahimsa and compassionate awareness" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Cultivating reverence for all life" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Deep non-violence & soul purification" },
    ],
  },
  // 12. Shintoism - The Kojiki & Sacred Norito
  {
    id: "kojiki",
    name: "The Kojiki & Norito",
    religion: "Shintoism",
    tradition: "Shintoism",
    symbol: "⛩",
    blurb: "Ancient Japanese records of the Kami, the spirit of nature, and prayers for harmony (Akaki kiyoki kokoro).",
    unitLabel: "Section",
    chapterCount: 1,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Purity of heart and reverence for nature" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Living in harmony with heaven and earth" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Sacred seasonal gratitude practice" },
    ],
  },
  // 13. Zoroastrianism - The Avesta & Gathas
  {
    id: "avesta",
    name: "The Avesta & Gathas",
    religion: "Zoroastrianism",
    tradition: "Zoroastrianism",
    symbol: "🪔",
    blurb: "The 17 Gathas of Zarathustra on the Triple Path: Good Thoughts, Good Words, Good Deeds (Humata, Hukhta, Hvarshta).",
    unitLabel: "Yasna",
    chapterCount: 1,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "The path of Righteousness (Asha)" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Daily practice of Good Thoughts & Deeds" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Illuminating the world through truth" },
    ],
  },
  // 14. Baháʼí Faith - The Hidden Words
  {
    id: "bahai",
    name: "The Hidden Words",
    religion: "Baháʼí Faith",
    tradition: "Baháʼí Faith",
    symbol: "☀️",
    blurb: "The inner essence of divine guidance revealed by Bahá'u'lláh in Arabic and Persian.",
    unitLabel: "Part",
    chapterCount: 2,
    plans: [
      { id: "7-day", name: "7-Day Foundation", days: 7, note: "Meditations on a pure, radiant heart" },
      { id: "21-day", name: "21-Day Habit", days: 21, note: "Daily justice and unity of humanity" },
      { id: "30-day", name: "30-Day Master", days: 30, note: "Complete spiritual reflection journey" },
    ],
  },
];

export function bookMeta(id: BookId): BookMeta {
  return BOOKS.find((b) => b.id === id) ?? BOOKS[0];
}

const bookLoaders: Record<BookId, () => Promise<{ default: Book }>> = {
  bible: () => import("../data/books/bible.json") as Promise<{ default: Book }>,
  quran: () => import("../data/books/quran.json") as Promise<{ default: Book }>,
  gita: () => import("../data/books/gita.json") as Promise<{ default: Book }>,
  upanishads: () => import("../data/books/upanishads.json") as Promise<{ default: Book }>,
  vedas: () => import("../data/books/vedas.json") as Promise<{ default: Book }>,
  dhammapada: () => import("../data/books/dhammapada.json") as Promise<{ default: Book }>,
  tanakh: () => import("../data/books/tanakh.json") as Promise<{ default: Book }>,
  granth: () => import("../data/books/granth.json") as Promise<{ default: Book }>,
  taoteching: () => import("../data/books/taoteching.json") as Promise<{ default: Book }>,
  analects: () => import("../data/books/analects.json") as Promise<{ default: Book }>,
  "jain-agamas": () => import("../data/books/jain-agamas.json") as Promise<{ default: Book }>,
  kojiki: () => import("../data/books/kojiki.json") as Promise<{ default: Book }>,
  avesta: () => import("../data/books/avesta.json") as Promise<{ default: Book }>,
  bahai: () => import("../data/books/bahai.json") as Promise<{ default: Book }>,
};

const planModules = import.meta.glob("../data/plans/**/*.json");

const quoteLoaders: Record<BookId, () => Promise<{ default: Quote[] }>> = {
  bible: () => import("../data/quotes/bible.json") as Promise<{ default: Quote[] }>,
  quran: () => import("../data/quotes/quran.json") as Promise<{ default: Quote[] }>,
  gita: () => import("../data/quotes/gita.json") as Promise<{ default: Quote[] }>,
  upanishads: () => import("../data/quotes/upanishads.json") as Promise<{ default: Quote[] }>,
  vedas: () => import("../data/quotes/vedas.json") as Promise<{ default: Quote[] }>,
  dhammapada: () => import("../data/quotes/dhammapada.json") as Promise<{ default: Quote[] }>,
  tanakh: () => import("../data/quotes/tanakh.json") as Promise<{ default: Quote[] }>,
  granth: () => import("../data/quotes/granth.json") as Promise<{ default: Quote[] }>,
  taoteching: () => import("../data/quotes/taoteching.json") as Promise<{ default: Quote[] }>,
  analects: () => import("../data/quotes/analects.json") as Promise<{ default: Quote[] }>,
  "jain-agamas": () => import("../data/quotes/jain-agamas.json") as Promise<{ default: Quote[] }>,
  kojiki: () => import("../data/quotes/kojiki.json") as Promise<{ default: Quote[] }>,
  avesta: () => import("../data/quotes/avesta.json") as Promise<{ default: Quote[] }>,
  bahai: () => import("../data/quotes/bahai.json") as Promise<{ default: Quote[] }>,
};

export type Quote = {
  id: string;
  book: BookId;
  tradition: string;
  text: string;
  original?: string;
  reference: string;
};

export async function loadBook(id: BookId): Promise<Book> {
  const loader = bookLoaders[id];
  if (!loader) throw new Error(`Unknown book ${id}`);
  return (await loader()).default;
}

export async function loadPlan(book: BookId, plan: string): Promise<Plan> {
  const key = `../data/plans/${book}/${plan}.json`;
  const loader = planModules[key];
  if (!loader) throw new Error(`Unknown plan ${book}/${plan}`);
  return (await loader()) as unknown as Plan;
}

export async function loadQuotes(book: BookId): Promise<Quote[]> {
  const loader = quoteLoaders[book];
  if (!loader) return [];
  return (await loader()).default;
}

export function findChapter(book: Book, sectionId: string, chapter: number) {
  const section = book.sections.find((s) => s.id === sectionId);
  const found = section?.chapters.find((c) => c.number === chapter);
  return section && found ? { section, chapter: found } : null;
}

export function chapterKey(sectionId: string, chapter: number) {
  return `${sectionId}:${chapter}`;
}

export function readingLabel(book: Book, r: PlanReading) {
  const found = findChapter(book, r.section, r.chapter);
  if (!found) return "";
  const { section, chapter } = found;
  const head =
    book.id === "bible"
      ? `${section.name} ${chapter.number}`
      : `${book.unitLabel ?? "Chapter"} ${chapter.number}${chapter.name ? ` · ${chapter.name}` : ""}`;
  return r.full ? head : `${head}:${r.from}–${r.to}`;
}

export function formatDayReadingsSummary(book: Book, readings: PlanReading[]): string {
  if (!readings || readings.length === 0) return "";
  if (book.id === "gita") {
    if (readings.length === 1) {
      const r = readings[0];
      const found = findChapter(book, r.section, r.chapter);
      const name = found?.chapter.name ? ` · ${found.chapter.name}` : "";
      return r.full ? `Chapter ${r.chapter}${name}` : `Chapter ${r.chapter}:${r.from}–${r.to}${name}`;
    }
    if (readings.length === 2 && readings.every((r) => r.full)) {
      const ch1 = findChapter(book, readings[0].section, readings[0].chapter)?.chapter;
      const ch2 = findChapter(book, readings[1].section, readings[1].chapter)?.chapter;
      return `Chapters ${readings[0].chapter} & ${readings[1].chapter}${ch1 && ch2 ? ` (${ch1.name} & ${ch2.name})` : ""}`;
    }
    return readings.map((r) => readingLabel(book, r)).join(" · ");
  }

  if (book.id === "quran") {
    if (readings.length === 1) {
      const r = readings[0];
      const found = findChapter(book, r.section, r.chapter);
      const name = found?.chapter.name ? ` (${found.chapter.name})` : "";
      return r.full ? `Surah ${r.chapter}${name}` : `Surah ${r.chapter}:${r.from}–${r.to}${name}`;
    }
    if (readings.length <= 3) {
      return readings
        .map((r) => {
          const found = findChapter(book, r.section, r.chapter);
          const name = found?.chapter.name || `Surah ${r.chapter}`;
          return r.full ? name : `${name}:${r.from}–${r.to}`;
        })
        .join(", ");
    }
    const first = findChapter(book, readings[0].section, readings[0].chapter);
    const last = findChapter(book, readings[readings.length - 1].section, readings[readings.length - 1].chapter);
    return `Surahs ${readings[0].chapter}–${readings[readings.length - 1].chapter} (${first?.chapter.name ?? ""} to ${last?.chapter.name ?? ""})`;
  }

  if (book.id === "bible") {
    const sameSection = readings.every((r) => r.section === readings[0].section);
    if (sameSection) {
      const sectionName = findChapter(book, readings[0].section, readings[0].chapter)?.section.name || "";
      if (readings.length === 1) {
        return readings[0].full
          ? `${sectionName} ${readings[0].chapter}`
          : `${sectionName} ${readings[0].chapter}:${readings[0].from}–${readings[0].to}`;
      }
      return `${sectionName} ${readings[0].chapter}–${readings[readings.length - 1].chapter}`;
    }
    return readings.map((r) => readingLabel(book, r)).join(" · ");
  }

  // Generic books
  if (readings.length === 1) {
    const r = readings[0];
    const found = findChapter(book, r.section, r.chapter);
    const name = found?.chapter.name ? ` · ${found.chapter.name}` : "";
    return r.full ? `${book.unitLabel ?? "Chapter"} ${r.chapter}${name}` : `${book.unitLabel ?? "Chapter"} ${r.chapter}:${r.from}–${r.to}${name}`;
  }

  return readings.map((r) => readingLabel(book, r)).join(" · ");
}

export function allChapters(book: Book) {
  return book.sections.flatMap((s) => s.chapters.map((c) => ({ section: s, chapter: c })));
}
