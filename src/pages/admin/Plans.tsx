import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Free", price: "$0", requests: "100k" },
  { name: "Pro", price: "$49", requests: "1M" },
  { name: "Enterprise", price: "Custom", requests: "Unlimited" },
];

const Plans = () => (
  <AdminLayout>
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Plans</CardTitle>
        <Button>Create plan</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Requests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.name}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>{plan.requests}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default Plans;
