import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface StatusComponent {
  name: string;
  status: string;
}

interface StatusIncident {
  id: string;
  title: string;
  status: string;
  impact: string;
  started_at: string;
  resolved_at?: string | null;
}

interface StatusResponse {
  components: StatusComponent[];
  incidents: StatusIncident[];
}

const StatusPage = () => {
  const { data, isLoading, error } = useQuery<StatusResponse>({
    queryKey: ["status"],
    queryFn: () => api.get("/api/status"),
  });

  const overall = data?.incidents.some((i) => i.status !== "resolved")
    ? "Some systems are experiencing issues"
    : "All systems operational";

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-16 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Status</h1>
          <p className="text-muted-foreground">{isLoading ? "Loading..." : overall}</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {isLoading && (
              <>
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </>
            )}
            {error && <p className="text-sm text-destructive">Failed to load status.</p>}
            {data?.components.map((component) => (
              <div key={component.name} className="flex items-center justify-between rounded-lg border p-3">
                <span>{component.name}</span>
                <Badge variant={component.status === "operational" ? "outline" : "secondary"}>{component.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent incidents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading && (
              <>
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </>
            )}
            {data?.incidents.map((incident) => (
              <div key={incident.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{incident.title}</p>
                    <p className="text-sm text-muted-foreground">Impact: {incident.impact}</p>
                  </div>
                  <Badge variant={incident.status === "resolved" ? "outline" : "secondary"}>{incident.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Started {new Date(incident.started_at).toLocaleString()}
                  {incident.resolved_at ? ` • Resolved ${new Date(incident.resolved_at).toLocaleString()}` : ""}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
};

export default StatusPage;
