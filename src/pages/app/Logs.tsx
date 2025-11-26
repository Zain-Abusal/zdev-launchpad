import { AppLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const logs = [
  { time: "12:01", app: "Acme Live", path: "/v1/widgets", method: "GET", status: 200, latency: "120ms", region: "iad" },
  { time: "12:05", app: "Acme Live", path: "/v1/widgets/1", method: "GET", status: 500, latency: "600ms", region: "dfw" },
];

const Logs = () => (
  <AppLayout>
    <Card>
      <CardHeader>
        <CardTitle>Request Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>App</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Latency</TableHead>
              <TableHead>Region</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.app}</TableCell>
                <TableCell>{log.path}</TableCell>
                <TableCell>{log.method}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.latency}</TableCell>
                <TableCell>{log.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AppLayout>
);

export default Logs;
