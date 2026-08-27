import { Link } from "@tanstack/react-router";
import { BookOpen, Quote, Sun, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Today", icon: Sun },
  { to: "/book", label: "Book", icon: BookOpen },
  { to: "/quotes", label: "Quotes", icon: Quote },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <ul className="mx-auto flex max-w-lg items-stretch">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium tracking-wide transition-colors"
            >
              <Icon className="size-5" strokeWidth={1.6} />
              {label}
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
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-5 pt-8">{children}</div>
      <TabBar />
    </div>
  );
}
