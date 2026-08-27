import { useCallback, useEffect, useState } from "react";
import { defaultState, readState, writeState, type AppState } from "@/lib/storage";
import { todayKey, yesterdayKey } from "@/lib/dates";
import type { BookId, Plan, Book } from "@/lib/library";
import { chapterKey } from "@/lib/library";

export function useAppState() {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readState());
    setHydrated(true);
    const sync = () => setState(readState());
    window.addEventListener("lectio:state", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("lectio:state", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (s: AppState) => AppState) => {
    setState((prev) => {
      const next = fn(prev);
      writeState(next);
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
    (plan: string) => update((s) => ({ ...s, readingPlan: plan })),
    [update],
  );

  const completeDay = useCallback(
    (day: number, plan: Plan) =>
      update((s) => {
        if (s.progress.completedDays.includes(day)) return s;
        const completedDays = [...s.progress.completedDays, day].sort((a, b) => a - b);
        const planDay = plan.days.find((d) => d.day === day);
        const chapters = new Set(s.progress.completedChapters);
        planDay?.read.forEach((r) => {
          if (r.full) chapters.add(chapterKey(r.section, r.chapter));
        });
        let next = 1;
        while (completedDays.includes(next)) next += 1;
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
        return {
          ...s,
          progress: {
            completedDays,
            completedChapters: [...chapters],
            currentDay: Math.min(next, plan.totalDays),
          },
          lastPosition: null,
          streak,
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

  const savePosition = useCallback(
    (pos: AppState["lastPosition"]) => update((s) => ({ ...s, lastPosition: pos })),
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
      update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
    [update],
  );

  const reset = useCallback(() => update(() => defaultState), [update]);

  return {
    state,
    hydrated,
    chooseBook,
    changePlan,
    completeDay,
    uncompleteDay,
    savePosition,
    toggleQuote,
    setSettings,
    reset,
  };
}

export function chapterProgress(state: AppState, book: Book) {
  const total = book.sections.reduce((n, s) => n + s.chapters.length, 0);
  const done = state.progress.completedChapters.length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}
