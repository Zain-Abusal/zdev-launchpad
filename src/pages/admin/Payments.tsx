import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wallet, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

const transactions = [
  { id: "PAY-9832", amount: "$420", status: "Succeeded", method: "Card", date: "2025-11-30" },
  { id: "PAY-9824", amount: "$280", status: "Succeeded", method: "Card", date: "2025-11-28" },
  { id: "PAY-9820", amount: "$190", status: "Failed", method: "ACH", date: "2025-11-26" },
];

const Payments = () => (
  <AdminLayout>
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="pill w-fit">Payments</p>
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground">Recent charges, status, and gateway health.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Success rate", value: "97.4%", hint: "Past 30 days" },
          { label: "Refunds", value: "$320", hint: "Past 30 days" },
          { label: "Disputes", value: "0", hint: "Open cases" },
        ].map((item) => (
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
            <Wallet className="h-4 w-4" />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{t.id}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-foreground">{t.amount}</p>
                <Badge variant={t.status === "Succeeded" ? "default" : "destructive"} className="rounded-full">
                  {t.status}
                </Badge>
                <Badge variant="secondary" className="rounded-full">{t.method}</Badge>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-border/60">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardContent>
      </Card>

      <Card className="surface-card border border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Gateway status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Stripe: Operational</p>
          <p>PayPal: Operational</p>
          <p className="flex items-center gap-2 text-destructive"><AlertCircle className="h-4 w-4" /> Webhook retries: 0 failed</p>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
);

export default Payments;
