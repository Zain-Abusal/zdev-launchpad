import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const incidents = [
  { title: "API latency spike", status: "investigating", impact: "major", started: "2h ago" },
  { title: "Database maintenance", status: "resolved", impact: "minor", started: "1d ago" },
];

const SystemStatus = () => (
  <AdminLayout>
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>System Status</CardTitle>
        <Button>Create incident</Button>
      </CardHeader>
      <CardContent>
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
            {incidents.map((incident, idx) => (
              <TableRow key={idx}>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{incident.status}</TableCell>
                <TableCell>{incident.impact}</TableCell>
                <TableCell>{incident.started}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default SystemStatus;
