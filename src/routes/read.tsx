import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, Type } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { useAppState } from "@/hooks/useAppState";
import { findChapter, loadBook, loadPlan, readingLabel, type PlanReading } from "@/lib/library";

export const Route = createFileRoute("/read")({
  validateSearch: (search: Record<string, unknown>) => ({
    day: Number(search.day) > 0 ? Number(search.day) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Today's Reading — Lumina" },
      {
        name: "description",
        content: "Read today's passage in a calm, distraction-free reader and mark your day complete.",
      },
      { property: "og:title", content: "Today's Reading — Lumina" },
      {
        property: "og:description",
        content: "A quiet, distraction-free scripture reader that remembers exactly where you stopped.",
      },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/read" }],
  }),
  component: ReadPage,
});

const fontSizes = {
  small: "text-[1rem]",
  medium: "text-[1.125rem]",
  large: "text-[1.3125rem]",
} as const;

function ReadPage() {
  const { day } = Route.useSearch();
  const navigate = useNavigate();
  const { state, hydrated, completeDay, savePosition, setSettings } = useAppState();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  const enabled = hydrated && !!state.selectedBook && !!state.readingPlan;
  const bookQuery = useQuery({
    queryKey: ["book", state.selectedBook],
    queryFn: () => loadBook(state.selectedBook!),
    enabled,
    staleTime: Infinity,
  });
  const planQuery = useQuery({
    queryKey: ["plan", state.selectedBook, state.readingPlan],
    queryFn: () => loadPlan(state.selectedBook!, state.readingPlan!),
    enabled,
    staleTime: Infinity,
  });

  const book = bookQuery.data;
  const plan = planQuery.data;
  const planDay = plan?.days.find((d) => d.day === day);
  const done = state.progress.completedDays.includes(day);

  const blocks = useMemo(() => {
    if (!book || !planDay) return [];
    return planDay.read
      .map((r: PlanReading) => {
        const found = findChapter(book, r.section, r.chapter);
        if (!found) return null;
        const verses = found.chapter.verses.filter((v) => v.number >= r.from && v.number <= r.to);
        return { reading: r, section: found.section, chapter: found.chapter, verses };
      })
      .filter(Boolean) as {
      reading: PlanReading;
      section: { id: string; name: string };
      chapter: { number: number; name?: string; subtitle?: string };
      verses: { number: number; text: string; original?: string; transliteration?: string }[];
    }[];
  }, [book, planDay]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPercent(max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [blocks.length]);

  useEffect(() => {
    if (!blocks.length || done) return;
    return () => {
      const first = blocks[0];
      savePosition({
        day,
        section: first.section.id,
        chapter: first.chapter.number,
        verse: first.verses[0]?.number ?? 1,
        percent,
      });
    };
  }, [blocks, day, done, percent, savePosition]);

  if (!hydrated) return <div className="min-h-screen bg-background" />;
  if (!state.selectedBook || !state.readingPlan) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 text-center">
        <p className="text-sm text-muted-foreground">Choose a book first.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary">
          Go to Today
        </Link>
      </div>
    );
  }

  const size = fontSizes[state.settings.fontSize];

  return (
    <div className="min-h-screen bg-background pb-32" ref={scrollRef}>
      <div className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-5 py-3">
          <Link to="/" className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary">
            <ArrowLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-eyebrow">Day {day}</p>
            <p className="truncate text-sm font-semibold">
              {book && planDay
                ? planDay.read.map((r) => readingLabel(book, r)).join(" · ")
                : "Loading…"}
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({
                fontSize:
                  state.settings.fontSize === "small"
                    ? "medium"
                    : state.settings.fontSize === "medium"
                      ? "large"
                      : "small",
              })
            }
            aria-label="Change text size"
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
          >
            <Type className="size-5" />
          </button>
        </div>
        <div className="h-1 w-full bg-secondary">
          <div className="h-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <article className="mx-auto max-w-lg px-5 pt-8">
        {blocks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Preparing the passage…</p>
        ) : (
          blocks.map((b, i) => (
            <section key={`${b.section.id}-${b.chapter.number}-${i}`} className="mb-12">
              <p className="text-eyebrow">{b.section.name}</p>
              <h1 className="mt-1 text-2xl">
                {book?.unitLabel ?? "Chapter"} {b.chapter.number}
                {b.chapter.name ? ` · ${b.chapter.name}` : ""}
              </h1>
              {b.chapter.subtitle ? (
                <p className="mt-1 text-sm text-muted-foreground">{b.chapter.subtitle}</p>
              ) : null}
              <div className={`scripture-body mt-6 space-y-5 ${size}`}>
                {b.verses.map((v) => (
                  <p key={v.number} id={`v-${b.chapter.number}-${v.number}`}>
                    <span className="mr-2 align-super text-[0.65em] font-semibold text-primary">
                      {v.number}
                    </span>
                    {v.text}
                    {state.settings.showOriginal && v.original ? (
                      <span
                        dir="auto"
                        className="mt-2 block text-[0.9em] leading-loose text-muted-foreground"
                      >
                        {v.original}
                      </span>
                    ) : null}
                  </p>
                ))}
              </div>
            </section>
          ))
        )}
      </article>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 backdrop-blur">
        <div className="mx-auto max-w-lg">
          <ProgressBar percent={percent} />
          <button
            disabled={!plan || done}
            onClick={() => {
              if (!plan) return;
              completeDay(day, plan);
              navigate({ to: "/" });
            }}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-transform active:scale-[0.99] disabled:opacity-60"
          >
            <Check className="size-4" /> {done ? "Day complete" : "Mark day complete"}
          </button>
        </div>
      </div>
    </div>
  );
}
