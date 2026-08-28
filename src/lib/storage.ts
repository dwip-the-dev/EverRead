import type { BookId } from "./library";

export type LastPosition = {
  day: number;
  section: string;
  chapter: number;
  verse: number;
  percent: number;
  timestamp?: number;
} | null;

export type ReadingHistoryEntry = {
  date: string;
  day: number;
  book: BookId;
  chapters: string[];
};

export type AppState = {
  selectedBook: BookId | null;
  readingPlan: string | null;
  progress: {
    completedDays: number[];
    completedChapters: string[];
    currentDay: number;
  };
  lastPosition: LastPosition;
  settings: {
    fontSize: "small" | "medium" | "large";
    showOriginal: boolean;
    showTransliteration: boolean;
    theme: "light" | "dark" | "sepia";
    dailyReminderTime?: string;
  };
  streak: {
    current: number;
    longest: number;
    lastRead: string | null;
  };
  savedQuotes: string[];
  history: Record<string, ReadingHistoryEntry>; // dateKey -> entry
};

export const PRIMARY_STORAGE_KEY = "everread.state.v1";
export const LEGACY_STORAGE_KEYS = ["lectio.state.v1", "lumina.state.v1"];

export const defaultState: AppState = {
  selectedBook: null,
  readingPlan: null,
  progress: { completedDays: [], completedChapters: [], currentDay: 1 },
  lastPosition: null,
  settings: {
    fontSize: "medium",
    showOriginal: true,
    showTransliteration: true,
    theme: "light",
    dailyReminderTime: "07:00",
  },
  streak: { current: 0, longest: 0, lastRead: null },
  savedQuotes: [],
  history: {},
};

export function readState(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    let raw = window.localStorage.getItem(PRIMARY_STORAGE_KEY);
    if (!raw) {
      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const legacy = window.localStorage.getItem(legacyKey);
        if (legacy) {
          raw = legacy;
          break;
        }
      }
    }
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...defaultState,
      ...parsed,
      progress: { ...defaultState.progress, ...(parsed.progress ?? {}) },
      settings: { ...defaultState.settings, ...(parsed.settings ?? {}) },
      streak: { ...defaultState.streak, ...(parsed.streak ?? {}) },
      savedQuotes: parsed.savedQuotes ?? [],
      history: parsed.history ?? {},
    };
  } catch {
    return defaultState;
  }
}

export function writeState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRIMARY_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("everread:state"));
}

export function exportStateJson(): string {
  const state = readState();
  return JSON.stringify(state, null, 2);
}

export function importStateJson(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as Partial<AppState>;
    if (!parsed || typeof parsed !== "object") return false;
    const merged: AppState = {
      ...defaultState,
      ...parsed,
      progress: { ...defaultState.progress, ...(parsed.progress ?? {}) },
      settings: { ...defaultState.settings, ...(parsed.settings ?? {}) },
      streak: { ...defaultState.streak, ...(parsed.streak ?? {}) },
      savedQuotes: Array.isArray(parsed.savedQuotes) ? parsed.savedQuotes : [],
      history: parsed.history ?? {},
    };
    writeState(merged);
    return true;
  } catch {
    return false;
  }
}
