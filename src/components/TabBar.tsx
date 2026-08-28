import { Link } from "@tanstack/react-router";
import { BookOpen, HandHeart, Sparkles, SunMedium, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Today", icon: SunMedium, ariaLabel: "Today's daily reading" },
  { to: "/book", label: "Book", icon: BookOpen, ariaLabel: "Book chapters and reading plan" },
  { to: "/prayer", label: "Prayer", icon: HandHeart, ariaLabel: "Sacred prayers and devotions" },
  { to: "/quotes", label: "Reflections", icon: Sparkles, ariaLabel: "Daily quotes and reflections archive" },
  { to: "/profile", label: "Profile", icon: User, ariaLabel: "Reading stats, habit streak, and preferences" },
] as const;

export function TabBar() {
  return (
    <nav
      aria-label="Main Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-card/95 shadow-sm backdrop-blur-lg"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-around px-1">
        {tabs.map(({ to, label, icon: Icon, ariaLabel }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              aria-label={ariaLabel}
              activeOptions={{ exact: to === "/" }}
              activeProps={{
                className: "text-primary font-semibold relative after:content-[''] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary",
              }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground font-medium" }}
              className="flex flex-col items-center justify-center gap-0.5 py-3 min-h-[52px] text-[0.68rem] tracking-tight transition-all duration-150 active:scale-90 active:opacity-70 select-none"
            >
              <Icon className="size-[22px]" strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-28 text-foreground selection:bg-primary/15 selection:text-primary">
      <div className="mx-auto max-w-lg px-5 pt-8">{children}</div>
      <TabBar />
    </div>
  );
}
