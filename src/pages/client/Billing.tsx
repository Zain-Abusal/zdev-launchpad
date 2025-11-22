import { motion } from 'framer-motion';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';

const ClientBilling = () => {
  return (
    <ClientLayout>
      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Billing</h1>
          <p className="text-muted-foreground">
            View your billing information and payment status
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Billing Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="font-medium">Current Plan</span>
              <span className="text-muted-foreground">Custom Project</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="font-medium">Billing Status</span>
              <Badge variant="default">Paid</Badge>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                All custom projects are billed individually based on agreed terms. 
                For billing inquiries, please contact support at support@zdev.dev
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientBilling;
