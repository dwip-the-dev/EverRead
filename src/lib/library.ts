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

export type BookId = "bible" | "quran" | "gita";

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
  {
    id: "bible",
    name: "Bible",
    religion: "Christianity",
    tradition: "Christianity",
    symbol: "✝",
    blurb: "King James Version — selected books, from Genesis to Revelation.",
    unitLabel: "Chapter",
    chapterCount: 585,
    plans: [
      { id: "90-day", name: "90-Day Journey", days: 90, note: "Brisk daily pace" },
      { id: "180-day", name: "180-Day Steady", days: 180, note: "A chapter or two a day" },
      { id: "365-day", name: "One Year", days: 365, note: "Short, unhurried readings" },
    ],
  },
  {
    id: "quran",
    name: "Quran",
    religion: "Islam",
    tradition: "Islam",
    symbol: "☾",
    blurb: "All 114 surahs in Arabic with an English rendering.",
    unitLabel: "Surah",
    chapterCount: 114,
    plans: [
      { id: "30-day", name: "30-Day Pace", days: 30, note: "A juz-sized portion daily" },
      { id: "60-day", name: "60-Day Steady", days: 60, note: "Half-portions, more time" },
      { id: "120-day", name: "120-Day Slow", days: 120, note: "Short reflective readings" },
    ],
  },
  {
    id: "gita",
    name: "Bhagavad Gita",
    religion: "Hinduism",
    tradition: "Hinduism",
    symbol: "ॐ",
    blurb: "All 18 chapters, 701 verses, with Sanskrit and transliteration.",
    unitLabel: "Chapter",
    chapterCount: 18,
    plans: [
      { id: "9-day", name: "9-Day Intensive", days: 9, note: "Two chapters a day" },
      { id: "18-day", name: "18 Days", days: 18, note: "A chapter a day" },
      { id: "40-day", name: "40-Day Gentle", days: 40, note: "A handful of verses daily" },
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
};

const planModules = import.meta.glob("../data/plans/**/*.json");
const quoteLoaders: Record<BookId, () => Promise<{ default: Quote[] }>> = {
  bible: () => import("../data/quotes/bible.json") as Promise<{ default: Quote[] }>,
  quran: () => import("../data/quotes/quran.json") as Promise<{ default: Quote[] }>,
  gita: () => import("../data/quotes/gita.json") as Promise<{ default: Quote[] }>,
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
  return (await bookLoaders[id]()).default;
}

export async function loadPlan(book: BookId, plan: string): Promise<Plan> {
  const key = `../data/plans/${book}/${plan}.json`;
  const loader = planModules[key];
  if (!loader) throw new Error(`Unknown plan ${book}/${plan}`);
  return (await loader()) as unknown as Plan;
}

export async function loadQuotes(book: BookId): Promise<Quote[]> {
  return (await quoteLoaders[book]()).default;
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

export function allChapters(book: Book) {
  return book.sections.flatMap((s) => s.chapters.map((c) => ({ section: s, chapter: c })));
}
