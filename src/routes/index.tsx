import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Flame, RotateCcw, Sparkles } from "lucide-react";
import { AppShell } from "@/components/TabBar";
import { Onboarding } from "@/components/Onboarding";
import { ProgressBar } from "@/components/ProgressBar";
import { QuoteCard } from "@/components/QuoteCard";
import { useAppState } from "@/hooks/useAppState";
import { dayOfYear, greeting, longDate } from "@/lib/dates";
import { bookMeta, formatDayReadingsSummary, loadBook, loadPlan, loadQuotes } from "@/lib/library";
import { BookIcon } from "@/components/BookIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EverRead — Daily Scripture Reading Companion for 14 World Traditions" },
      {
        name: "description",
        content:
          "Daily scripture reading with the simplicity of habit. Read the Holy Bible, Quran, Bhagavad Gita, Upanishads, Vedas, Dhammapada, Tanakh, Tao Te Ching, Analects, Guru Granth Sahib, Jain Agamas, Kojiki, Avesta & Bahá'í Hidden Words.",
      },
      {
        name: "keywords",
        content:
          "daily scripture reading, daily religious reading, daily spiritual reading, Bible reading plan, Quran reading plan, Bhagavad Gita reading plan, Dhammapada reading plan, Tao Te Ching reading plan, Upanishads reading, Vedas reading, Tanakh reading, Torah reading, Guru Granth Sahib, Jain Agamas, Kojiki, Avesta, Bahá'í Hidden Words, Analects, scripture reading tracker, daily reading habit, private scripture reader, world scripture reading, interfaith reading",
      },
      { property: "og:title", content: "EverRead — Daily Scripture Reading Companion for 14 World Traditions" },
      {
        property: "og:description",
        content:
          "A quiet, distraction-free daily scripture reading companion. Pick your scripture from 14 world traditions, follow a calm reading plan, and track your streak.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://everread.app" },
    ],
    links: [{ rel: "canonical", href: "https://everread.app" }],
  }),
  component: TodayPage,
});

