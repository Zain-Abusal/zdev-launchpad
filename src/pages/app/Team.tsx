import { AppLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const members = [
  { name: "Mia Chen", email: "mia@example.com", role: "org_owner", joined: "Jan 5" },
  { name: "Alex Ray", email: "alex@example.com", role: "org_admin", joined: "Feb 12" },
  { name: "Sam Lee", email: "sam@example.com", role: "org_member", joined: "Mar 3" },
];

const Team = () => (
  <AppLayout>
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Team</CardTitle>
        <Button>Invite member</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.email}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AppLayout>
);

export default Team;
