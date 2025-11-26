import { Link, NavLink } from "react-router-dom";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const nav = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/api-keys", label: "API Keys" },
  { to: "/app/apps", label: "Apps" },
  { to: "/app/billing", label: "Usage & Billing" },
  { to: "/app/logs", label: "Logs" },
  { to: "/app/team", label: "Team" },
  { to: "/app/settings", label: "Settings" },
  { to: "/app/help", label: "Help / Docs" },
];

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const docsUrl = import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com";
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r p-4 hidden md:block">
        <div className="mb-6 font-semibold">Org Launcher</div>
        <nav className="space-y-2">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={docsUrl} target="_blank" rel="noreferrer" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
            Docs
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 space-y-4">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Client Dashboard</h1>
            <p className="text-sm text-muted-foreground">Multi-tenant org workspace</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link to="/app/api-keys">Create API Key</Link>
            </Button>
          </div>
        </header>
        <Command className="rounded-lg border">
          <CommandInput placeholder="Search commands (⌘K)" />
          <CommandList>
            <CommandItem>Invite Member</CommandItem>
            <CommandItem>Create API Key</CommandItem>
            <CommandItem>Open Docs</CommandItem>
          </CommandList>
        </Command>
        {children}
      </main>
    </div>
  );
};
