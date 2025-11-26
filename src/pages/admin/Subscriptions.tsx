import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const subs = [
  { org: "acme", plan: "Pro", status: "active", periodEnd: "Jun 15" },
  { org: "globex", plan: "Enterprise", status: "trialing", periodEnd: "Jun 30" },
];

const Subscriptions = () => (
  <AdminLayout>
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Period end</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subs.map((sub, idx) => (
              <TableRow key={idx}>
                <TableCell>{sub.org}</TableCell>
                <TableCell>{sub.plan}</TableCell>
                <TableCell>{sub.status}</TableCell>
                <TableCell>{sub.periodEnd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default Subscriptions;
