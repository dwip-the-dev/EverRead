import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Flame } from "lucide-react";
import { AppShell } from "@/components/TabBar";
import { Onboarding } from "@/components/Onboarding";
import { ProgressBar } from "@/components/ProgressBar";
import { QuoteCard } from "@/components/QuoteCard";
import { useAppState } from "@/hooks/useAppState";
import { dayOfYear, greeting, longDate } from "@/lib/dates";
import { bookMeta, loadBook, loadPlan, loadQuotes, readingLabel } from "@/lib/library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lectio — Daily Scripture Reading & Streaks" },
      {
        name: "description",
        content:
          "Pick a scripture, follow a reading plan, and build a daily habit. Bible, Quran and Bhagavad Gita, bundled offline.",
      },
      { property: "og:title", content: "Lectio — Daily Scripture Reading & Streaks" },
      {
        property: "og:description",
        content:
          "A calm daily reading companion for the Bible, Quran and Bhagavad Gita. Your progress stays on your device.",
      },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const { state, hydrated, chooseBook, toggleQuote } = useAppState();

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
  if (!state.selectedBook || !state.readingPlan) return <Onboarding onChoose={chooseBook} />;

  const meta = bookMeta(state.selectedBook);
  const plan = planQuery.data;
  const book = bookQuery.data;
  const day = Math.min(state.progress.currentDay, plan?.totalDays ?? 1);
  const planDay = plan?.days.find((d) => d.day === day);
  const percent = plan ? Math.round((state.progress.completedDays.length / plan.totalDays) * 100) : 0;
  const quotes = quotesQuery.data ?? [];
  const quote = quotes.length ? quotes[dayOfYear() % quotes.length] : null;
  const resume = state.lastPosition;

  return (
    <AppShell>
      <header>
        <p className="text-eyebrow">{longDate()}</p>
        <h1 className="mt-1 text-3xl">{greeting()}</h1>
      </header>

      {resume && book ? (
        <Link
          to="/read"
          search={{ day: resume.day }}
          className="surface-card mt-6 block bg-accent/40 p-4"
        >
          <p className="text-eyebrow">Continue where you left off</p>
          <p className="mt-1 font-display text-lg">Day {resume.day}</p>
          <p className="mt-2 text-xs text-muted-foreground">{resume.percent}% through the reading</p>
          <div className="mt-2">
            <ProgressBar percent={resume.percent} />
          </div>
        </Link>
      ) : null}

      <section className="surface-card mt-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow">Day {day} · {meta.name}</p>
            <h2 className="mt-2 font-display text-2xl leading-snug">
              {book && planDay
                ? planDay.read.map((r) => readingLabel(book, r)).join(" · ")
                : "Preparing your reading…"}
            </h2>
          </div>
          {state.streak.current > 0 ? (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
              <Flame className="size-3.5 text-gold" /> {state.streak.current}
            </span>
          ) : null}
        </div>
        <Link
          to="/read"
          search={{ day }}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-transform active:scale-[0.99]"
        >
          Start reading <ArrowRight className="size-4" />
        </Link>
      </section>

      <section className="mt-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-eyebrow">Your progress</h3>
          <p className="text-xs text-muted-foreground">
            {state.progress.completedDays.length} / {plan?.totalDays ?? 0} days
          </p>
        </div>
        <div className="mt-3">
          <ProgressBar percent={percent} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {percent}% of the {plan?.name ?? ""} plan complete
        </p>
      </section>

      {quote ? (
        <section className="mt-8">
          <QuoteCard
            quote={quote}
            eyebrow="Today's reflection"
            saved={state.savedQuotes.includes(quote.id)}
            onToggleSave={() => toggleQuote(quote.id)}
          />
        </section>
      ) : null}
    </AppShell>
  );
}
