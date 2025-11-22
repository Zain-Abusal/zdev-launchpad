import { Link, useLocation } from 'react-router-dom';
import { Home, FolderKanban, User, CreditCard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ClientSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/client', label: 'Dashboard', icon: Home },
    { path: '/client/projects', label: 'My Projects', icon: FolderKanban },
    { path: '/client/profile', label: 'Profile', icon: User },
    { path: '/client/billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar min-h-screen flex flex-col">
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold">
          zdev
        </Link>
        <p className="text-sm text-muted-foreground mt-1">Client Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-full"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          onClick={signOut}
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
