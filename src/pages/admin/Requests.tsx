import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    project_title: '',
    description: '',
    status: 'new',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRequest) {
        const { error } = await supabase
          .from('project_requests')
          .update(formData)
          .eq('id', editingRequest.id);
        if (error) throw error;
        toast({ title: 'Request updated successfully' });
      } else {
        const { error } = await supabase
          .from('project_requests')
          .insert([formData]);
        if (error) throw error;
        toast({ title: 'Request created successfully' });
      }
      setOpen(false);
      resetForm();
      fetchRequests();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEdit = (request: any) => {
    setEditingRequest(request);
    setFormData({
      full_name: request.full_name,
      email: request.email,
      project_title: request.project_title,
      description: request.description,
      status: request.status,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    const { error } = await supabase.from('project_requests').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Request deleted successfully' });
      fetchRequests();
    }
  };

  const resetForm = () => {
    setEditingRequest(null);
    setFormData({ full_name: '', email: '', project_title: '', description: '', status: 'new' });
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
          <div className="flex justify-end p-4">
            <Dialog open={open} onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  Add Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>{editingRequest ? 'Edit Request' : 'Add New Request'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Project Title"
                    value={formData.project_title}
                    onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded border"
                  >
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="closed">Closed</option>
                  </select>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingRequest ? 'Update' : 'Create'} Request
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
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
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(request)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(request.id)}>
                        Delete
                      </Button>
                    </div>
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
