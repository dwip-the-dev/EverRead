import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="surface-card max-w-md p-8 text-center">
        <span className="font-display text-6xl font-light text-primary">404</span>
        <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">Passage not found</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The quiet corner you are looking for does not exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            Return to Today
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="surface-card max-w-md p-8 text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          A moment of stillness
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Something interrupted the reader. You can refresh or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://everread.app/#webapp",
      "name": "EverRead",
      "url": "https://everread.app",
      "description": "A quiet daily scripture reading companion for 14 world sacred traditions — Holy Bible, Holy Quran, Bhagavad Gita, Upanishads, Vedas, Dhammapada, Tanakh, Tao Te Ching, Analects, Guru Granth Sahib, Jain Agamas, Kojiki, Avesta, and Bahá'í Hidden Words. Track your progress, maintain daily reading habits, and study sacred texts offline without accounts.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "14 World Sacred Scriptures: Bible, Quran, Gita, Upanishads, Vedas, Dhammapada, Tanakh, Tao Te Ching, Analects, Guru Granth Sahib, Jain Agamas, Kojiki, Avesta, Bahá'í Hidden Words",
        "Flexible Reading Plans (7-day, 18-day, 21-day, 30-day, 60-day, 90-day, 180-day, 365-day)",
        "Distraction-Free Reader with Original Scripts (Sanskrit, Arabic, Hebrew, Pali, Chinese, Gurmukhi)",
        "365 Unique Daily Spiritual Reflection Quotes per Scripture",
        "Offline-First Reading Progress, Streak Tracking & 30-Day Activity Heatmap",
        "Zero Account Requirement — 100% Client-Side Privacy",
        "Mobile-First PWA with Installable Home Screen Icon"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://everread.app/#organization",
      "name": "EverRead",
      "url": "https://everread.app",
      "logo": "https://everread.app/icon-512.png"
    }
  ]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" },
      { title: "EverRead — Daily Scripture Reading Companion for 14 World Traditions" },
      {
        name: "description",
        content:
          "EverRead is a quiet daily scripture reading companion for 14 world sacred traditions. Read the Holy Bible, Quran, Bhagavad Gita, Upanishads, Vedas, Dhammapada, Tanakh, Tao Te Ching, Analects, Guru Granth Sahib, Jain Agamas, Kojiki, Avesta & Bahá'í Hidden Words — with structured reading plans, offline storage, 365 daily reflections, and streak tracking. No accounts needed.",
      },
      {
        name: "keywords",
        content:
          "religious reading app, scripture reading app, daily scripture reading, daily religious reading, daily spiritual reading, sacred text reader, scripture reader, religious books online, sacred texts online, read scripture online, read religious texts online, daily verse, daily scripture, daily spiritual reflection, religious reading plan, scripture reading plan, Bible reading plan, Quran reading plan, Bhagavad Gita reading plan, Dhammapada reading plan, Tao Te Ching reading plan, Upanishads reading plan, Vedas reading, Tanakh reading, Torah reading, Guru Granth Sahib reading, Jain Agamas, Kojiki reading, Avesta Gathas, Bahá'í Hidden Words, Analects Confucius, religious reading tracker, scripture progress tracker, offline scripture reader, offline religious books, offline scripture app, private scripture reader, scripture app without account, religious reading without account, scripture app offline, free scripture reading app, read one chapter a day, daily reading habit, spiritual reading habit, Bible online, read Bible online, Quran online, read Quran online, Gita online, read Bhagavad Gita online, Dhammapada online, Tao Te Ching online, daily Bible reading, daily Quran reading, daily Gita verse, Christianity reading, Islam reading, Hinduism reading, Buddhism reading, Judaism reading, Taoism reading, Sikhism reading, Jainism reading, Shintoism reading, Zoroastrianism reading, Baháʼí reading, Confucianism reading, world religions, sacred scripture app, interfaith reading, multi faith scripture, world scripture reading",
      },
      { name: "theme-color", content: "#f8f6f0" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "EverRead" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "EverRead" },
      { property: "og:title", content: "EverRead — Daily Scripture Reading Companion for 14 World Traditions" },
      {
        property: "og:description",
        content:
          "Build a peaceful daily reading habit across 14 sacred traditions — Bible, Quran, Gita, Dhammapada, Tao Te Ching, Torah & more. Distraction-free, offline, 100% private.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://everread.app" },
      { property: "og:image", content: "https://everread.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "EverRead — A quiet daily scripture reading companion for 14 world traditions" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "EverRead — Daily Scripture Reading for 14 World Traditions" },
      {
        name: "twitter:description",
        content:
          "A serene daily reading habit tracker for 14 sacred scriptures — Bible, Quran, Gita, Dhammapada, Tao Te Ching, Torah & more. 100% offline, privacy-first.",
      },
      { name: "twitter:image", content: "https://everread.app/og-image.png" },
      { name: "twitter:image:alt", content: "EverRead daily scripture reading companion" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Martel:wght@400;700&family=Plus+Jakarta+Sans:ital,wght@0,400..700;1,400..700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteStructuredData),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors closeButton />
      <Outlet />
    </QueryClientProvider>
  );
}
