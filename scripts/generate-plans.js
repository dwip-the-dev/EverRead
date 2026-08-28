import fs from "fs";
import path from "path";

// Load books
const gita = JSON.parse(fs.readFileSync("./src/data/books/gita.json", "utf8"));
const quran = JSON.parse(fs.readFileSync("./src/data/books/quran.json", "utf8"));
const bible = JSON.parse(fs.readFileSync("./src/data/books/bible.json", "utf8"));

// 1. Gita 9-Day Intensive (2 chapters a day)
function generateGita9Day() {
  const chs = gita.sections[0].chapters;
  const days = [];
  for (let d = 1; d <= 9; d++) {
    const ch1 = chs[(d - 1) * 2];
    const ch2 = chs[(d - 1) * 2 + 1];
    days.push({
      day: d,
      read: [
        {
          section: "gita",
          chapter: ch1.number,
          from: 1,
          to: ch1.verses.length,
          full: true,
        },
        {
          section: "gita",
          chapter: ch2.number,
          from: 1,
          to: ch2.verses.length,
          full: true,
        },
      ],
    });
  }
  return {
    id: "9-day",
    book: "gita",
    name: "9-Day Intensive",
    totalDays: 9,
    days,
  };
}

// 2. Gita 18-Day (1 chapter a day)
function generateGita18Day() {
  const chs = gita.sections[0].chapters;
  const days = chs.map((c, i) => ({
    day: i + 1,
    read: [
      {
        section: "gita",
        chapter: c.number,
        from: 1,
        to: c.verses.length,
        full: true,
      },
    ],
  }));
  return {
    id: "18-day",
    book: "gita",
    name: "18 Days",
    totalDays: 18,
    days,
  };
}

// 3. Gita 40-Day Gentle (Handful of verses a day)
function generateGita40Day() {
  // Flatten all verses
  const allVerses = [];
  gita.sections[0].chapters.forEach((c) => {
    c.verses.forEach((v) => {
      allVerses.push({ section: "gita", chapter: c.number, verse: v.number, totalChapterVerses: c.verses.length });
    });
  });

  const totalVerses = allVerses.length; // 701
  const daysCount = 40;
  const days = [];
  let verseIndex = 0;

  for (let d = 1; d <= daysCount; d++) {
    const targetCount = Math.round((d * totalVerses) / daysCount) - verseIndex;
    const dayVerses = allVerses.slice(verseIndex, verseIndex + targetCount);
    verseIndex += dayVerses.length;

    // Group by chapter
    const read = [];
    let currentCh = null;
    let startV = null;
    let endV = null;
    let totalChV = 0;

    for (const v of dayVerses) {
      if (currentCh === null) {
        currentCh = v.chapter;
        startV = v.verse;
        endV = v.verse;
        totalChV = v.totalChapterVerses;
      } else if (v.chapter === currentCh) {
        endV = v.verse;
      } else {
        read.push({
          section: "gita",
          chapter: currentCh,
          from: startV,
          to: endV,
          full: startV === 1 && endV === totalChV,
        });
        currentCh = v.chapter;
        startV = v.verse;
        endV = v.verse;
        totalChV = v.totalChapterVerses;
      }
    }
    if (currentCh !== null) {
      read.push({
        section: "gita",
        chapter: currentCh,
        from: startV,
        to: endV,
        full: startV === 1 && endV === totalChV,
      });
    }

    days.push({ day: d, read });
  }

  return {
    id: "40-day",
    book: "gita",
    name: "40-Day Gentle",
    totalDays: 40,
    days,
  };
}

