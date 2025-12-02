import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, Receipt, ShieldCheck } from "lucide-react";

const invoices = [
  { id: "INV-1023", amount: "$1,200", status: "Paid", date: "2025-11-10" },
  { id: "INV-1022", amount: "$950", status: "Paid", date: "2025-10-10" },
  { id: "INV-1021", amount: "$850", status: "Due", date: "2025-09-10" },
];

const AdminBilling = () => (
  <AdminLayout>
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="pill w-fit">Billing</p>
        <h1 className="text-3xl font-bold text-foreground">Billing Overview</h1>
        <p className="text-muted-foreground">Track invoices, payment status, and download receipts.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "MRR", value: "$4,320", hint: "+6.4% vs last month" },
          { label: "Open invoices", value: "$850", hint: "1 unpaid" },
          { label: "Payments YTD", value: "$42,700", hint: "Paid successfully" },
        ].map((item, idx) => (
          <Card key={item.label} className="surface-card border border-border/60">
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="surface-card border border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CreditCard className="h-4 w-4" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{inv.id}</p>
                <p className="text-xs text-muted-foreground">Date: {inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-foreground">{inv.amount}</p>
                <Badge variant={inv.status === "Paid" ? "default" : "secondary"} className="rounded-full">
                  {inv.status}
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-border/60">
            <Receipt className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardContent>
      </Card>

      <Card className="surface-card border border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-4 w-4" />
            Payment processors
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Stripe: Connected (Live)</p>
          <p>PayPal: Connected</p>
          <p>Webhook status: 200 OK</p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
);

export default AdminBilling;
