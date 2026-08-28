import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Languages,
  RotateCcw,
  Sparkles,
  Type,
} from "lucide-react";
import { toast } from "sonner";
import { ProgressBar } from "@/components/ProgressBar";
import { useAppState } from "@/hooks/useAppState";
import {
  findChapter,
  formatDayReadingsSummary,
  loadBook,
  loadPlan,
  readingLabel,
  type BookId,
  type PlanReading,
} from "@/lib/library";

export const Route = createFileRoute("/read")({
  validateSearch: (search: Record<string, unknown>) => ({
    day: Number(search.day) > 0 ? Number(search.day) : 1,
    chapter: search.chapter ? Number(search.chapter) : undefined,
    section: search.section ? String(search.section) : undefined,
    book: search.book ? (String(search.book) as BookId) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Daily Reading — EverRead" },
      {
        name: "description",
        content:
          "Read today's sacred scriptures in a distraction-free reader with original scripts, transliteration, and offline habit tracking.",
      },
      { property: "og:title", content: "Daily Scripture Reading — EverRead" },
      {
        property: "og:description",
        content: "A quiet, tranquil scripture reader that remembers exactly where you left off.",
      },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://everread.app/read" }],
  }),
  component: ReadPage,
});

const fontSizes = {
  small: "text-[1rem] leading-[1.85]",
  medium: "text-[1.15rem] leading-[1.95]",
  large: "text-[1.35rem] leading-[2.1]",
} as const;

