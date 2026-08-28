import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Lock } from "lucide-react";
import { AppShell } from "@/components/TabBar";
import { ProgressBar, ProgressRing } from "@/components/ProgressBar";
import { chapterProgress, useAppState } from "@/hooks/useAppState";
import { bookMeta, chapterKey, loadBook, loadPlan, readingLabel } from "@/lib/library";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Your Book & Progress — Lumina" },
      {
        name: "description",
        content:
          "Browse every day of your reading plan, see which chapters you've finished, and jump back into any passage.",
      },
      { property: "og:title", content: "Your Book & Progress — Lumina" },
      {
        property: "og:description",
        content: "Track chapters read and plan days completed across your chosen scripture.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { state, hydrated, uncompleteDay } = useAppState();
  const [tab, setTab] = useState<"plan" | "chapters">("plan");

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

  if (!hydrated) return <div className="min-h-screen bg-background" />;
  if (!state.selectedBook || !state.readingPlan) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Choose a book to see your progress.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary">
          Get started
        </Link>
      </AppShell>
    );
  }

  const meta = bookMeta(state.selectedBook);
  const book = bookQuery.data;
  const plan = planQuery.data;
  const dayPercent = plan
    ? Math.round((state.progress.completedDays.length / plan.totalDays) * 100)
    : 0;
  const chapters = book ? chapterProgress(state, book) : { total: 0, done: 0, percent: 0 };

  return (
    <AppShell>
      <header className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent font-display text-3xl text-accent-foreground">
          {meta.symbol}
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl">{meta.name}</h1>
          <p className="text-eyebrow">{plan?.name ?? meta.religion}</p>
        </div>
        <div className="ml-auto">
          <ProgressRing percent={dayPercent} size={62} />
        </div>
      </header>

      <section className="surface-card mt-6 grid grid-cols-2 divide-x divide-border">
        <div className="p-4">
          <p className="text-eyebrow">Days</p>
          <p className="mt-1 font-display text-2xl">
            {state.progress.completedDays.length}
            <span className="text-base text-muted-foreground">/{plan?.totalDays ?? 0}</span>
          </p>
        </div>
        <div className="p-4">
          <p className="text-eyebrow">Chapters</p>
          <p className="mt-1 font-display text-2xl">
            {chapters.done}
            <span className="text-base text-muted-foreground">/{chapters.total}</span>
          </p>
        </div>
      </section>

      <div className="mt-6 flex gap-1 rounded-xl bg-secondary p-1">
        {(["plan", "chapters"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t === "plan" ? "Reading plan" : `${meta.unitLabel}s`}
          </button>
        ))}
      </div>

      {tab === "plan" ? (
        <ul className="mt-5 space-y-2.5">
          {plan?.days.map((d) => {
            const complete = state.progress.completedDays.includes(d.day);
            const current = d.day === state.progress.currentDay;
            return (
              <li key={d.day} className="surface-card flex items-center gap-3 p-3.5">
                <Link
                  to="/read"
                  search={{ day: d.day }}
                  className="min-w-0 flex-1"
                >
                  <p className="text-eyebrow">
                    Day {d.day}
                    {current ? " · Today" : ""}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium">
                    {book ? d.read.map((r) => readingLabel(book, r)).join(" · ") : "…"}
                  </p>
                </Link>
                <button
                  onClick={() => complete && uncompleteDay(d.day)}
                  aria-label={complete ? `Mark day ${d.day} unread` : `Day ${d.day} not read yet`}
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                    complete
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {complete ? <Check className="size-4" /> : <span className="text-xs">{d.day}</span>}
                </button>
              </li>
            );
          }) ?? <li className="text-sm text-muted-foreground">Loading plan…</li>}
        </ul>
      ) : (
        <div className="mt-5">
          <ProgressBar percent={chapters.percent} />
          <p className="mt-2 text-xs text-muted-foreground">
            {chapters.percent}% of {meta.name} read
          </p>
          {book?.sections.map((s) => (
            <section key={s.id} className="mt-6">
              <h2 className="text-eyebrow">{s.name}</h2>
              <ul className="mt-2 grid grid-cols-6 gap-2">
                {s.chapters.map((c) => {
                  const read = state.progress.completedChapters.includes(chapterKey(s.id, c.number));
                  return (
                    <li key={c.number}>
                      <span
                        title={c.name ?? `${meta.unitLabel} ${c.number}`}
                        className={`flex aspect-square items-center justify-center rounded-lg text-xs font-semibold ${
                          read
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {c.number}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )) ?? null}
          {!book ? (
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="size-4" /> Loading chapters…
            </p>
          ) : null}
        </div>
      )}
    </AppShell>
  );
}
