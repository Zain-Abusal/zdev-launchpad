import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderKanban, Activity, Bell, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { logActivity } from '@/lib/activityLogger';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
      if (!logged) {
        logActivity({ action: 'client_dashboard_view', details: 'Viewed Client Dashboard', userId: user.id });
        setLogged(true);
      }
    }
  }, [user, logged]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('client_projects')
      .select(`
        *,
        projects (*)
      `)
      .limit(5);
    if (data) {
      const projectsList = data.map(cp => cp.projects).filter(Boolean);
      setProjects(projectsList);
    }
  };

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban },
    { label: 'Active Systems', value: projects.filter((p: any) => p.type === 'system').length, icon: Activity },
    { label: 'Latest Update', value: 'Today', icon: Bell },
  ];

  const notifications = [
    { title: 'Documentation Updated', description: 'New guides available for your project', time: '2h ago' },
    { title: 'New Version Available', description: 'Update available for your dashboard', time: '1d ago' },
  ];

  return (
    <ClientLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="pill w-fit">Client space</p>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Track projects, updates, and support in one place.</p>
          </div>
          <Link to="/client/support">
            <Button className="group">
              <MessageSquare className="mr-2 h-4 w-4" />
              Open a ticket
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="surface-card border border-border/60">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <span className="rounded-full bg-primary/10 p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="mt-2 text-xs text-muted-foreground">Updated just now</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* Projects */}
          <Card className="surface-card border border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle>Your Projects</CardTitle>
                </div>
                <Link to="/client/projects">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 3).map((project: any) => (
                  <Link key={project.id} to={`/client/projects/${project.id}`}>
                    <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/50 p-4 transition-colors hover:bg-secondary/80">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{project.type}</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </Link>
                ))}
                {projects.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No projects yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="surface-card border border-border/60">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex gap-3 rounded-2xl border border-border/60 p-3">
                    <Bell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Project documentation accessed', 'License verified', 'Support ticket created'].map((activity, index) => (
                <div key={activity} className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{activity}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {index === 0 ? 'Just now' : `${index}h ago`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
