import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/features", label: "Features" },
  { to: "/blog", label: "Blog" },
  { to: "/status", label: "Status" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useAuth();
  const docsUrl = import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">LP</span>
          <span className="hidden sm:inline">Launchpad API</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={docsUrl} target="_blank" rel="noreferrer" className="hover:text-primary text-muted-foreground">
            Docs
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          {user ? (
            <Link to={isAdmin ? "/admin" : "/app/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
