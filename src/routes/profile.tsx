import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Download,
  Flame,
  Languages,
  Moon,
  Palette,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Type,
  Upload,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/TabBar";
import { Onboarding } from "@/components/Onboarding";
import { useAppState } from "@/hooks/useAppState";
import { exportStateJson, importStateJson } from "@/lib/storage";
import { bookMeta, BOOKS, type BookId } from "@/lib/library";
import { BookIcon } from "@/components/BookIcon";
import { Switch } from "@/components/Switch";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile & Reading Stats — EverRead" },
      {
        name: "description",
        content:
          "View your daily reading streak, completed chapter milestones, change your scripture, adjust reading preferences, and export offline progress.",
      },
      { property: "og:title", content: "Your Profile & Reading Stats — EverRead" },
      {
        property: "og:description",
        content: "Track your scripture reading habits, streaks, and reader preferences completely offline.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://everread.app/profile" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const {
    state,
    hydrated,
    chooseBook,
    changePlan,
    setSettings,
    reset,
  } = useAppState();

  const [changingBook, setChangingBook] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [quickBookModal, setQuickBookModal] = useState<BookId | null>(null);

  if (!hydrated) return <div className="min-h-screen bg-background" />;

  if (changingBook) {
    return (
      <Onboarding
        onChoose={(book, plan) => {
          chooseBook(book, plan);
          setChangingBook(false);
          toast.success("Scripture updated!");
        }}
        onCancel={() => setChangingBook(false)}
      />
    );
  }

  const meta = state.selectedBook ? bookMeta(state.selectedBook) : null;
  const currentPlanMeta = meta?.plans.find((p) => p.id === state.readingPlan);
  const modalMeta = quickBookModal ? bookMeta(quickBookModal) : null;

  const handleExportData = () => {
    const json = exportStateJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `everread-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Progress backup downloaded!");
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const success = importStateJson(content);
      if (success) {
        toast.success("Progress restored successfully!");
      } else {
        toast.error("Invalid backup file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <AppShell>
      <div className="animate-fade-in-up space-y-6">
        {/* Profile Header */}
        <header className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <User className="size-7" />
          </div>
          <div>
            <p className="text-eyebrow text-primary/80">Reader Profile</p>
            <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Your Journey
            </h1>
            <p className="text-xs text-muted-foreground">
              {state.streak.current > 0
                ? `${state.streak.current} day habit streak 🔥`
                : "Every journey begins with a single passage"}
            </p>
          </div>
        </header>

        {/* Stats Summary Grid */}
        <section aria-label="Reading Milestones" className="surface-card grid grid-cols-2 divide-x divide-y divide-border/70 sm:grid-cols-4 sm:divide-y-0 shadow-xs">
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Flame className="size-3.5 text-gold fill-gold" /> Streak
            </div>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {state.streak.current}
              <span className="text-xs font-normal text-muted-foreground"> days</span>
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Award className="size-3.5 text-sage" /> Best Streak
            </div>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {state.streak.longest}
              <span className="text-xs font-normal text-muted-foreground"> days</span>
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3.5 text-primary" /> Days Done
            </div>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {state.progress.completedDays.length}
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="size-3.5 text-primary" /> Chapters
            </div>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {state.progress.completedChapters.length}
            </p>
          </div>
        </section>

        {/* Active Scripture & Book Switcher Section */}
        <section aria-labelledby="current-book-heading" className="surface-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 id="current-book-heading" className="text-eyebrow text-foreground/80">
              Current Scripture & Tradition
            </h2>
            <button
              onClick={() => setChangingBook(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              <span>Explore All 14 Scriptures</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          {meta ? (
            <div className="mt-3.5 flex items-center justify-between rounded-xl border border-primary/25 bg-primary/5 p-4 transition-all">
              <div className="flex items-center gap-3.5">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground animate-float shadow-inner">
                  <BookIcon bookId={meta.id} size={32} />
                </span>
                <div>
                  <span className="text-eyebrow text-primary">{meta.religion}</span>
                  <p className="font-display text-xl font-semibold text-foreground">{meta.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentPlanMeta?.name ?? state.readingPlan} ({currentPlanMeta?.days ?? 0} Days)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setChangingBook(true)}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs transition-all active:scale-95 hover:bg-primary/95 cursor-pointer"
              >
                Change Book
              </button>
            </div>
          ) : (
            <div className="mt-3 text-center py-4">
              <button
                onClick={() => setChangingBook(true)}
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground cursor-pointer"
              >
                Choose Scripture
              </button>
            </div>
          )}

          {/* Quick Book Switcher Icons Gallery */}
          <div className="mt-5 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-semibold text-foreground">Quick Switch Tradition</p>
              <span className="text-[0.7rem] text-muted-foreground">14 World Scriptures</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-7">
              {BOOKS.map((b) => {
                const isCurrent = state.selectedBook === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setQuickBookModal(b.id)}
                    title={`${b.name} (${b.religion})`}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 transition-all duration-150 active:scale-90 cursor-pointer ${
                      isCurrent
                        ? "border border-primary bg-primary/15 text-primary ring-2 ring-primary/40 font-bold shadow-2xs"
                        : "border border-border/60 bg-card hover:bg-secondary hover:border-border text-foreground"
                    }`}
                  >
                    <span className="text-xl"><BookIcon bookId={b.id} size={22} /></span>
                    <span className="mt-1 line-clamp-1 text-[0.6rem] font-medium text-muted-foreground">
                      {b.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Switch Reading Plan for Current Book */}
          {meta ? (
            <div className="mt-5 border-t border-border/60 pt-4">
              <p className="text-xs font-semibold text-foreground mb-2">Change Reading Plan for {meta.name}</p>
              <div className="space-y-2">
                {meta.plans.map((p) => {
                  const isActive = state.readingPlan === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (!isActive) {
                          changePlan(p.id);
                          toast.success(`Switched to ${p.name}`);
                        }
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all active:scale-[0.99] cursor-pointer ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs"
                          : "border-border bg-card text-muted-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <div>
                        <span className="block text-xs font-semibold text-foreground">{p.name}</span>
                        <span className="block text-[0.7rem] text-muted-foreground">{p.note}</span>
                      </div>
                      {isActive ? <Check className="size-4 text-primary" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </section>

        {/* Reader Preferences */}
        <section aria-labelledby="preferences-heading" className="surface-card p-5 shadow-xs">
          <h2 id="preferences-heading" className="text-eyebrow text-foreground/80">
            Reader Appearance & Preferences
          </h2>

          {/* Theme Selector */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-foreground mb-2.5">Color Palette</p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["light", "Parchment", "bg-[#f8f6f0] text-[#332a24] border-[#ded7cb]"],
                  ["dark", "Obsidian", "bg-[#1f1d1b] text-[#ede8df] border-[#38332e]"],
                  ["sepia", "Warm Sepia", "bg-[#f0e9dc] text-[#2e261f] border-[#d4caa0]"],
                ] as const
              ).map(([id, label, style]) => (
                <button
                  key={id}
                  onClick={() => setSettings({ theme: id })}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-3 transition-all active:scale-95 cursor-pointer ${style} ${
                    state.settings.theme === id
                      ? "ring-2 ring-primary font-bold shadow-xs scale-[1.02]"
                      : "opacity-85 hover:opacity-100"
                  }`}
                >
                  <span className="text-xs">{label}</span>
                  {state.settings.theme === id ? <Check className="size-3.5 text-primary" /> : null}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Selector */}
          <div className="mt-5 border-t border-border/60 pt-4">
            <p className="text-xs font-semibold text-foreground mb-2.5">Scripture Font Size</p>
            <div className="grid grid-cols-3 gap-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSettings({ fontSize: size })}
                  className={`rounded-xl border py-2 text-xs capitalize transition-all active:scale-95 cursor-pointer ${
                    state.settings.fontSize === size
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "border-border bg-card text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Script & Transliteration Toggles */}
          <div className="mt-5 space-y-3 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground">Show Original Script</p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Display original Hebrew, Arabic, Sanskrit, Greek, Pali, or Chinese
                </p>
              </div>
              <Switch
                checked={state.settings.showOriginal}
                onChange={(checked) => setSettings({ showOriginal: checked })}
                label="Toggle original script"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground">Show Transliteration</p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Romanized pronunciation for non-Latin sacred scripts
                </p>
              </div>
              <Switch
                checked={state.settings.showTransliteration}
                onChange={(checked) => setSettings({ showTransliteration: checked })}
                label="Toggle transliteration"
              />
            </div>
          </div>
        </section>

        {/* Data Management & Export/Import */}
        <section aria-labelledby="data-heading" className="surface-card p-5 shadow-xs">
          <h2 id="data-heading" className="text-eyebrow text-foreground/80">
            Data & Privacy
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            EverRead stores all your reading history and preferences in local storage on your device.
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={handleExportData}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground transition-all active:scale-95 hover:bg-secondary cursor-pointer"
            >
              <Download className="size-4" /> Export Progress Backup
            </button>

            <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground transition-all active:scale-95 hover:bg-secondary cursor-pointer">
              <Upload className="size-4" /> Restore from Backup
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Progress */}
          <div className="mt-5 border-t border-border/60 pt-4">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 text-xs text-destructive hover:underline cursor-pointer"
              >
                <RotateCcw className="size-3.5" /> Reset all progress
              </button>
            ) : (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3.5 text-xs animate-fade-in-up">
                <p className="font-semibold text-destructive">
                  Are you sure you want to reset all reading progress?
                </p>
                <p className="mt-1 text-muted-foreground">This cannot be undone unless you exported a backup.</p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      reset();
                      setShowResetConfirm(false);
                      toast.success("Progress has been reset.");
                    }}
                    className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground cursor-pointer"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About EverRead */}
        <footer className="pt-2 text-center text-xs text-muted-foreground pb-4">
          <div className="flex items-center justify-center gap-1 font-semibold text-foreground">
            <ShieldCheck className="size-4 text-sage" /> EverRead v1.0
          </div>
          <p className="mt-1">
            A quiet daily scripture reading companion across world traditions. 100% offline, private, and open.
          </p>
        </footer>
      </div>

      {/* Quick Scripture Modal (rendered at top level) */}
      {modalMeta && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setQuickBookModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground animate-float">
                  <BookIcon bookId={modalMeta.id} size={26} />
                </span>
                <div>
                  <span className="text-eyebrow text-primary">{modalMeta.religion}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground">{modalMeta.name}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickBookModal(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                aria-label="Close dialog"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground bg-secondary/50 p-3 rounded-xl">
              {modalMeta.blurb}
            </p>

            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Select Pace to Switch:</p>
              <div className="space-y-2">
                {modalMeta.plans.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => {
                      chooseBook(modalMeta.id, p.id);
                      setQuickBookModal(null);
                      toast.success(`Switched to ${modalMeta.name} (${p.name})`);
                    }}
                    className="surface-card-hover group flex w-full items-center justify-between p-3 text-left cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-semibold text-foreground">{p.name}</span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.2 text-[0.65rem] font-bold text-primary">
                          {p.days} Days
                        </span>
                      </div>
                      <span className="text-[0.7rem] text-muted-foreground">{p.note}</span>
                    </div>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Check className="size-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setQuickBookModal(null)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
