import { useCallback, useEffect, useState } from "react";
import { defaultState, readState, writeState, type AppState } from "@/lib/storage";
import { todayKey, yesterdayKey } from "@/lib/dates";
import type { BookId, Plan, Book } from "@/lib/library";
import { chapterKey } from "@/lib/library";

export function useAppState() {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = readState();
    setState(loaded);
    setHydrated(true);
    applyTheme(loaded.settings.theme);

    const sync = () => {
      const next = readState();
      setState(next);
      applyTheme(next.settings.theme);
    };
    window.addEventListener("everread:state", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("everread:state", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (s: AppState) => AppState) => {
    setState((prev) => {
      const next = fn(prev);
      writeState(next);
      if (next.settings.theme !== prev.settings.theme) {
        applyTheme(next.settings.theme);
      }
      return next;
    });
  }, []);

  const chooseBook = useCallback(
    (book: BookId, plan: string) =>
      update((s) => ({
        ...s,
        selectedBook: book,
        readingPlan: plan,
        progress: { completedDays: [], completedChapters: [], currentDay: 1 },
        lastPosition: null,
      })),
    [update],
  );

  const changePlan = useCallback(
    (plan: string) =>
      update((s) => ({
        ...s,
        readingPlan: plan,
        progress: { ...s.progress, currentDay: 1, completedDays: [] },
        lastPosition: null,
      })),
    [update],
  );

  const completeDay = useCallback(
    (day: number, plan: Plan) =>
      update((s) => {
        if (!s.selectedBook) return s;
        const isAlreadyDone = s.progress.completedDays.includes(day);
        const completedDays = isAlreadyDone
          ? s.progress.completedDays
          : [...s.progress.completedDays, day].sort((a, b) => a - b);

        const planDay = plan.days.find((d) => d.day === day);
        const chapters = new Set(s.progress.completedChapters);
        const dayChaptersList: string[] = [];

        planDay?.read.forEach((r) => {
          const key = chapterKey(r.section, r.chapter);
          dayChaptersList.push(key);
          if (r.full) chapters.add(key);
        });

        let next = 1;
        while (completedDays.includes(next) && next <= plan.totalDays) next += 1;

        const today = todayKey();
        const streak =
          s.streak.lastRead === today
            ? s.streak
            : {
                current: s.streak.lastRead === yesterdayKey() ? s.streak.current + 1 : 1,
                longest: Math.max(
                  s.streak.longest,
                  s.streak.lastRead === yesterdayKey() ? s.streak.current + 1 : 1,
                ),
                lastRead: today,
              };

        const history = {
          ...s.history,
          [today]: {
            date: today,
            day,
            book: s.selectedBook,
            chapters: dayChaptersList,
          },
        };

        return {
          ...s,
          progress: {
            completedDays,
            completedChapters: [...chapters],
            currentDay: Math.min(next, plan.totalDays),
          },
          lastPosition: null,
          streak,
          history,
        };
      }),
    [update],
  );

  const uncompleteDay = useCallback(
    (day: number) =>
      update((s) => {
        const completedDays = s.progress.completedDays.filter((d) => d !== day);
        let next = 1;
        while (completedDays.includes(next)) next += 1;
        return { ...s, progress: { ...s.progress, completedDays, currentDay: next } };
      }),
    [update],
  );

  const toggleChapter = useCallback(
    (sectionId: string, chapterNumber: number) =>
      update((s) => {
        const key = chapterKey(sectionId, chapterNumber);
        const exists = s.progress.completedChapters.includes(key);
        const completedChapters = exists
          ? s.progress.completedChapters.filter((c) => c !== key)
          : [...s.progress.completedChapters, key];
        return {
          ...s,
          progress: {
            ...s.progress,
            completedChapters,
          },
        };
      }),
    [update],
  );

  const savePosition = useCallback(
    (pos: AppState["lastPosition"]) =>
      update((s) => ({
        ...s,
        lastPosition: pos ? { ...pos, timestamp: Date.now() } : null,
      })),
    [update],
  );

  const clearPosition = useCallback(
    () => update((s) => ({ ...s, lastPosition: null })),
    [update],
  );

  const toggleQuote = useCallback(
    (id: string) =>
      update((s) => ({
        ...s,
        savedQuotes: s.savedQuotes.includes(id)
          ? s.savedQuotes.filter((q) => q !== id)
          : [...s.savedQuotes, id],
      })),
    [update],
  );

  const setSettings = useCallback(
    (patch: Partial<AppState["settings"]>) =>
      update((s) => {
        const nextSettings = { ...s.settings, ...patch };
        if (patch.theme) applyTheme(patch.theme);
        return { ...s, settings: nextSettings };
      }),
    [update],
  );

  const reset = useCallback(() => {
    update(() => defaultState);
    applyTheme("light");
  }, [update]);

  return {
    state,
    hydrated,
    chooseBook,
    changePlan,
    completeDay,
    uncompleteDay,
    toggleChapter,
    savePosition,
    clearPosition,
    toggleQuote,
    setSettings,
    reset,
  };
}

function applyTheme(theme: "light" | "dark" | "sepia") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "sepia");
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "sepia") {
    root.classList.add("sepia");
  }
}

export function chapterProgress(state: AppState, book: Book) {
  const total = book.sections.reduce((n, s) => n + s.chapters.length, 0);
  const done = state.progress.completedChapters.length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}
