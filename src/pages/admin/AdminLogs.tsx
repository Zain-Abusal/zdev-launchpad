import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface RequestLog {
  organization: string;
  app: string;
  path: string;
  status: number;
  count: number;
}

interface LogsResponse {
  data: RequestLog[];
}

const AdminLogs = () => {
  const { data, isLoading, error } = useQuery<LogsResponse>({
    queryKey: ["admin-logs"],
    queryFn: () => api.get("/api/admin/logs"),
  });

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Request Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <Skeleton className="h-24" />}
          {error && <p className="text-sm text-destructive">Failed to load request logs.</p>}
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>App</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((log, idx) => (
                  <TableRow key={`${log.organization}-${idx}`}>
                    <TableCell>{log.organization}</TableCell>
                    <TableCell>{log.app}</TableCell>
                    <TableCell className="font-mono text-xs">{log.path}</TableCell>
                    <TableCell>{log.status}</TableCell>
                    <TableCell>{log.count.toLocaleString()}</TableCell>
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

export default AdminLogs;
