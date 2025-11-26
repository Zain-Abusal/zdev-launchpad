import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const entries = [
  { actor: "user@example.com", action: "api_key.created", resource: "api_key", at: "2024-05-21" },
  { actor: "support@example.com", action: "incident.resolved", resource: "status_incident", at: "2024-05-20" },
];

const AuditLog = () => (
  <AdminLayout>
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, idx) => (
              <TableRow key={idx}>
                <TableCell>{entry.actor}</TableCell>
                <TableCell>{entry.action}</TableCell>
                <TableCell>{entry.resource}</TableCell>
                <TableCell>{entry.at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default AuditLog;
