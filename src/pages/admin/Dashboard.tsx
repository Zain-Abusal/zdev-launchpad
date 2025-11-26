import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface OverviewResponse {
  totals: { users: number; organizations: number; apiKeys: number; requests24h: number; mrr: number };
  latestUsers: { id: string; email: string; created_at: string; is_staff?: boolean }[];
  latestOrganizations: { id: string; name: string; plan: string; created_at: string }[];
  incidents: { id: string; title: string; status: string; impact: string; started_at: string }[];
}

const AdminDashboard = () => {
  const { data, isLoading, error } = useQuery<OverviewResponse>({
    queryKey: ["admin-overview"],
    queryFn: () => api.get("/api/admin/overview"),
  });

  return (
    <AdminLayout>
      <div className="grid gap-4 md:grid-cols-3">
        {isLoading && Array.from({ length: 5 }).map((_, idx) => <Skeleton key={idx} className="h-28" />)}
        {data && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Total users</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{data.totals.users}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Organizations</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{data.totals.organizations}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">API keys</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{data.totals.apiKeys}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Requests 24h</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{data.totals.requests24h.toLocaleString()}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">MRR</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">${data.totals.mrr.toFixed(0)}</CardContent>
            </Card>
          </>
        )}
      </div>

      {error && <p className="text-sm text-destructive">Unable to load admin overview.</p>}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <Skeleton className="h-32" />}
            {data && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Signed up</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.latestUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.is_staff ? "secondary" : "outline"}>
                          {user.is_staff ? "Staff" : "Customer"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest organizations</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <Skeleton className="h-32" />}
            {data && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.latestOrganizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>{org.name}</TableCell>
                      <TableCell>
                        <Badge variant={org.plan === "enterprise" ? "secondary" : "outline"}>{org.plan}</Badge>
                      </TableCell>
                      <TableCell>{new Date(org.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <Skeleton className="h-24" />}
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Started</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>{incident.title}</TableCell>
                    <TableCell>
                      <Badge variant={incident.status === "resolved" ? "outline" : "secondary"}>{incident.status}</Badge>
                    </TableCell>
                    <TableCell>{incident.impact}</TableCell>
                    <TableCell>{new Date(incident.started_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
