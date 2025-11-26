import { AppLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const apps = [
  { name: "Acme Sandbox", slug: "acme-sandbox", status: "sandbox", requests: "12k", errors: "0.4%" },
  { name: "Acme Live", slug: "acme-live", status: "live", requests: "62k", errors: "0.2%" },
  { name: "Globex Pay", slug: "globex-pay", status: "live", requests: "44k", errors: "0.3%" },
];

const Apps = () => (
  <AppLayout>
    <Card>
      <CardHeader>
        <CardTitle>Apps</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requests today</TableHead>
              <TableHead>Error rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.slug}>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.slug}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>{app.requests}</TableCell>
                <TableCell>{app.errors}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AppLayout>
);

export default Apps;
