import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const keys = [
  { name: "Acme Live", prefix: "sk_live_acme", org: "acme", user: "user@example.com", scopes: "read", status: "active", lastUsed: "May 21" },
  { name: "Globex Admin", prefix: "sk_live_globex", org: "globex", user: "support@example.com", scopes: "admin", status: "active", lastUsed: "May 20" },
];

const AdminApiKeys = () => (
  <AdminLayout>
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Prefix</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Scopes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key.prefix}>
                <TableCell>{key.name}</TableCell>
                <TableCell>{key.prefix}</TableCell>
                <TableCell>{key.org}</TableCell>
                <TableCell>{key.user}</TableCell>
                <TableCell>{key.scopes}</TableCell>
                <TableCell>{key.status}</TableCell>
                <TableCell>{key.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default AdminApiKeys;
