import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            zdev
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/portfolio" className="text-sm font-medium hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link to="/demos" className="text-sm font-medium hover:text-primary transition-colors">
              Demos
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/docs-embed" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {user ? (
              <Link to={isAdmin ? '/admin' : '/client'}>
                <Button variant="default">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth/sign-in">
                <Button variant="default">Sign in</Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
