import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-secondary/40 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(167,139,250,0.14),transparent_34%)]" />
      <div className="relative z-10 max-w-xl rounded-3xl border border-border/60 bg-card/80 p-10 text-center shadow-xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Error</p>
        <h1 className="mt-3 text-5xl font-bold text-foreground">404</h1>
        <p className="mt-3 text-base text-muted-foreground">
          We could not find <span className="font-semibold text-foreground">{location.pathname}</span>. Let us guide you back.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/40 bg-secondary/70 text-foreground">
            <Link to="/contact">Contact support</Link>
          </Button>
          <Button asChild variant="ghost" className="text-foreground">
            <Link to="/search">Search site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
