import { useState, useMemo } from "react";
import { ArrowLeft, BookOpen, Check, Search, ShieldCheck, Sparkles } from "lucide-react";
import { BOOKS, type BookId } from "@/lib/library";
import { BookIcon } from "@/components/BookIcon";

interface OnboardingProps {
  onChoose: (book: BookId, plan: string) => void;
  onCancel?: () => void;
}

type TraditionFilter = "all" | "eastern" | "abrahamic";

export function Onboarding({ onChoose, onCancel }: OnboardingProps) {
  const [selected, setSelected] = useState<BookId | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TraditionFilter>("all");

  const meta = BOOKS.find((b) => b.id === selected);

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((b) => {
      const matchesSearch =
        search.trim() === "" ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.religion.toLowerCase().includes(search.toLowerCase()) ||
        b.blurb.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "eastern") {
        return ["Hinduism", "Buddhism", "Taoism", "Confucianism", "Jainism", "Shintoism", "Sikhism"].includes(
          b.religion,
        );
      }
      if (filter === "abrahamic") {
        return ["Christianity", "Islam", "Judaism", "Baháʼí Faith", "Zoroastrianism"].includes(
          b.religion,
        );
      }
      return true;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in-up">
      <div className="mx-auto max-w-lg px-5 pb-16 pt-12">
        {!meta ? (
          <>
            {onCancel ? (
              <button
                onClick={onCancel}
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4" /> Cancel
              </button>
            ) : null}

            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="size-4" />
              </span>
              <span className="text-eyebrow tracking-widest text-primary font-bold">EverRead</span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Choose your scripture to begin.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A quiet daily reading companion. Select a sacred text from world traditions, choose your pace, and build a peaceful habit.
            </p>

            {/* Search and Tradition Filter */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 14 sacred scriptures or traditions…"
                  className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
                />
              </div>

              <div className="flex gap-1 rounded-xl bg-secondary/80 p-1 text-xs">
                {(
                  [
                    ["all", `All (${BOOKS.length})`],
                    ["eastern", "Eastern Traditions"],
                    ["abrahamic", "Abrahamic & Ancient"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className={`flex-1 rounded-lg py-1.5 font-semibold transition-all cursor-pointer ${
                      filter === id
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scripture Cards List */}
            <ul className="mt-6 space-y-3">
              {filteredBooks.map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => setSelected(b.id)}
                    className="surface-card-hover group flex w-full items-center gap-4 p-4 text-left cursor-pointer transition-all duration-200"
                  >
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/60 text-accent-foreground shadow-inner transition-transform duration-300 group-hover:scale-110">
                      <BookIcon bookId={b.id} size={28} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg font-semibold text-foreground truncate">
                          {b.name}
                        </span>
                        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
                          {b.chapterCount} {b.unitLabel.toLowerCase()}s
                        </span>
                      </div>
                      <span className="text-eyebrow mt-0.5 block text-primary/85">
                        {b.religion}
                      </span>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {b.blurb}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {filteredBooks.length === 0 && (
              <p className="py-12 text-center text-xs text-muted-foreground">
                No scriptures match your search.
              </p>
            )}

            <div className="mt-8 rounded-2xl border border-border/70 bg-card/60 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-foreground">
                <ShieldCheck className="size-4 text-sage" /> 100% Offline & Private
              </div>
              <p className="mt-1 text-[0.75rem] text-muted-foreground">
                All scriptures and reading progress remain strictly on your device. No accounts, no data tracking, no ads.
              </p>
            </div>
          </>
        ) : (
          <div className="animate-fade-in-up">
            <button
              onClick={() => setSelected(null)}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-4" /> Choose another book
            </button>

            <div className="flex items-center gap-4">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground animate-float">
                <BookIcon bookId={meta.id} size={32} />
              </span>
              <div>
                <p className="text-eyebrow text-primary">{meta.religion}</p>
                <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{meta.name}</h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground bg-secondary/50 p-4 rounded-xl border border-border/50">
              {meta.blurb}
            </p>

            <h2 className="mt-8 font-display text-lg font-semibold text-foreground">
              Select your reading pace
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              You can adjust this anytime in your profile without losing chapter history.
            </p>

            <ul className="mt-4 space-y-3">
              {meta.plans.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onChoose(meta.id, p.id)}
                    className="surface-card-hover group flex w-full items-center justify-between gap-4 p-4 text-left cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-semibold text-foreground">
                          {p.name}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary">
                          {p.days} Days
                        </span>
                      </div>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{p.note}</span>
                    </div>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Check className="size-4" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
