import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { BOOKS, type BookId } from "@/lib/library";

export function Onboarding({ onChoose }: { onChoose: (book: BookId, plan: string) => void }) {
  const [selected, setSelected] = useState<BookId | null>(null);
  const meta = BOOKS.find((b) => b.id === selected);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-5 pb-16 pt-14">
        {!meta ? (
          <>
            <p className="text-eyebrow">Lectio</p>
            <h1 className="mt-2 text-4xl leading-tight text-foreground">
              Choose the text you'd like to read.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A quiet daily reading companion. Pick a scripture, choose a pace, and keep your place.
              Nothing leaves your device.
            </p>
            <ul className="mt-8 space-y-4">
              {BOOKS.map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => setSelected(b.id)}
                    className="surface-card flex w-full items-center gap-4 p-4 text-left transition-transform active:scale-[0.99]"
                  >
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-accent font-display text-3xl text-accent-foreground">
                      {b.symbol}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl">{b.name}</span>
                      <span className="text-eyebrow block">{b.religion}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {b.chapterCount} {b.unitLabel.toLowerCase()}s
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
              All texts are public-domain translations, bundled offline.
            </p>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelected(null)}
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="size-4" /> All books
            </button>
            <p className="text-eyebrow">{meta.religion}</p>
            <h1 className="mt-2 text-3xl">{meta.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.blurb}</p>
            <h2 className="mt-8 text-lg">Choose your pace</h2>
            <ul className="mt-4 space-y-3">
              {meta.plans.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onChoose(meta.id, p.id)}
                    className="surface-card flex w-full items-center justify-between gap-3 p-4 text-left transition-transform active:scale-[0.99]"
                  >
                    <span>
                      <span className="block font-display text-lg">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.note}</span>
                    </span>
                    <Check className="size-4 text-primary" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