function ReadPage() {
  const { day, chapter: freeChapter, section: freeSection, book: freeBook } = Route.useSearch();
  const navigate = useNavigate();
  const {
    state,
    hydrated,
    completeDay,
    savePosition,
    setSettings,
  } = useAppState();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);

  const activeBookId = freeBook || state.selectedBook;
  const activePlanId = state.readingPlan;

  const enabled = hydrated && !!activeBookId;
  const bookQuery = useQuery({
    queryKey: ["book", activeBookId],
    queryFn: () => loadBook(activeBookId!),
    enabled,
    staleTime: Infinity,
  });

  const planQuery = useQuery({
    queryKey: ["plan", activeBookId, activePlanId],
    queryFn: () => loadPlan(activeBookId!, activePlanId!),
    enabled: enabled && !!activePlanId && !freeChapter,
    staleTime: Infinity,
  });

  const book = bookQuery.data;
  const plan = planQuery.data;
  const planDay = plan?.days.find((d) => d.day === day);
  const isDayDone = state.progress.completedDays.includes(day);

  // Determine blocks to render: either from plan day or free chapter
  const blocks = useMemo(() => {
    if (!book) return [];

    // Free chapter reader mode
    if (freeChapter !== undefined) {
      const targetSection = freeSection
        ? book.sections.find((s) => s.id === freeSection) ?? book.sections[0]
        : book.sections[0];
      const targetCh = targetSection?.chapters.find((c) => c.number === freeChapter);
      if (!targetSection || !targetCh) return [];

      return [
        {
          reading: {
            section: targetSection.id,
            chapter: targetCh.number,
            from: 1,
            to: targetCh.verses.length,
            full: true,
          },
          section: targetSection,
          chapter: targetCh,
          verses: targetCh.verses,
        },
      ];
    }

    // Reading plan mode
    if (!planDay) return [];
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
  }, [book, planDay, freeChapter, freeSection]);

  // Scroll percentage calculation
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const current = max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0;
      setPercent(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [blocks.length]);

  // Save last reading position on unmount/scroll
  useEffect(() => {
    if (!blocks.length || freeChapter !== undefined) return;

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
  }, [blocks, day, percent, savePosition, freeChapter]);

  const handleCopyVerse = async (chNum: number, vNum: number, text: string, original?: string) => {
    try {
      const citation = `${book?.name} ${chNum}:${vNum}`;
      const copyText = original
        ? `${text}\n${original}\n— ${citation}`
        : `${text}\n— ${citation}`;
      await navigator.clipboard.writeText(copyText);
      setCopiedVerse(vNum);
      toast.success(`Copied verse ${chNum}:${vNum}`);
      setTimeout(() => setCopiedVerse(null), 1500);
    } catch {
      toast.error("Failed to copy verse");
    }
  };

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  if (!activeBookId) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center animate-fade-in-up">
        <h1 className="font-display text-2xl font-semibold text-foreground">Choose a scripture</h1>
        <p className="mt-2 text-sm text-muted-foreground">Select a scripture first to begin reading.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all active:scale-95"
        >
          Go to Today
        </Link>
      </div>
    );
  }

  const fontSizeClass = fontSizes[state.settings.fontSize];
  const summaryTitle = book && planDay ? formatDayReadingsSummary(book, planDay.read) : (freeChapter ? `Chapter ${freeChapter}` : "Daily Reading");
  const nextDay = plan ? Math.min(day + 1, plan.totalDays) : null;
  const prevDay = day > 1 ? day - 1 : null;
  const hasNextDay = plan && day < plan.totalDays;

  const isRTLScript = activeBookId === "quran" || activeBookId === "tanakh" || activeBookId === "bahai";

  return (
    <div className="min-h-screen bg-background pb-36 text-foreground animate-fade-in-up" ref={scrollRef}>
      {/* Sticky Reader Header */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2 px-4 py-3">
          <Link
            to={freeChapter ? "/book" : "/"}
            aria-label="Back"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all active:scale-95 hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="size-5" />
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <p className="text-eyebrow text-primary/90 truncate">
              {freeChapter ? `${book?.name}` : `Day ${day} of ${plan?.totalDays ?? 1}`}
            </p>
            <p className="truncate font-display text-sm font-semibold text-foreground">
              {summaryTitle}
            </p>
          </div>

          {/* Reader Preferences Buttons */}
          <div className="flex items-center gap-1">
            {/* Script toggle (original language) */}
            <button
              onClick={() =>
                setSettings({ showOriginal: !state.settings.showOriginal })
              }
              title={state.settings.showOriginal ? "Hide original text" : "Show original text"}
              aria-label="Toggle original script"
              className={`flex size-9 items-center justify-center rounded-full transition-all active:scale-95 cursor-pointer ${
                state.settings.showOriginal
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Languages className="size-4" />
            </button>

            {/* Font Size Selector */}
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
              title="Change reading text size"
              aria-label="Change text size"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all active:scale-95 hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <Type className="size-4" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-1 w-full bg-secondary">
          <div
            className="h-full bg-primary transition-[width] duration-150"
            style={{ width: `${percent}%` }}
          />
        </div>
      </header>

      {/* Scripture Article Content */}
      <main className="mx-auto max-w-lg px-5 pt-8">
        {blocks.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            Preparing the sacred text…
          </div>
        ) : (
          blocks.map((b, i) => (
            <article
              key={`${b.section.id}-${b.chapter.number}-${i}`}
              className="mb-14 border-b border-border/40 pb-12 last:border-b-0"
            >
              <div className="mb-6 text-center">
                <p className="text-eyebrow text-primary/80">{b.section.name}</p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {book?.unitLabel ?? "Chapter"} {b.chapter.number}
                  {b.chapter.name ? ` · ${b.chapter.name}` : ""}
                </h1>
                {b.chapter.subtitle ? (
                  <p className="mt-2 text-xs text-muted-foreground italic max-w-md mx-auto">
                    {b.chapter.subtitle}
                  </p>
                ) : null}
              </div>

              <div className={`scripture-body space-y-6 ${fontSizeClass}`}>
                {b.verses.map((v) => (
                  <div
                    key={v.number}
                    id={`v-${b.chapter.number}-${v.number}`}
                    onClick={() => handleCopyVerse(b.chapter.number, v.number, v.text, v.original)}
                    className="group relative rounded-xl p-3 -mx-3 transition-all duration-150 active:scale-[0.99] hover:bg-secondary/40 cursor-pointer"
                    title="Tap to copy verse"
                  >
                    <p className="text-foreground leading-relaxed">
                      <span className="mr-2.5 inline-flex size-5.5 select-none items-center justify-center rounded-full bg-primary/10 text-[0.68rem] font-bold text-primary align-middle shadow-2xs">
                        {v.number}
                      </span>
                      {v.text}
                    </p>

                    {/* Original Script */}
                    {state.settings.showOriginal && v.original ? (
                      <div
                        dir={isRTLScript ? "rtl" : "ltr"}
                        className={`mt-2.5 rounded-xl bg-accent/35 p-3 text-[0.94em] text-foreground select-text shadow-2xs ${
                          isRTLScript ? "arabic-text text-xl" : "sanskrit-text italic"
                        }`}
                      >
                        {v.original}
                      </div>
                    ) : null}

                    {/* Transliteration */}
                    {state.settings.showTransliteration && v.transliteration ? (
                      <p className="mt-1.5 text-[0.82em] italic text-muted-foreground/90 leading-normal">
                        {v.transliteration}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          ))
        )}

        {/* Day Navigation Bar inside content */}
        {!freeChapter && plan && (
          <nav aria-label="Day Navigation" className="mt-10 flex items-center justify-between border-t border-border pt-6 text-sm">
            {prevDay ? (
              <Link
                to="/read"
                search={{ day: prevDay }}
                className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-4" /> Day {prevDay}
              </Link>
            ) : (
              <span />
            )}

            {hasNextDay && nextDay ? (
              <Link
                to="/read"
                search={{ day: nextDay }}
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline transition-colors cursor-pointer"
              >
                Day {nextDay} <ChevronRight className="size-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </main>

      {/* Floating Bottom Action Bar */}
      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-card/95 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3.5 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progress: {percent}%</span>
            <span>{isDayDone ? "Day completed ✓" : "Keep reading"}</span>
          </div>

          <ProgressBar percent={percent} />

          <div className="mt-3 flex items-center gap-2">
            {!freeChapter && plan ? (
              <button
                onClick={() => {
                  completeDay(day, plan);
                  toast.success(`Day ${day} marked complete! Streak active 🔥`);
                  navigate({ to: "/" });
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-sm transition-all duration-150 active:scale-[0.98] hover:bg-primary/95 cursor-pointer"
              >
                <Check className="size-4" />
                {isDayDone ? "Day Completed ✓ (Finish)" : "Mark Day Complete"}
              </button>
            ) : (
              <Link
                to="/book"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-sm transition-all duration-150 active:scale-[0.98]"
              >
                Return to Book
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
