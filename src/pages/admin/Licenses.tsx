import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Lock, Unlock, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminLicenses = () => {
  const { toast } = useToast();
  const [licenses, setLicenses] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    license_key: '',
    status: 'active',
    max_domains: 1,
  });
  const [selectedLicense, setSelectedLicense] = useState<any>(null);
  const [domains, setDomains] = useState<any[]>([]);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    const { data } = await supabase
      .from('licenses')
      .select(`
        *,
        client_projects (
          id,
          projects (title)
        )
      `)
      .order('created_at', { ascending: false });
    if (data) setLicenses(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('licenses')
        .insert([formData]);
      if (error) throw error;
      toast({ title: 'License created successfully' });
      setOpen(false);
      setFormData({ license_key: '', status: 'active', max_domains: 1 });
      fetchLicenses();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this license?')) return;
    const { error } = await supabase.from('licenses').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'License deleted successfully' });
      fetchLicenses();
    }
  };

  const fetchDomains = async (licenseId: string) => {
    const { data } = await supabase
      .from('license_domains')
      .select('*')
      .eq('license_id', licenseId)
      .order('last_seen', { ascending: false });
    
    if (data) setDomains(data);
  };

  const handleViewDetails = async (license: any) => {
    setSelectedLicense(license);
    await fetchDomains(license.id);
  };

  const handleToggleLock = async (license: any) => {
    const newStatus = license.status === 'active' ? 'locked' : 'active';
    
    const { error } = await supabase
      .from('licenses')
      .update({ status: newStatus })
      .eq('id', license.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `License ${newStatus === 'active' ? 'unlocked' : 'locked'} successfully` });
      fetchLicenses();
      if (selectedLicense?.id === license.id) {
        setSelectedLicense({ ...selectedLicense, status: newStatus });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'locked': return 'destructive';
      case 'expired': return 'secondary';
      default: return 'outline';
    }
  };

  const maskLicenseKey = (key: string) => {
    const parts = key.split('-');
    if (parts.length >= 4) {
      return `${parts[0]}-${parts[1]}-••••-${parts[parts.length - 1]}`;
    }
    return '••••-••••-••••-••••';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">License Overview</h1>
          <p className="text-muted-foreground">
            Manage software licenses and activations
          </p>
        </motion.div>

        <Card>
          <div className="flex justify-end p-4">
            <Button onClick={() => setOpen(true)}>
              Add License
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Key</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Domains</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-mono text-sm">
                    {maskLicenseKey(license.license_key)}
                  </TableCell>
                  <TableCell>
                    {license.client_projects?.projects?.title || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(license.status)}>
                      {license.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {license.max_domains || 1}
                  </TableCell>
                  <TableCell>
                    {new Date(license.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(license)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={license.status === 'active' ? 'destructive' : 'default'}
                        onClick={() => handleToggleLock(license)}
                      >
                        {license.status === 'active' ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(license.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {licenses.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No licenses yet
            </div>
          )}
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New License</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="License Key"
                value={formData.license_key}
                onChange={(e) => setFormData({ ...formData, license_key: e.target.value })}
                required
                className="w-full px-3 py-2 rounded border"
              />
              <input
                type="number"
                placeholder="Max Domains"
                value={formData.max_domains}
                onChange={(e) => setFormData({ ...formData, max_domains: Number(e.target.value) })}
                min={1}
                className="w-full px-3 py-2 rounded border"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded border"
              >
                <option value="active">Active</option>
                <option value="locked">Locked</option>
                <option value="expired">Expired</option>
              </select>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Create License</Button>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedLicense} onOpenChange={() => setSelectedLicense(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>License Details</DialogTitle>
            </DialogHeader>
            {selectedLicense && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">License Key</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="text-sm bg-muted px-3 py-2 rounded block">
                        {selectedLicense.license_key}
                      </code>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={getStatusColor(selectedLicense.status)}>
                        {selectedLicense.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Associated Domains</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {domains.length > 0 ? (
                      <div className="space-y-2">
                        {domains.map((domain) => (
                          <div key={domain.id} className="flex items-center justify-between p-2 rounded border">
                            <span className="font-mono text-sm">{domain.domain}</span>
                            <span className="text-xs text-muted-foreground">
                              Last seen: {new Date(domain.last_seen).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No domains registered yet</p>
                    )}
                  </CardContent>
                </Card>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Locking a license will prevent it from validating on any domain. 
                    The client's software will show as unlicensed.
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminLicenses;
