import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Filter,
  Lock,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/TabBar";
import { ProgressBar, ProgressRing } from "@/components/ProgressBar";
import { chapterProgress, useAppState } from "@/hooks/useAppState";
import {
  bookMeta,
  chapterKey,
  formatDayReadingsSummary,
  loadBook,
  loadPlan,
  readingLabel,
} from "@/lib/library";
import { BookIcon } from "@/components/BookIcon";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Scripture & Reading Plan — EverRead" },
      {
        name: "description",
        content:
          "Explore every chapter and reading plan day across 14 world scriptures — Bible, Quran, Gita, Upanishads, Vedas, Dhammapada, Tanakh, Tao Te Ching, Analects, Guru Granth Sahib, Jain Agamas, Kojiki, Avesta & Bahá'í Hidden Words. Track your completed readings and jump into any passage.",
      },
      { property: "og:title", content: "Scripture & Reading Plan — EverRead" },
      {
        property: "og:description",
        content:
          "Track chapters and reading plan days across 14 world sacred traditions. Bible, Quran, Gita, Dhammapada, Tao Te Ching, Torah & more.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://everread.app/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { state, hydrated, uncompleteDay, toggleChapter } = useAppState();
  const [tab, setTab] = useState<"plan" | "chapters">("plan");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filtered chapters for search
  const filteredSections = useMemo(() => {
    if (!book) return [];
    if (!searchQuery.trim()) return book.sections;

    const q = searchQuery.toLowerCase().trim();
    return book.sections
      .map((s) => {
        const matchesSection = s.name.toLowerCase().includes(q);
        const matchingChapters = s.chapters.filter(
          (c) =>
            matchesSection ||
            c.number.toString() === q ||
            (c.name && c.name.toLowerCase().includes(q)) ||
            (c.subtitle && c.subtitle.toLowerCase().includes(q)),
        );
        return {
          ...s,
          chapters: matchingChapters,
        };
      })
      .filter((s) => s.chapters.length > 0);
  }, [book, searchQuery]);

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  if (!state.selectedBook || !state.readingPlan) {
    return (
      <AppShell>
        <div className="py-16 text-center animate-fade-in-up">
          <BookOpen className="mx-auto size-12 text-muted-foreground/60" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
            No scripture selected
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a scripture to see your reading plan and track chapter progress.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-150 active:scale-[0.98] hover:bg-primary/95"
          >
            Choose Scripture
          </Link>
        </div>
      </AppShell>
    );
  }

  const meta = bookMeta(state.selectedBook);
  const dayPercent = plan
    ? Math.round((state.progress.completedDays.length / plan.totalDays) * 100)
    : 0;
  const chapters = book ? chapterProgress(state, book) : { total: 0, done: 0, percent: 0 };

  return (
    <AppShell>
      <div className="animate-fade-in-up space-y-6">
        {/* Header Banner */}
        <header className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm animate-float">
            <BookIcon bookId={meta.id} size={32} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-eyebrow text-primary/80">{meta.religion}</p>
            <h1 className="truncate font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {meta.name}
            </h1>
            <p className="text-xs font-medium text-muted-foreground">{plan?.name ?? meta.blurb}</p>
          </div>
          <div className="shrink-0 transition-transform duration-300 hover:scale-105">
            <ProgressRing percent={dayPercent} size={64} />
          </div>
        </header>

        {/* Progress Cards */}
        <section aria-label="Progress Statistics" className="surface-card grid grid-cols-2 divide-x divide-border/70 shadow-xs">
          <div className="p-4 text-center">
            <p className="text-eyebrow text-muted-foreground">Plan Days</p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {state.progress.completedDays.length}
              <span className="text-sm font-normal text-muted-foreground">
                /{plan?.totalDays ?? 0}
              </span>
            </p>
          </div>
          <div className="p-4 text-center">
            <p className="text-eyebrow text-muted-foreground">
              {meta.unitLabel}s Read
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {chapters.done}
              <span className="text-sm font-normal text-muted-foreground">
                /{chapters.total}
              </span>
            </p>
          </div>
        </section>

        {/* View Switcher Tabs */}
        <div className="flex gap-1 rounded-xl bg-secondary/80 p-1">
          {(["plan", "chapters"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg py-2.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                tab === t
                  ? "bg-card text-foreground shadow-xs font-bold scale-[1.01]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "plan" ? `Reading Plan (${plan?.totalDays ?? 0} Days)` : `All ${meta.unitLabel}s (${chapters.total})`}
            </button>
          ))}
        </div>

        {/* Tab 1: Reading Plan */}
        {tab === "plan" ? (
          <section aria-label="Reading Plan Schedule" className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>Tap any day to read</span>
              <span>{state.progress.completedDays.length} completed</span>
            </div>

            <ul className="space-y-2.5">
              {plan?.days.map((d) => {
                const isComplete = state.progress.completedDays.includes(d.day);
                const isCurrent = d.day === state.progress.currentDay;
                const label = book ? formatDayReadingsSummary(book, d.read) : "…";

                return (
                  <li key={d.day}>
                    <div
                      className={`surface-card-hover flex items-center gap-3 p-3.5 transition-all duration-150 ${
                        isCurrent
                          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                          : isComplete
                            ? "bg-card/70 opacity-80"
                            : ""
                      }`}
                    >
                      <Link
                        to="/read"
                        search={{ day: d.day }}
                        className="min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-eyebrow text-primary">
                            Day {d.day}
                          </span>
                          {isCurrent ? (
                            <span className="rounded-full bg-primary px-2 py-0.2 text-[0.65rem] font-bold text-primary-foreground">
                              Today
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-0.5 truncate font-display text-sm font-medium text-foreground">
                          {label}
                        </p>
                      </Link>

                      <button
                        onClick={() => {
                          if (isComplete) {
                            uncompleteDay(d.day);
                            toast.info(`Day ${d.day} marked unread`);
                          }
                        }}
                        title={isComplete ? "Mark unread" : `Day ${d.day} not read`}
                        aria-label={isComplete ? `Mark day ${d.day} unread` : `Day ${d.day} not read yet`}
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-150 active:scale-90 cursor-pointer ${
                          isComplete
                            ? "border-primary bg-primary text-primary-foreground shadow-xs"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {isComplete ? (
                          <Check className="size-4" />
                        ) : (
                          <span className="text-xs font-medium">{d.day}</span>
                        )}
                      </button>
                    </div>
                  </li>
                );
              }) ?? (
                <li className="py-8 text-center text-sm text-muted-foreground">Loading plan…</li>
              )}
            </ul>
          </section>
        ) : (
          /* Tab 2: All Chapters / Surahs */
          <section aria-label="Chapter Catalog" className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${meta.unitLabel.toLowerCase()}s or titles…`}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
              />
            </div>

            <div>
              <ProgressBar percent={chapters.percent} />
              <p className="mt-1.5 text-xs text-muted-foreground">
                {chapters.done} of {chapters.total} {meta.unitLabel.toLowerCase()}s completed ({chapters.percent}%)
              </p>
            </div>

            {filteredSections.map((s) => (
              <div key={s.id} className="space-y-2">
                <h2 className="text-eyebrow text-primary/80">{s.name}</h2>
                <div className="grid grid-cols-1 gap-2">
                  {s.chapters.map((c) => {
                    const key = chapterKey(s.id, c.number);
                    const isRead = state.progress.completedChapters.includes(key);

                    return (
                      <div
                        key={c.number}
                        className="surface-card flex items-center justify-between p-3 transition-all hover:border-primary/40"
                      >
                        <Link
                          to="/read"
                          search={{
                            day: 1,
                            chapter: c.number,
                            section: s.id,
                            book: state.selectedBook!,
                          }}
                          className="min-w-0 flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-display font-semibold text-foreground">
                              {meta.unitLabel} {c.number}
                            </span>
                            {c.name ? (
                              <span className="truncate text-xs text-muted-foreground">
                                · {c.name}
                              </span>
                            ) : null}
                          </div>
                          <span className="text-[0.7rem] text-muted-foreground">
                            {c.verses.length} verses
                          </span>
                        </Link>

                        <button
                          onClick={() => toggleChapter(s.id, c.number)}
                          title={isRead ? "Mark unread" : "Mark as read"}
                          aria-label={`Mark ${meta.unitLabel} ${c.number} as ${isRead ? "unread" : "read"}`}
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-150 active:scale-90 cursor-pointer ${
                            isRead
                              ? "border-primary bg-primary text-primary-foreground shadow-xs"
                              : "border-border bg-secondary/50 text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {isRead ? <Check className="size-4" /> : <span className="text-xs">{c.number}</span>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredSections.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">
                No matching chapters found.
              </p>
            )}
          </section>
        )}
      </div>
    </AppShell>
  );
}
