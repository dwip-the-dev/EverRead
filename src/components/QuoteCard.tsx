import { useState } from "react";
import { Bookmark, Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const formatted = `“${quote.text}”\n— ${quote.reference}`;
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      toast.success("Reflection copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleShare = async () => {
    const formatted = `“${quote.text}”\n— ${quote.reference}\nRead daily on EverRead`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "EverRead Daily Reflection",
          text: formatted,
          url: window.location.origin,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      handleCopy();
    }
  };

  return (
    <article className="surface-card relative overflow-hidden p-6 text-foreground shadow-xs transition-all duration-200 hover:border-primary/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-10 font-display text-[8rem] leading-none text-accent/25 select-none animate-pulse-soft"
      >
        “
      </div>

      {eyebrow ? <p className="text-eyebrow mb-3 text-primary">{eyebrow}</p> : null}

      <blockquote className="scripture-body relative text-[1.12rem] leading-relaxed text-foreground">
        “{quote.text}”
      </blockquote>

      {quote.original ? (
        <p
          className="mt-3 text-sm leading-relaxed text-muted-foreground/90 italic"
          dir="auto"
        >
          {quote.original}
        </p>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
        <p className="text-xs font-semibold tracking-wide text-primary">
          {quote.reference}
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy quote"
            aria-label="Copy quote to clipboard"
            className="rounded-lg p-1.5 text-muted-foreground transition-all duration-150 active:scale-90 hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            {copied ? <Check className="size-4 text-sage" /> : <Copy className="size-4" />}
          </button>

          <button
            onClick={handleShare}
            title="Share reflection"
            aria-label="Share reflection"
            className="rounded-lg p-1.5 text-muted-foreground transition-all duration-150 active:scale-90 hover:bg-secondary hover:text-foreground cursor-pointer"
          >
            <Share2 className="size-4" />
          </button>

          {onToggleSave ? (
            <button
              onClick={onToggleSave}
              title={saved ? "Remove bookmark" : "Bookmark reflection"}
              aria-label={saved ? "Remove reflection from bookmarks" : "Bookmark reflection"}
              className="rounded-lg p-1.5 text-muted-foreground transition-all duration-150 active:scale-90 hover:bg-secondary hover:text-primary cursor-pointer"
            >
              <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