function TodayPage() {
  const { state, hydrated, chooseBook, toggleQuote } = useAppState();
  const [changingBook, setChangingBook] = useState(false);

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
  const quotesQuery = useQuery({
    queryKey: ["quotes", state.selectedBook],
    queryFn: () => loadQuotes(state.selectedBook!),
    enabled,
    staleTime: Infinity,
  });

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  // Initial onboarding or switching book modal
  if (!state.selectedBook || !state.readingPlan || changingBook) {
    return (
      <Onboarding
        onChoose={(book, plan) => {
          chooseBook(book, plan);
          setChangingBook(false);
        }}
        onCancel={state.selectedBook ? () => setChangingBook(false) : undefined}
      />
    );
  }

  const meta = bookMeta(state.selectedBook);
  const plan = planQuery.data;
  const book = bookQuery.data;
  const day = Math.min(state.progress.currentDay, plan?.totalDays ?? 1);
  const planDay = plan?.days.find((d) => d.day === day);
  const isTodayComplete = state.progress.completedDays.includes(day);
  const percent = plan
    ? Math.round((state.progress.completedDays.length / plan.totalDays) * 100)
    : 0;
  const quotes = quotesQuery.data ?? [];
  const quote = quotes.length ? quotes[dayOfYear() % quotes.length] : null;
  const resume = state.lastPosition;

  const readingSummary = book && planDay ? formatDayReadingsSummary(book, planDay.read) : "Preparing your reading…";
  const estimatedMins = Math.max(3, (planDay?.read.length ?? 1) * 4);

  return (
    <AppShell>
      <div className="animate-fade-in-up space-y-6">
        {/* Header Bar */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow text-primary/80">{longDate()}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {greeting()}
            </h1>
          </div>

          {state.streak.current > 0 ? (
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-foreground shadow-xs animate-flame">
              <Flame className="size-4 text-gold fill-gold" />
              <span>{state.streak.current} day{state.streak.current === 1 ? "" : "s"}</span>
            </div>
          ) : null}
        </header>

        {/* Selected Book Banner */}
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 shadow-xs backdrop-blur-xs transition-all hover:border-primary/40">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-inner animate-float">
              <BookIcon bookId={meta.id} size={20} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                {meta.name}
              </p>
              <p className="truncate text-[0.7rem] text-muted-foreground">
                {plan?.name ?? meta.religion}
              </p>
            </div>
          </div>
          <button
            onClick={() => setChangingBook(true)}
            className="shrink-0 rounded-lg bg-secondary/80 px-2.5 py-1 text-xs font-medium text-primary hover:bg-secondary transition-colors cursor-pointer ml-2"
          >
            Change
          </button>
        </div>

        {/* Resume Card (if user left mid-reading) */}
        {resume && resume.percent < 95 && resume.day === day && (
          <section aria-labelledby="resume-heading">
            <Link
              to="/read"
              search={{ day: resume.day }}
              className="surface-card-hover group relative block overflow-hidden border-primary/30 bg-primary/5 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-eyebrow text-primary font-semibold">
                  Continue where you left off
                </span>
                <span className="text-xs font-semibold text-primary">
                  {resume.percent}% done
                </span>
              </div>
              <p id="resume-heading" className="mt-1 font-display text-lg font-semibold text-foreground">
                Day {resume.day} · Continue reading
              </p>
              <div className="mt-3">
                <ProgressBar percent={resume.percent} />
              </div>
            </Link>
          </section>
        )}

        {/* Today's Reading Card */}
        <section aria-labelledby="today-reading-heading" className="surface-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-eyebrow text-primary font-bold">
                  Day {day} of {plan?.totalDays ?? 1}
                </span>
                {isTodayComplete ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sage/15 px-2 py-0.5 text-[0.7rem] font-semibold text-sage">
                    <CheckCircle2 className="size-3" /> Completed
                  </span>
                ) : (
                  <span className="text-[0.7rem] text-muted-foreground">
                    ~{estimatedMins} min read
                  </span>
                )}
              </div>

              <h2 id="today-reading-heading" className="mt-2 font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
                {readingSummary}
              </h2>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              to="/read"
              search={{ day }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-sm transition-all duration-150 active:scale-[0.98] hover:bg-primary/95 hover:shadow-md cursor-pointer"
            >
              {isTodayComplete ? (
                <>
                  <RotateCcw className="size-4" /> Read Again
                </>
              ) : (
                <>
                  Start Reading <ArrowRight className="size-4" />
                </>
              )}
            </Link>

            <Link
              to="/book"
              className="inline-flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span>View full reading plan</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </section>

        {/* Plan Progress Section */}
        <section aria-labelledby="progress-heading">
          <div className="flex items-baseline justify-between">
            <h3 id="progress-heading" className="text-eyebrow text-foreground/80">
              Reading Plan Progress
            </h3>
            <p className="text-xs font-semibold text-muted-foreground">
              {state.progress.completedDays.length} / {plan?.totalDays ?? 0} days ({percent}%)
            </p>
          </div>
          <div className="mt-2.5">
            <ProgressBar percent={percent} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[0.75rem] text-muted-foreground">
            <span>{plan?.name ?? "Daily Pace"}</span>
            <span>{Math.max(0, (plan?.totalDays ?? 0) - state.progress.completedDays.length)} days remaining</span>
          </div>
        </section>

        {/* Daily Reflection Quote */}
        {quote ? (
          <section aria-labelledby="reflection-heading">
            <QuoteCard
              quote={quote}
              eyebrow="Today's Reflection"
              saved={state.savedQuotes.includes(quote.id)}
              onToggleSave={() => toggleQuote(quote.id)}
            />
          </section>
        ) : null}

        {/* Habit / Encouragement Footer */}
        <footer className="pt-2 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground/80 italic">
            “A passage a day keeps the heart still and the mind clear.”
          </p>
        </footer>
      </div>
    </AppShell>
  );
}
