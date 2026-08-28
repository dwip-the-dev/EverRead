# EverRead 📖✨
> **A quiet daily reading companion.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-ff4154.svg)](https://tanstack.com/start)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38bdf8.svg)](https://tailwindcss.com/)
[![100% Offline](https://img.shields.io/badge/Offline-100%25_Client_Side-success.svg)](#privacy--offline-architecture)

**EverRead** brings the habit-forming clarity of modern apps to sacred scriptures and philosophical wisdom. Pick your scripture from world traditions, follow a calm daily pace, track your streak, and return daily to stillness.

No accounts, no ads, no trackers, and zero backend required. Everything runs 100% offline on your device.

---

## 🌟 Sacred Scriptures Across World Religions (Bundled Offline)

| Tradition | Sacred Scripture | Symbol | Description & Translations |
| :--- | :--- | :---: | :--- |
| **Christianity** | The Holy Bible | ✝ | Old & New Testaments (Genesis to Revelation, 534 chapters) |
| **Islam** | The Holy Quran | ☾ | All 114 Surahs with Arabic script, transliteration & English translation |
| **Hinduism** | Bhagavad Gita | ॐ | Complete 18 chapters & 701 verses with Sanskrit Devanagari & English |
| **Hinduism** | The Upanishads | 🕉 | Principal Upanishads (Isha, Katha, Mundaka, Mandukya) on Brahman & Self |
| **Hinduism** | The Vedas | 🔥 | Rigveda Sacred Hymns (Creation Hymn, Gayatri, Cosmic Peace) |
| **Buddhism** | The Dhammapada | ☸ | Tripitaka (Pali Canon) verses of the Buddha with Pali & English |
| **Judaism** | The Tanakh & Pirkei Avot | ✡ | Torah, Shema, Prophets, and Mishnah Ethics of the Fathers |
| **Taoism** | Tao Te Ching | ☯ | Lao Tzu's classic on the Way, Stillness, and Wu Wei (Effortless Action) |
| **Confucianism** | The Analects | 📜 | The sayings of Confucius (Lunyu) on Reciprocity and Virtue |
| **Sikhism** | Sri Guru Granth Sahib | ☬ | Japji Sahib and sacred hymns of Guru Nanak Dev Ji with Gurmukhi |
| **Jainism** | The Jain Agamas | 🪷 | Tattvartha Sutra on Ahimsa (Universal Non-Violence) & the Three Jewels |
| **Shintoism** | The Kojiki & Sacred Norito | ⛩ | Ancient Japanese records of the Kami and purity of heart (*Akaki kiyoki kokoro*) |
| **Zoroastrianism** | The Avesta & Gathas | 🪔 | The 17 Gathas of Zarathustra on the Triple Path: Good Thoughts, Words & Deeds |
| **Baháʼí Faith** | The Hidden Words | ☀️ | The inner essence of divine guidance revealed by Bahá'u'lláh |

---

## ✨ Features & Micro-Animations

### 🕯️ 1. Serene Reader with Fluid Animations
- **Smooth Page Transitions**: Delightful entrance and exit animations (`animate-fade-in-up`).
- **Pulsing Streak Flame**: Flame breathing animation reflecting your active reading streak.
- **Floating Sacred Symbols**: Gentle floating motion for sacred symbols in banners and cards.
- **Fluid Font Scaler**: Small, Medium, Large typography scaling with editorial *Fraunces* serif.
- **Bilingual & Multi-Script Controls**: Toggle original Hebrew, Arabic, Sanskrit, Greek, Pali, Gurmukhi, or Chinese scripts and Roman transliterations with automatic RTL alignment.
- **Tap-to-Copy Feedback**: Tap any verse to copy formatted citations with copy wave feedback and toasts.
- **Continue Where You Left Off**: Remembers exact chapter, verse, and scroll percentage when you resume reading.

### 🗓️ 2. Structured, Deterministic Reading Plans
- **Bhagavad Gita**:
  - `9-Day Intensive`: Exactly **two full chapters a day** (Day 1: Ch 1 & 2, Day 2: Ch 3 & 4, ..., Day 9: Ch 17 & 18).
  - `18 Days`: Exactly **one full chapter a day**.
  - `40-Day Gentle`: Bite-sized handful of verses daily (~17-18 verses).
- **The Holy Quran**:
  - `30-Day Pace`: One Juz equivalent per day (ideal for monthly rhythms).
  - `60-Day Steady`: Half-Juz daily portions.
  - `120-Day Slow`: Reflective quarter-Juz portions.
- **The Holy Bible**:
  - `90-Day Journey`: Brisk pace (~6 chapters a day).
  - `180-Day Steady`: Steady pace (~3 chapters a day).
  - `One Year (365-Day)`: Peaceful unhurried daily reading (~1-2 chapters a day).
- **World Traditions (Upanishads, Dhammapada, Tao Te Ching, Tanakh, Granth, etc.)**:
  - `7-Day Foundation`, `21-Day Habit`, and `30-Day Master` schedules.

### 🌅 3. Daily Reflections & Quotes Archive
- Curated daily spiritual quotes associated with your active scripture.
- Offline calculation based on the day of the year (`quotes[dayOfYear % length]`) — zero network requests.
- Searchable reflection history (past 30 days), bookmarking favorites, and native web sharing.

### 📊 4. Habit Streaks, 30-Day Heatmap & Profile Dashboard
- Daily reading streaks (current streak, longest streak, active days).
- Interactive 30-day activity heatmap tracking active reading days with hover feedback.
- Scripture & reading plan switcher with category filters (Eastern Traditions, Abrahamic & Ancient).
- 3 soothing reading palettes: **Parchment Light**, **Obsidian Dark**, and **Warm Sepia**.
- Full JSON backup export & restore.

---

## 💾 Privacy & Offline Storage Model

EverRead keeps your entire reading journey strictly client-side:

```ts
export type AppState = {
  selectedBook: BookId | null;
  readingPlan: string | null;
  progress: {
    completedDays: number[];
    completedChapters: string[];
    currentDay: number;
  };
  lastPosition: {
    day: number;
    section: string;
    chapter: number;
    verse: number;
    percent: number;
  } | null;
  settings: {
    fontSize: "small" | "medium" | "large";
    showOriginal: boolean;
    showTransliteration: boolean;
    theme: "light" | "dark" | "sepia";
  };
  streak: {
    current: number;
    longest: number;
    lastRead: string | null;
  };
  savedQuotes: string[];
  history: Record<string, ReadingHistoryEntry>;
};
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or 20+)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/everread.git
cd everread

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📜 Public Domain & Licensing

All scripture texts and translations included in EverRead are strictly in the public domain or distributed under open permissive licenses.
The EverRead application source code is licensed under the [MIT License](LICENSE).
