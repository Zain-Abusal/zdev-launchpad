import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const users = [
  { name: "Admin User", email: "admin@example.com", isStaff: true, role: "staff_admin", created: "Apr 1" },
  { name: "Demo User", email: "user@example.com", isStaff: false, role: "org_member", created: "Apr 12" },
];

const Users = () => (
  <AdminLayout>
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Users</CardTitle>
        <Button>Create user</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isStaff ? "Yes" : "No"}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default Users;
