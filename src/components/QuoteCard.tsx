import { Bookmark } from "lucide-react";
import type { Quote } from "@/lib/library";

export function QuoteCard({
  quote,
  saved,
  onToggleSave,
  eyebrow,
}: {
  quote: Quote;
  saved?: boolean;
  onToggleSave?: () => void;
  eyebrow?: string;
}) {
  return (
    <article className="surface-card relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -right-8 -top-10 font-display text-[7rem] leading-none text-accent/40 select-none">
        “
      </div>
      {eyebrow ? <p className="text-eyebrow mb-3">{eyebrow}</p> : null}
      <p className="scripture-body relative text-[1.0625rem] text-foreground">{quote.text}</p>
      {quote.original ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground" dir="auto">
          {quote.original}
        </p>
      ) : null}
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wide text-primary">{quote.reference}</p>
        {onToggleSave ? (
          <button
            onClick={onToggleSave}
            aria-label={saved ? "Remove from saved" : "Save quote"}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} />
          </button>
        ) : null}
      </div>
    </article>
  );
}
