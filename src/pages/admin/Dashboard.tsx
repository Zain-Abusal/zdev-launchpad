import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FolderKanban, FileText, Inbox, PlusCircle, Gauge, FileCog, Rocket } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { logActivity } from '@/lib/activityLogger';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    blogPosts: 0,
    requests: 0,
  });
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    fetchStats();
    if (user && !logged) {
      logActivity({ action: 'admin_dashboard_view', details: 'Viewed Admin Dashboard', userId: user.id });
      setLogged(true);
    }
  }, [user, logged]);

  const fetchStats = async () => {
    const [clients, projects, posts, requests] = await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('project_requests').select('*', { count: 'exact', head: true }),
    ]);

    setStats({
      clients: clients.count || 0,
      projects: projects.count || 0,
      blogPosts: posts.count || 0,
      requests: requests.count || 0,
    });
  };

  const statCards = [
    { label: 'Total Clients', value: stats.clients, icon: Users, tint: 'from-cyan-500/15 to-cyan-500/5', iconColor: 'text-cyan-500' },
    { label: 'Active Projects', value: stats.projects, icon: FolderKanban, tint: 'from-emerald-500/15 to-emerald-500/5', iconColor: 'text-emerald-500' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText, tint: 'from-indigo-500/15 to-indigo-500/5', iconColor: 'text-indigo-500' },
    { label: 'Open Requests', value: stats.requests, icon: Inbox, tint: 'from-amber-500/15 to-amber-500/5', iconColor: 'text-amber-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="pill w-fit">Control center</p>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Your operational snapshot across clients, projects, content, and requests.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="border-primary/40">
              <Gauge className="mr-2 h-4 w-4" />
              System health
            </Button>
            <Button className="group">
              <PlusCircle className="mr-2 h-4 w-4" />
              New record
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="surface-card border border-border/60 bg-gradient-to-br from-card to-card/80">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <span className={`rounded-full bg-primary/10 p-2 ${stat.iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`mt-3 h-2 rounded-full bg-gradient-to-r ${stat.tint}`} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="surface-card border border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-primary/30">
                  <FileCog className="mr-2 h-4 w-4" />
                  Configure settings
                </Button>
                <Button variant="outline" className="border-primary/30">
                  <Users className="mr-2 h-4 w-4" />
                  Invite client
                </Button>
                <Button variant="outline" className="border-primary/30">
                  <FolderKanban className="mr-2 h-4 w-4" />
                  New project
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Navigate via the sidebar or trigger common workflows here.
              </p>
            </CardContent>
          </Card>

          <Card className="surface-card border border-border/60">
            <CardHeader>
              <CardTitle>Latest Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {statCards.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-border/50 p-3">
                  <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                    {stat.value}
                  </Badge>
                  <div className="text-sm">
                    <p className="font-semibold">{stat.label}</p>
                    <p className="text-muted-foreground">Updated just now</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
