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

const AdminRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from('project_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setRequests(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in_review': return 'secondary';
      case 'closed': return 'outline';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Project Requests</h1>
          <p className="text-muted-foreground">
            Review and manage incoming project requests
          </p>
        </motion.div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.full_name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {request.project_title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(request.status || 'new')}>
                      {request.status || 'new'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.created_at).toLocaleDateString()}
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

          {requests.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No project requests yet
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;
