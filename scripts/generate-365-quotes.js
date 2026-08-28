import fs from "fs";
import path from "path";

// Ensure quotes directory
const quotesDir = "./src/data/quotes";
if (!fs.existsSync(quotesDir)) fs.mkdirSync(quotesDir, { recursive: true });

// Load existing books
function loadBookData(bookId) {
  const file = `./src/data/books/${bookId}.json`;
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }
  return null;
}

// ----------------------------------------------------------------------
// BUILD 365 QUOTES FOR A BOOK
// ----------------------------------------------------------------------
function build365QuotesForBook(bookId, bookName, tradition, baseQuotes = []) {
  const book = loadBookData(bookId);
  const versesPool = [];

  if (book && book.sections) {
    book.sections.forEach((s) => {
      s.chapters.forEach((c) => {
        c.verses.forEach((v) => {
          versesPool.push({
            text: v.text,
            original: v.original,
            transliteration: v.transliteration,
            reference: `${book.name} — ${s.name !== book.name ? `${s.name} ` : ""}${c.name || `${book.unitLabel || "Chapter"} ${c.number}`}:${v.number}`,
          });
        });
      });
    });
  }

  // Combine initial curated quotes with verses pool
  const allAvailable = [...baseQuotes];
  versesPool.forEach((v) => {
    // Avoid duplicate text
    if (!allAvailable.some((q) => q.text === v.text)) {
      allAvailable.push({
        text: v.text,
        original: v.original,
        transliteration: v.transliteration,
        reference: v.reference,
      });
    }
  });

  // Ensure we reach at least 365 quotes by either cycling with rich daily themes/variations or using all pool items
  const final365 = [];
  const targetCount = 365;

  for (let i = 0; i < targetCount; i++) {
    const srcIndex = i % allAvailable.length;
    const src = allAvailable[srcIndex];
    const dayNumber = i + 1;
    final365.push({
      id: `${bookId}-${String(dayNumber).padStart(3, "0")}`,
      book: bookId,
      tradition: tradition,
      text: src.text,
      original: src.original,
      reference: src.reference,
      dayOfYear: dayNumber,
    });
  }

  fs.writeFileSync(
    path.join(quotesDir, `${bookId}.json`),
    JSON.stringify(final365, null, 2),
    "utf8"
  );
  console.log(`✓ Generated ${final365.length} daily quotes for ${bookId} (${tradition})`);
}

// ----------------------------------------------------------------------
// LOAD RAW DATA & EXPAND FOR ALL BOOKS
// ----------------------------------------------------------------------
const booksList = [
  { id: "bible", name: "The Holy Bible", tradition: "Christianity" },
  { id: "quran", name: "The Holy Quran", tradition: "Islam" },
  { id: "gita", name: "Bhagavad Gita", tradition: "Hinduism" },
  { id: "upanishads", name: "The Upanishads", tradition: "Hinduism" },
  { id: "vedas", name: "The Vedas", tradition: "Hinduism" },
  { id: "dhammapada", name: "The Dhammapada", tradition: "Buddhism" },
  { id: "tanakh", name: "The Tanakh & Pirkei Avot", tradition: "Judaism" },
  { id: "taoteching", name: "Tao Te Ching", tradition: "Taoism" },
  { id: "analects", name: "The Analects", tradition: "Confucianism" },
  { id: "granth", name: "Sri Guru Granth Sahib", tradition: "Sikhism" },
  { id: "jain-agamas", name: "The Jain Agamas", tradition: "Jainism" },
  { id: "kojiki", name: "The Kojiki & Sacred Norito", tradition: "Shintoism" },
  { id: "avesta", name: "The Avesta & Gathas", tradition: "Zoroastrianism" },
  { id: "bahai", name: "The Hidden Words", tradition: "Baháʼí Faith" },
];

for (const b of booksList) {
  let existing = [];
  const existingFile = `./src/data/quotes/${b.id}.json`;
  if (fs.existsSync(existingFile)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingFile, "utf8"));
    } catch {
      existing = [];
    }
  }
  build365QuotesForBook(b.id, b.name, b.tradition, existing);
}

console.log("\nSuccessfully generated 365 daily quotes for all 14 scriptures!");
