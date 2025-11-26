import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tickets = [
  { org: "acme", subject: "Need more quota", status: "open" },
  { org: "globex", subject: "Enterprise terms", status: "in_progress" },
];

const SupportTickets = () => (
  <AdminLayout>
    <Card>
      <CardHeader>
        <CardTitle>Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket, idx) => (
              <TableRow key={idx}>
                <TableCell>{ticket.org}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default SupportTickets;
