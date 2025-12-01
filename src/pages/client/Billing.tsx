import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Receipt, ShieldCheck } from 'lucide-react';
import { logActivity } from '@/lib/activityLogger';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

const ClientBilling = () => {
  const { user } = useAuth();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (user && !logged) {
      logActivity({ action: 'client_billing_view', details: 'Viewed billing', userId: user.id });
      setLogged(true);
    }
  }, [user, logged]);

  return (
    <ClientLayout>
      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="pill w-fit">Billing</p>
          <h1 className="text-3xl font-bold mb-2">Invoices & payments</h1>
          <p className="text-muted-foreground">Clear status on your active plan and invoices.</p>
        </motion.div>

        <Card className="surface-card border border-border/60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>Billing Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/50 p-4">
              <span className="font-medium">Current Plan</span>
              <span className="text-muted-foreground">Custom Project</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/50 p-4">
              <span className="font-medium">Billing Status</span>
              <Badge variant="default">Paid</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure payments and invoices stored safely.
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Receipt className="h-4 w-4 text-primary" />
                Need copies of invoices? Request them anytime.
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" className="border-primary/30">Download receipt</Button>
              <Button variant="ghost">Contact billing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientBilling;
