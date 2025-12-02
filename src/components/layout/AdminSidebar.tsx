import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Layout as LayoutIcon,
  BarChart3,
  CreditCard,
  Wallet,
  Wrench,
  Image,
  Boxes,
  Link as LinkIcon,
  Key,
  Inbox,
  Settings,
  Code,
  LogOut,
  Moon,
  Sun,
  Megaphone,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/clients', label: 'Clients', icon: Users },
    { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { path: '/admin/blog', label: 'Blog', icon: FileText },
    { path: '/admin/portfolio', label: 'Portfolio', icon: LayoutIcon },
    { path: '/admin/media', label: 'Media', icon: Image },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/billing', label: 'Billing', icon: CreditCard },
    { path: '/admin/payments', label: 'Payments', icon: Wallet },
    { path: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
    { path: '/admin/demos', label: 'Demos', icon: Boxes },
    { path: '/admin/docs-links', label: 'Docs Links', icon: LinkIcon },
    { path: '/admin/licenses', label: 'Licenses', icon: Key },
    { path: '/admin/requests', label: 'Requests', icon: Inbox },
    { path: '/admin/support', label: 'Support', icon: Inbox },
    { path: '/admin/marketing', label: 'Marketing', icon: Megaphone },
    { path: '/admin/announcement', label: 'Announcement', icon: Megaphone },
    { path: '/admin/logs', label: 'Activity Logs', icon: Activity },
    { path: '/admin/editor', label: 'Code Editor', icon: Code },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar min-h-screen flex flex-col overflow-y-auto">
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold">
          zdev
        </Link>
        <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                size="sm"
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
          size="sm"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
