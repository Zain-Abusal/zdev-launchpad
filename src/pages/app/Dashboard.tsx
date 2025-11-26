import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLayout } from "./Layout";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: string;
  action: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

interface DashboardResponse {
  metrics: {
    requestsToday: number;
    requests30d: number;
    errorRate24h: number;
    activeKeys: number;
    series: { day: number; requests: number; errors: number }[];
  };
  activity: ActivityItem[];
}

const metricFormatter = new Intl.NumberFormat(undefined);

const Dashboard = () => {
  const { data, isLoading, error } = useQuery<DashboardResponse>({
    queryKey: ["client-dashboard"],
    queryFn: () => api.get("/api/dashboard/client"),
  });

  return (
    <AppLayout>
      <div className="grid gap-4 md:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => <Skeleton key={idx} className="h-28" />)
          : data && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">Requests today</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-semibold">
                    {metricFormatter.format(data.metrics.requestsToday)}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">Requests last 30d</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-semibold">
                    {metricFormatter.format(data.metrics.requests30d)}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">Error rate 24h</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-semibold">
                    {data.metrics.errorRate24h.toFixed(2)}%
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">Active API keys</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-semibold">{data.metrics.activeKeys}</CardContent>
                </Card>
              </>
            )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests (last 30 days)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading && <Skeleton className="h-32" />}
          {error && <p className="text-sm text-destructive">Failed to load metrics.</p>}
          {data && (
            <div className="grid gap-2 text-sm md:grid-cols-2">
              {data.metrics.series.map((point) => (
                <div key={point.day} className="flex items-center justify-between rounded-md border p-2">
                  <span>Day {point.day}</span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge variant="outline">{metricFormatter.format(point.requests)} req</Badge>
                    <Badge variant="secondary">{metricFormatter.format(point.errors)} errors</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading && (
            <>
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </>
          )}
          {error && <p className="text-sm text-destructive">Unable to load activity.</p>}
          {data?.activity.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="font-medium">{item.action.replace("_", " ")}</p>
                {item.metadata && (
                  <p className="text-xs text-muted-foreground">{JSON.stringify(item.metadata)}</p>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Dashboard;
