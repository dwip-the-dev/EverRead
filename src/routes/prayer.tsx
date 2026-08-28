import { useState, useEffect, useMemo, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  HandHeart,
  Maximize2,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/TabBar";
import { BookIcon } from "@/components/BookIcon";
import { useAppState } from "@/hooks/useAppState";
import { BOOKS, bookMeta, type BookId } from "@/lib/library";
import {
  BUILT_IN_PRAYERS,
  addCustomPrayer,
  deleteCustomPrayer,
  readCustomPrayers,
  type CustomPrayer,
  type Prayer,
} from "@/lib/prayers";

export const Route = createFileRoute("/prayer")({
  head: () => ({
    meta: [
      { title: "Sacred Prayers & Personal Devotions — EverRead" },
      {
        name: "description",
        content:
          "Explore traditional prayers and sacred hymns across 14 world traditions — Lord's Prayer, Al-Fatiha, Gayatri Mantra, Shema, Namokar Mantra, Metta Sutta, and add your own custom prayers.",
      },
      {
        name: "keywords",
        content:
          "sacred prayers, daily prayers, Christian prayers, Lord's prayer, Islamic prayers, Dua, Al Fatiha, Hindu prayers, Gayatri Mantra, Buddhist prayers, Metta Sutta, Jewish prayers, Shema, Sikh prayers, Mool Mantar, personal prayer journal, add prayer",
      },
      { property: "og:title", content: "Sacred Prayers & Personal Devotions — EverRead" },
      {
        property: "og:description",
        content: "Quiet daily prayers from world traditions with personal prayer book storage.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://everread.app/prayer" }],
  }),
  component: PrayerPage,
});

export default function PrayerPage() {
  const { state, hydrated } = useAppState();
  const [customPrayers, setCustomPrayers] = useState<CustomPrayer[]>([]);
  const [selectedTradition, setSelectedTradition] = useState<"all" | "custom" | BookId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [focusPrayer, setFocusPrayer] = useState<Prayer | CustomPrayer | null>(null);

  // New prayer form state
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newBookId, setNewBookId] = useState<BookId>(state.selectedBook || "bible");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Load custom prayers and listen for storage updates
  useEffect(() => {
    setCustomPrayers(readCustomPrayers());
    const sync = () => setCustomPrayers(readCustomPrayers());
    window.addEventListener("everread:prayers", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("everread:prayers", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Handle ESC key to close open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowAddModal(false);
        setFocusPrayer(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredPrayers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    // 1. Built-in prayers filter
    let builtIn = BUILT_IN_PRAYERS;
    if (selectedTradition === "custom") {
      builtIn = [];
    } else if (selectedTradition !== "all") {
      builtIn = builtIn.filter((p) => p.bookId === selectedTradition);
    }

    if (q) {
      builtIn = builtIn.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.text.toLowerCase().includes(q) ||
          (p.note && p.note.toLowerCase().includes(q)) ||
          (p.original && p.original.toLowerCase().includes(q)),
      );
    }

    // 2. Custom prayers filter
    let custom = customPrayers;
    if (selectedTradition !== "all" && selectedTradition !== "custom") {
      custom = custom.filter((p) => p.bookId === selectedTradition);
    }

    if (q) {
      custom = custom.filter(
        (p) => p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q),
      );
    }

    return { builtIn, custom };
  }, [selectedTradition, searchQuery, customPrayers]);

  const handleCreatePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) {
      toast.error("Please enter a title and prayer text.");
      return;
    }

    addCustomPrayer({
      title: newTitle.trim(),
      text: newText.trim(),
      bookId: newBookId,
    });

    toast.success("Prayer added to your collection!");
    setNewTitle("");
    setNewText("");
    setShowAddModal(false);
    setSelectedTradition("custom");
  };

  const handleDeleteCustom = (id: string, title: string) => {
    deleteCustomPrayer(id);
    toast.success(`Removed "${title}"`);
    if (focusPrayer && focusPrayer.id === id) {
      setFocusPrayer(null);
    }
  };

  const handleCopy = (prayer: Prayer | CustomPrayer) => {
    const meta = bookMeta(prayer.bookId);
    const content = `${prayer.title} (${meta.name})\n\n${prayer.text}${"note" in prayer && prayer.note ? `\n\n— ${prayer.note}` : ""}`;
    navigator.clipboard.writeText(content);
    toast.success("Prayer copied to clipboard");
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  return (
    <AppShell>
      <div className="animate-fade-in-up space-y-6">
        {/* Header Bar */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-eyebrow text-primary/80">
              <HandHeart className="size-3.5" />
              <span>Sacred Devotions</span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Prayers
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Timeless hymns, mantras, and personal petitions across world traditions.
            </p>
          </div>

          {/* Add Prayer Action */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all active:scale-95 hover:bg-primary/95 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Add Prayer</span>
          </button>
        </header>

        {/* Search Bar */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prayers, verses, or keywords…"
            className="w-full rounded-2xl border border-border bg-card py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-xs"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>

        {/* Styled Tradition Slider */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth py-1 px-0.5 touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <button
              type="button"
              onClick={() => setSelectedTradition("all")}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                selectedTradition === "all"
                  ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/50"
                  : "border border-border/70 bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Sparkles className="size-3.5" />
              <span>All Traditions ({BUILT_IN_PRAYERS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTradition("custom")}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                selectedTradition === "custom"
                  ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/50"
                  : "border border-border/70 bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <HandHeart className="size-3.5" />
              <span>My Prayers ({customPrayers.length})</span>
            </button>

            {BOOKS.map((b) => {
              const isSelected = selectedTradition === b.id;
              const count = BUILT_IN_PRAYERS.filter((p) => p.bookId === b.id).length;
              if (count === 0) return null;
              return (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setSelectedTradition(b.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/50"
                      : "border border-border/70 bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <BookIcon bookId={b.id} size={15} />
                  <span>{b.religion}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Left/Right quick scroll arrows */}
          <div className="hidden sm:flex items-center justify-between pointer-events-none absolute -left-2 -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              aria-label="Scroll left"
              className="pointer-events-auto flex size-7 items-center justify-center rounded-full border border-border bg-card/90 shadow-md text-muted-foreground hover:text-foreground hover:bg-card cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider("right")}
              aria-label="Scroll right"
              className="pointer-events-auto flex size-7 items-center justify-center rounded-full border border-border bg-card/90 shadow-md text-muted-foreground hover:text-foreground hover:bg-card cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Selected Tradition Highlight Banner */}
        {selectedTradition !== "all" && selectedTradition !== "custom" && (
          <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-inner">
                <BookIcon bookId={selectedTradition} size={22} />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {bookMeta(selectedTradition).name}
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  {bookMeta(selectedTradition).religion} Traditions
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTradition("all")}
              className="text-xs font-medium text-primary hover:underline cursor-pointer"
            >
              Show all
            </button>
          </div>
        )}

        {/* Custom Prayers Section */}
        {filteredPrayers.custom.length > 0 && (
          <section aria-labelledby="custom-prayers-heading" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 id="custom-prayers-heading" className="text-eyebrow text-foreground/80">
                Personal Prayers & Notes ({filteredPrayers.custom.length})
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="text-xs font-medium text-primary hover:underline cursor-pointer"
              >
                + Add Another
              </button>
            </div>

            <div className="space-y-3">
              {filteredPrayers.custom.map((prayer) => {
                const meta = bookMeta(prayer.bookId);
                return (
                  <article
                    key={prayer.id}
                    className="surface-card group relative p-5 transition-all hover:border-primary/40 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-inner">
                          <BookIcon bookId={prayer.bookId} size={16} />
                        </span>
                        <div className="min-w-0">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-primary">
                            {meta.religion}
                          </span>
                          <h3 className="truncate font-display text-lg font-semibold text-foreground">
                            {prayer.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setFocusPrayer(prayer)}
                          title="Open focus mode"
                          aria-label="Open focus meditation"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                        >
                          <Maximize2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(prayer)}
                          title="Copy prayer"
                          aria-label="Copy prayer text"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                        >
                          <Copy className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustom(prayer.id, prayer.title)}
                          title="Delete prayer"
                          aria-label="Delete prayer"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3.5 whitespace-pre-line text-sm leading-relaxed text-foreground/90 font-serif">
                      {prayer.text}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 text-[0.7rem] text-muted-foreground">
                      <span>Personal Prayer</span>
                      <span>{new Date(prayer.createdAt).toLocaleDateString()}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Built-in Traditional Prayers Section */}
        {filteredPrayers.builtIn.length > 0 && (
          <section aria-labelledby="tradition-prayers-heading" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 id="tradition-prayers-heading" className="text-eyebrow text-foreground/80">
                Traditional Prayers & Sacred Mantras ({filteredPrayers.builtIn.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredPrayers.builtIn.map((prayer) => {
                const meta = bookMeta(prayer.bookId);
                const isArabic = prayer.bookId === "quran";
                const isSanskrit =
                  prayer.bookId === "gita" ||
                  prayer.bookId === "upanishads" ||
                  prayer.bookId === "vedas";
                const isHebrew = prayer.bookId === "tanakh";

                return (
                  <article
                    key={prayer.id}
                    className="surface-card group relative p-5 transition-all hover:border-primary/40 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-inner">
                          <BookIcon bookId={prayer.bookId} size={18} />
                        </span>
                        <div className="min-w-0">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-primary">
                            {meta.religion} · {meta.name}
                          </span>
                          <h3 className="truncate font-display text-lg font-semibold text-foreground sm:text-xl">
                            {prayer.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setFocusPrayer(prayer)}
                          title="Open focus meditation"
                          aria-label="Open meditation focus mode"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                        >
                          <Maximize2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(prayer)}
                          title="Copy prayer"
                          aria-label="Copy prayer text"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                        >
                          <Copy className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Original Script */}
                    {state.settings.showOriginal && prayer.original && (
                      <div
                        className={`mt-4 rounded-xl border border-border/60 bg-secondary/35 p-3.5 text-foreground/90 ${
                          isArabic
                            ? "font-arabic text-lg leading-loose text-right"
                            : isSanskrit
                              ? "font-sanskrit text-base leading-relaxed"
                              : isHebrew
                                ? "text-right font-serif text-base leading-relaxed"
                                : "font-serif text-sm leading-relaxed"
                        }`}
                        dir={isArabic || isHebrew ? "rtl" : "ltr"}
                      >
                        <p className="whitespace-pre-line">{prayer.original}</p>
                      </div>
                    )}

                    {/* Transliteration */}
                    {state.settings.showTransliteration && prayer.transliteration && (
                      <div className="mt-2.5 rounded-lg bg-secondary/20 px-3 py-2 text-xs italic text-muted-foreground leading-relaxed">
                        <p className="whitespace-pre-line">{prayer.transliteration}</p>
                      </div>
                    )}

                    {/* English Translation / Core Prayer Body */}
                    <div className="mt-4 whitespace-pre-line text-sm sm:text-base leading-relaxed text-foreground font-serif">
                      {prayer.text}
                    </div>

                    {/* Source citation */}
                    {prayer.note && (
                      <div className="mt-4 flex items-center gap-1.5 border-t border-border/50 pt-3 text-[0.72rem] text-muted-foreground italic">
                        <span>— {prayer.note}</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPrayers.builtIn.length === 0 && filteredPrayers.custom.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
              <Search className="size-6" />
            </div>
            <p className="mt-3 font-display text-base font-semibold text-foreground">
              No prayers found
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different keyword or create your own prayer with the + button above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTradition("all");
              }}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* TOP-LEVEL MODALS: Rendered outside transformed wrapper        */}
      {/* ───────────────────────────────────────────────────────────── */}

      {/* Add Prayer Modal */}
      {showAddModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-border/90 bg-card p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Plus className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Add Sacred Prayer
                  </h3>
                  <p className="text-[0.7rem] text-muted-foreground">
                    Save a personal devotion or contemplation to your offline collection.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                aria-label="Close dialog"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePrayer} className="space-y-4">
              <div>
                <label htmlFor="prayer-title-input" className="block text-xs font-semibold text-foreground mb-1.5">
                  Prayer Title
                </label>
                <input
                  id="prayer-title-input"
                  type="text"
                  required
                  autoFocus
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Prayer for Peace, Psalm 91, Morning Gratitude…"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-xs"
                />
              </div>

              <div>
                <label htmlFor="prayer-tradition-select" className="block text-xs font-semibold text-foreground mb-1.5">
                  Tradition / Scripture
                </label>
                <select
                  id="prayer-tradition-select"
                  value={newBookId}
                  onChange={(e) => setNewBookId(e.target.value as BookId)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-xs cursor-pointer"
                >
                  {BOOKS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.religion})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prayer-text-area" className="block text-xs font-semibold text-foreground mb-1.5">
                  Prayer Text or Verse
                </label>
                <textarea
                  id="prayer-text-area"
                  required
                  rows={6}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Type or paste your sacred words here…"
                  className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-xs font-serif leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all active:scale-95 hover:bg-primary/95 cursor-pointer"
                >
                  Save Prayer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Focus Meditation Modal */}
      {focusPrayer && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setFocusPrayer(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-5 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-border bg-card p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setFocusPrayer(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
              aria-label="Close focus mode"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-inner">
                <BookIcon bookId={focusPrayer.bookId} size={24} />
              </span>
              <div>
                <span className="text-eyebrow text-primary">
                  {bookMeta(focusPrayer.bookId).religion}
                </span>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {focusPrayer.title}
                </h2>
              </div>
            </div>

            {"original" in focusPrayer && focusPrayer.original && state.settings.showOriginal && (
              <div className="my-5 rounded-2xl border border-border/70 bg-secondary/40 p-4 text-center">
                <p className="font-serif text-lg leading-loose text-foreground">
                  {focusPrayer.original}
                </p>
              </div>
            )}

            <div className="my-6 whitespace-pre-line text-lg leading-loose text-foreground font-serif text-center sm:text-xl">
              {focusPrayer.text}
            </div>

            {"note" in focusPrayer && focusPrayer.note && (
              <p className="text-center text-xs text-muted-foreground italic">
                — {focusPrayer.note}
              </p>
            )}

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setFocusPrayer(null)}
                className="rounded-full bg-primary px-8 py-3 text-xs font-semibold text-primary-foreground shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                Close Focus Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
