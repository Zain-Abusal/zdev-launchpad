import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminClients = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setClients(data);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships
          </p>
        </motion.div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.business_name || 'N/A'}
                  </TableCell>
                  <TableCell>{client.contact_email}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {client.status || 'active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(client.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {clients.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No clients yet
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminClients;
