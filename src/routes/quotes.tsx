import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, History, Search, Sparkles } from "lucide-react";
import { AppShell } from "@/components/TabBar";
import { QuoteCard } from "@/components/QuoteCard";
import { useAppState } from "@/hooks/useAppState";
import { dayOfYear } from "@/lib/dates";
import { loadQuotes, type Quote } from "@/lib/library";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "Daily Reflections & Sacred Quotes — EverRead" },
      {
        name: "description",
        content:
          "Explore daily spiritual reflections, bookmark sacred verses, and revisit scripture wisdom from world traditions.",
      },
      {
        name: "keywords",
        content:
          "daily spiritual reflection, daily scripture reflection, sacred verses, daily wisdom, Bible quotes, Quran verses, Bhagavad Gita quotes, Tao Te Ching quotes, Dhammapada quotes, morning reflection",
      },
      { property: "og:title", content: "Daily Reflections & Sacred Quotes — EverRead" },
      {
        property: "og:description",
        content: "A quiet archive of daily reflections and sacred verses you chose to keep.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://everread.app/quotes" }],
  }),
  component: QuotesPage,
});

const HISTORY_DAYS = 30;

function QuotesPage() {
  const { state, hydrated, toggleQuote } = useAppState();
  const [tab, setTab] = useState<"history" | "saved" | "all">("history");
  const [searchQuery, setSearchQuery] = useState("");

  const quotesQuery = useQuery({
    queryKey: ["quotes", state.selectedBook],
    queryFn: () => loadQuotes(state.selectedBook!),
    enabled: hydrated && !!state.selectedBook,
    staleTime: Infinity,
  });

  const quotes = quotesQuery.data ?? [];
  const today = dayOfYear();

  const history = useMemo(() => {
    if (!quotes.length) return [];
    return Array.from({ length: HISTORY_DAYS }, (_, i) => {
      const offset = today - i;
      const date = new Date();
      date.setDate(date.getDate() - i);
      const quoteIndex = ((offset % quotes.length) + quotes.length) % quotes.length;
      return {
        quote: quotes[quoteIndex],
        label:
          i === 0
            ? "Today’s Reflection"
            : i === 1
              ? "Yesterday"
              : date.toLocaleDateString(undefined, { month: "short", day: "numeric", weekday: "short" }),
      };
    });
  }, [quotes, today]);

  const saved = useMemo(() => {
    return quotes.filter((q) => state.savedQuotes.includes(q.id));
  }, [quotes, state.savedQuotes]);

  const rawList: { quote: Quote; label?: string }[] = useMemo(() => {
    if (tab === "history") return history;
    if (tab === "saved") return saved.map((q) => ({ quote: q }));
    return quotes.map((q) => ({ quote: q }));
  }, [tab, history, saved, quotes]);

  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return rawList;
    const q = searchQuery.toLowerCase().trim();
    return rawList.filter(
      (item) =>
        item.quote.text.toLowerCase().includes(q) ||
        item.quote.reference.toLowerCase().includes(q) ||
        (item.quote.original && item.quote.original.toLowerCase().includes(q)),
    );
  }, [rawList, searchQuery]);

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  if (!state.selectedBook) {
    return (
      <AppShell>
        <div className="py-16 text-center animate-fade-in-up">
          <Sparkles className="mx-auto size-12 text-muted-foreground/60" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
            No scripture selected
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a scripture to explore its daily reflections and bookmarks.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-150 active:scale-[0.98] hover:bg-primary/95"
          >
            Get Started
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="animate-fade-in-up space-y-6">
        <header>
          <p className="text-eyebrow text-primary/80">EverRead</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Reflections
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            One verse a day to nourish your stillness. Save your favorite wisdom for quiet moments.
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-1 rounded-xl bg-secondary/80 p-1">
          {(
            [
              ["history", "History"],
              ["saved", `Saved${saved.length ? ` (${saved.length})` : ""}`],
              ["all", "All Quotes"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                tab === id
                  ? "bg-card text-foreground shadow-xs font-bold scale-[1.01]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wisdom, verses, or chapters…"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
          />
        </div>

        {/* Quotes List */}
        {filteredList.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {tab === "saved"
              ? "No saved quotes yet. Tap the bookmark icon on any reflection to save it."
              : "No matching reflections found."}
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredList.map(({ quote, label }, i) => (
              <li key={`${quote.id}-${i}`} className="transition-all duration-200 hover:-translate-y-0.5">
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
      </div>
    </AppShell>
  );
}
