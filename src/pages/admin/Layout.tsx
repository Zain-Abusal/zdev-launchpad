import { NavLink, Link } from "react-router-dom";
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/organizations", label: "Organizations" },
  { to: "/admin/api-keys", label: "API Keys" },
  { to: "/admin/logs", label: "Request Logs" },
  { to: "/admin/audit-log", label: "Audit Log" },
  { to: "/admin/plans", label: "Plans" },
  { to: "/admin/subscriptions", label: "Subscriptions" },
  { to: "/admin/invoices", label: "Invoices" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/support-tickets", label: "Support" },
  { to: "/admin/status", label: "System Status" },
  { to: "/admin/settings", label: "Settings" },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const docsUrl = import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com";
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r p-4 space-y-4 hidden md:block">
        <div className="font-semibold">Staff Console</div>
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
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin</h1>
            <p className="text-sm text-muted-foreground">Staff tooling for the platform</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link to="/app/dashboard">Switch to client</Link>
            </Button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};
