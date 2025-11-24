import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { AnnouncementBar } from '@/components/ui/announcement-bar';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useAuth();

  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement navigation or search logic here
    // Example: navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/favicon.ico" alt="site logo" className="h-8 w-auto object-contain" />
              <span className="sr-only">zdev</span>
            </Link>

            {/* Animated Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 mx-8 max-w-lg"
            >
              <div className="relative w-full">
                <motion.div
                  initial={{ boxShadow: '0 2px 12px rgba(99,102,241,0.08)', background: 'rgba(255,255,255,0.6)' }}
                  animate={{
                    boxShadow: focused
                      ? '0 4px 24px rgba(99,102,241,0.18)' : '0 2px 12px rgba(99,102,241,0.08)',
                    background: focused
                      ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-border flex items-center px-4 py-2 gap-2 backdrop-blur-lg"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-primary/70">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-base text-muted-foreground placeholder:text-muted-foreground"
                  />
                </motion.div>
              </div>
            </form>


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
                className="hover-scale"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              {user ? (
                <Link to={isAdmin ? '/admin' : '/client'}>
                  <Button variant="default" className="hover-scale">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/auth/sign-in">
                  <Button variant="default" className="hover-scale">Sign in</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
