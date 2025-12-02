import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BarChart3, Activity, Users, Globe } from "lucide-react";

const metrics = [
  { label: "Active users", value: "1,240", delta: "+12% vs last week" },
  { label: "Pageviews", value: "84,500", delta: "+8% vs last week" },
  { label: "Avg. session", value: "3m 20s", delta: "+5% vs last week" },
  { label: "Conversions", value: "4.2%", delta: "+0.3pp vs last week" },
];

const events = [
  { name: "Signed in", count: 4200 },
  { name: "Contact form", count: 320 },
  { name: "Demo clicks", count: 180 },
  { name: "Download docs", count: 260 },
];

const AdminAnalytics = () => (
  <AdminLayout>
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="pill w-fit">Analytics</p>
        <h1 className="text-3xl font-bold text-foreground">Product Analytics</h1>
        <p className="text-muted-foreground">High-level signals across traffic, engagement, and conversions.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Card className="surface-card border border-border/60">
              <CardContent className="p-4 space-y-1">
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.delta}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="surface-card border border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="h-4 w-4" />
            Top Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((e) => (
            <div key={e.name} className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/60 px-4 py-2">
              <span className="text-sm text-foreground">{e.name}</span>
              <Badge variant="secondary" className="rounded-full">
                {e.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="h-4 w-4" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Bounce rate: 28%</p>
            <p>Returning visitors: 46%</p>
            <p>Top referrers: direct, google, linkedin</p>
          </CardContent>
        </Card>
        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-4 w-4" />
              Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Top regions: US, UK, DE</p>
            <p>Devices: 68% desktop, 32% mobile</p>
            <p>Time on site: 3m 20s avg</p>
          </CardContent>
        </Card>
        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Globe className="h-4 w-4" />
              Traffic
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Top pages: /, /services, /portfolio</p>
            <p>Top CTAs: Get Started, View Portfolio</p>
            <p>Avg. requests/day: 3.2k</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </AdminLayout>
);

export default AdminAnalytics;
