import type { BookId } from "./library";

export type LastPosition = {
  day: number;
  section: string;
  chapter: number;
  verse: number;
  percent: number;
} | null;

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
  };
  streak: { current: number; longest: number; lastRead: string | null };
  savedQuotes: string[];
};

export const STORAGE_KEY = "lectio.state.v1";

export const defaultState: AppState = {
  selectedBook: null,
  readingPlan: null,
  progress: { completedDays: [], completedChapters: [], currentDay: 1 },
  lastPosition: null,
  settings: { fontSize: "medium", showOriginal: true },
  streak: { current: 0, longest: 0, lastRead: null },
  savedQuotes: [],
};

export function readState(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...defaultState,
      ...parsed,
      progress: { ...defaultState.progress, ...(parsed.progress ?? {}) },
      settings: { ...defaultState.settings, ...(parsed.settings ?? {}) },
      streak: { ...defaultState.streak, ...(parsed.streak ?? {}) },
      savedQuotes: parsed.savedQuotes ?? [],
    };
  } catch {
    return defaultState;
  }
}

export function writeState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("lectio:state"));
}