// 4. Quran Plans (30-day, 60-day, 120-day)
function generateQuranPlan(daysCount, id, name) {
  const allVerses = [];
  quran.sections[0].chapters.forEach((c) => {
    c.verses.forEach((v) => {
      allVerses.push({ section: "quran", chapter: c.number, verse: v.number, totalChapterVerses: c.verses.length });
    });
  });

  const totalVerses = allVerses.length;
  const days = [];
  let verseIndex = 0;

  for (let d = 1; d <= daysCount; d++) {
    const targetCount = Math.round((d * totalVerses) / daysCount) - verseIndex;
    const dayVerses = allVerses.slice(verseIndex, verseIndex + targetCount);
    verseIndex += dayVerses.length;

    const read = [];
    let currentCh = null;
    let startV = null;
    let endV = null;
    let totalChV = 0;

    for (const v of dayVerses) {
      if (currentCh === null) {
        currentCh = v.chapter;
        startV = v.verse;
        endV = v.verse;
        totalChV = v.totalChapterVerses;
      } else if (v.chapter === currentCh) {
        endV = v.verse;
      } else {
        read.push({
          section: "quran",
          chapter: currentCh,
          from: startV,
          to: endV,
          full: startV === 1 && endV === totalChV,
        });
        currentCh = v.chapter;
        startV = v.verse;
        endV = v.verse;
        totalChV = v.totalChapterVerses;
      }
    }
    if (currentCh !== null) {
      read.push({
        section: "quran",
        chapter: currentCh,
        from: startV,
        to: endV,
        full: startV === 1 && endV === totalChV,
      });
    }

    days.push({ day: d, read });
  }

  return {
    id,
    book: "quran",
    name,
    totalDays: daysCount,
    days,
  };
}

// 5. Bible Chapter-Based Plans (90-day, 180-day, 365-day)
function generateBiblePlan(daysCount, id, name) {
  const allChapters = [];
  bible.sections.forEach((s) => {
    s.chapters.forEach((c) => {
      allChapters.push({
        section: s.id,
        chapter: c.number,
        from: 1,
        to: c.verses.length,
        full: true,
      });
    });
  });

  const totalChapters = allChapters.length; // 534
  const days = [];
  let chIndex = 0;

  for (let d = 1; d <= daysCount; d++) {
    const targetCount = Math.round((d * totalChapters) / daysCount) - chIndex;
    const dayChapters = allChapters.slice(chIndex, chIndex + targetCount);
    chIndex += dayChapters.length;

    days.push({
      day: d,
      read: dayChapters,
    });
  }

  return {
    id,
    book: "bible",
    name,
    totalDays: daysCount,
    days,
  };
}

// Write files
const gita9 = generateGita9Day();
fs.writeFileSync("./src/data/plans/gita/9-day.json", JSON.stringify(gita9, null, 2));

const gita18 = generateGita18Day();
fs.writeFileSync("./src/data/plans/gita/18-day.json", JSON.stringify(gita18, null, 2));

const gita40 = generateGita40Day();
fs.writeFileSync("./src/data/plans/gita/40-day.json", JSON.stringify(gita40, null, 2));

const quran30 = generateQuranPlan(30, "30-day", "30-Day Pace");
fs.writeFileSync("./src/data/plans/quran/30-day.json", JSON.stringify(quran30, null, 2));

const quran60 = generateQuranPlan(60, "60-day", "60-Day Steady");
fs.writeFileSync("./src/data/plans/quran/60-day.json", JSON.stringify(quran60, null, 2));

const quran120 = generateQuranPlan(120, "120-day", "120-Day Slow");
fs.writeFileSync("./src/data/plans/quran/120-day.json", JSON.stringify(quran120, null, 2));

const bible90 = generateBiblePlan(90, "90-day", "90-Day Journey");
fs.writeFileSync("./src/data/plans/bible/90-day.json", JSON.stringify(bible90, null, 2));

const bible180 = generateBiblePlan(180, "180-day", "180-Day Steady");
fs.writeFileSync("./src/data/plans/bible/180-day.json", JSON.stringify(bible180, null, 2));

const bible365 = generateBiblePlan(365, "365-day", "One Year");
fs.writeFileSync("./src/data/plans/bible/365-day.json", JSON.stringify(bible365, null, 2));

console.log("All plans generated successfully!");
