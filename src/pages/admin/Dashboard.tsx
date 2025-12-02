import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FolderKanban,
  FileText,
  Inbox,
  PlusCircle,
  Gauge,
  FileCog,
  Rocket,
  ShieldCheck,
  ActivitySquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activityLogger";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    blogPosts: 0,
    requests: 0,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    fetchStats();
    if (user && !logged) {
      logActivity({ action: "admin_dashboard_view", details: "Viewed Admin Dashboard", userId: user.id });
      setLogged(true);
    }
  }, [user, logged]);

  const fetchStats = async () => {
    setRefreshing(true);
    const [clients, projects, posts, requests] = await Promise.all([
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("project_requests").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      clients: clients.count || 0,
      projects: projects.count || 0,
      blogPosts: posts.count || 0,
      requests: requests.count || 0,
    });
    setRefreshing(false);
  };

  const statCards = [
    { label: "Total Clients", value: stats.clients, icon: Users, tint: "from-primary/20 via-primary/5 to-transparent" },
    { label: "Active Projects", value: stats.projects, icon: FolderKanban, tint: "from-accent/30 via-accent/10 to-transparent" },
    { label: "Blog Posts", value: stats.blogPosts, icon: FileText, tint: "from-cyan-500/25 via-cyan-500/10 to-transparent" },
    { label: "Open Requests", value: stats.requests, icon: Inbox, tint: "from-pink-500/25 via-pink-500/10 to-transparent" },
  ];
  const quickLinks = [
    { label: "New client", icon: Users },
    { label: "New project", icon: FolderKanban },
    { label: "New post", icon: FileText },
    { label: "Log activity", icon: ActivitySquare },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-primary/15 via-secondary/60 to-background p-6 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div>
            <p className="pill w-fit bg-primary/15 text-primary">Control center</p>
            <h1 className="mt-3 text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Operational snapshot across clients, projects, content, and inbound requests.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="border-primary/40 text-foreground">
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
                <Card className="surface-card border border-border/50 bg-gradient-to-br from-card to-card/70 transition-transform duration-200 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <span className={`rounded-full bg-primary/10 p-2 text-primary`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className={`mt-3 h-2 rounded-full bg-gradient-to-r ${stat.tint}`} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="surface-card border border-border/50">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" />
                Quick actions
              </CardTitle>
              <Button size="sm" variant="ghost" className="text-xs" onClick={fetchStats} disabled={refreshing}>
                {refreshing ? "Refreshing..." : "Refresh stats"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-primary/30 text-foreground">
                  <FileCog className="mr-2 h-4 w-4" />
                  Configure settings
                </Button>
                <Button variant="outline" className="border-primary/30 text-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  Invite client
                </Button>
                <Button variant="outline" className="border-primary/30 text-foreground">
                  <FolderKanban className="mr-2 h-4 w-4" />
                  New project
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { title: "Security posture", copy: "RBAC enforced, MFA on, audit log streaming.", icon: <ShieldCheck className="h-4 w-4 text-primary" /> },
                  { title: "Delivery cadence", copy: "Weekly previews and release notes stay on schedule.", icon: <ActivitySquare className="h-4 w-4 text-primary" /> },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/70 p-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">{item.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="surface-card border border-border/50">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Latest numbers</CardTitle>
              <Badge variant="secondary" className="rounded-full border-primary/30 bg-primary/10 text-primary">
                Live
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {statCards.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-border/40 bg-secondary/70 p-3">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                    {stat.value}
                  </Badge>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{stat.label}</p>
                    <p className="text-muted-foreground">Updated just now</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">Data auto-refreshes on load. Use Refresh to pull the latest.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="surface-card border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              Quick links
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Button key={item.label} variant="outline" className="justify-start border-border/60 text-foreground">
                  <Icon className="mr-2 h-4 w-4 text-primary" />
                  {item.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
