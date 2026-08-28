import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/TabBar";
import { QuoteCard } from "@/components/QuoteCard";
import { useAppState } from "@/hooks/useAppState";
import { dayOfYear } from "@/lib/dates";
import { loadQuotes, type Quote } from "@/lib/library";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "Reflections & Saved Quotes — Lumina" },
      {
        name: "description",
        content:
          "Revisit the last two weeks of daily reflections and every verse you've saved from your reading.",
      },
      { property: "og:title", content: "Reflections & Saved Quotes — Lumina" },
      {
        property: "og:description",
        content: "A quiet archive of daily reflections and the verses you chose to keep.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/quotes" }],
  }),
  component: QuotesPage,
});

const HISTORY_DAYS = 14;

function QuotesPage() {
  const { state, hydrated, toggleQuote } = useAppState();
  const [tab, setTab] = useState<"history" | "saved" | "all">("history");

  const quotesQuery = useQuery({
    queryKey: ["quotes", state.selectedBook],
    queryFn: () => loadQuotes(state.selectedBook!),
    enabled: hydrated && !!state.selectedBook,
    staleTime: Infinity,
  });

  if (!hydrated) return <div className="min-h-screen bg-background" />;
  if (!state.selectedBook) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Choose a book to see daily reflections.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary">
          Get started
        </Link>
      </AppShell>
    );
  }

  const quotes = quotesQuery.data ?? [];
  const today = dayOfYear();

  const history = quotes.length
    ? Array.from({ length: HISTORY_DAYS }, (_, i) => {
        const offset = today - i;
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          quote: quotes[((offset % quotes.length) + quotes.length) % quotes.length],
          label:
            i === 0
              ? "Today"
              : i === 1
                ? "Yesterday"
                : date.toLocaleDateString(undefined, { month: "long", day: "numeric" }),
        };
      })
    : [];

  const saved = quotes.filter((q) => state.savedQuotes.includes(q.id));
  const list: { quote: Quote; label?: string }[] =
    tab === "history"
      ? history
      : tab === "saved"
        ? saved.map((q) => ({ quote: q }))
        : quotes.map((q) => ({ quote: q }));

  return (
    <AppShell>
      <header>
        <p className="text-eyebrow">Lumina</p>
        <h1 className="mt-1 text-3xl">Reflections</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          One verse a day, kept for you. Tap the bookmark to save any of them.
        </p>
      </header>

      <div className="mt-6 flex gap-1 rounded-xl bg-secondary p-1">
        {(
          [
            ["history", "History"],
            ["saved", `Saved${saved.length ? ` (${saved.length})` : ""}`],
            ["all", "All"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              tab === id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {tab === "saved" ? "No saved verses yet." : "Loading reflections…"}
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {list.map(({ quote, label }, i) => (
            <li key={`${quote.id}-${i}`}>
              <QuoteCard
                quote={quote}
                eyebrow={label}
                saved={state.savedQuotes.includes(quote.id)}
                onToggleSave={() => toggleQuote(quote.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
