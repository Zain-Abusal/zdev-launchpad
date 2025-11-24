import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { AnnouncementBar } from '@/components/ui/announcement-bar';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src={theme === 'light' ? '/lightd.png' : '/light.png'}
                alt="site logo"
                className="h-12 w-32 object-contain transition-all duration-300"
                style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 2px #fff)' : 'none' }}
              />
              <span className="sr-only">zdev</span>
            </Link>

            {/* Minimal Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 mx-8 max-w-lg"
            >
              <div className="relative w-full">
                <motion.div
                  animate={{
                    scale: focused ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl bg-muted/50 flex items-center px-4 py-2.5 gap-3 border-0"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-sm placeholder:text-muted-foreground"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ×
                    </button>
                  )}
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
                  <Button className="hover-scale">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/auth/sign-in">
                  <Button className="hover-scale">Sign in</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
