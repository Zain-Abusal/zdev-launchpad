import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { AnnouncementBar } from "@/components/ui/announcement-bar";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useAuth();

  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Hook up navigation if needed
  };

  const navItems = [
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/demos", label: "Demos" },
    { to: "/blog", label: "Blog" },
    { to: "/docs-embed", label: "Docs" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/60">
              <img src="/favicon.ico" alt="site logo" className="h-6 w-6 object-contain" />
              <span>zdev</span>
            </Link>

            <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-md px-2 py-1 hover:text-foreground hover:bg-secondary/60 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="hidden md:block">
                <motion.div
                  initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                  animate={{
                    boxShadow: focused ? "0 0 0 1px rgba(255,255,255,0.1)" : "0 0 0 rgba(0,0,0,0)",
                  }}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1.5"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Search"
                    className="h-7 w-48 border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </motion.div>
              </form>

              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="hover-scale">
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              {user ? (
                <Link to={isAdmin ? "/admin" : "/client"}>
                  <Button variant="default" className="hover-scale">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/sign-in">
                  <Button variant="default" className="hover-scale">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
