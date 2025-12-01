import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lock, Unlock, Eye, Trash2, Plus, Globe, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logActivity } from '@/lib/activityLogger';
import { useAuth } from '@/contexts/AuthContext';

const AdminLicenses = () => {
  const { toast } = useToast();
  const { user } = useAuth();
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
    if (user) {
      logActivity({ action: 'admin_licenses_view', details: 'Viewed licenses dashboard', userId: user.id });
    }
  }, [user]);

  const fetchLicenses = async () => {
    const { data } = await supabase
      .from('licenses')
      .select(`*, client_projects ( id, projects (title) )`)
      .order('created_at', { ascending: false });
    if (data) setLicenses(data);
  };

  const fetchDomains = async (licenseId: string) => {
    const { data } = await supabase
      .from('license_domains')
      .select('*')
      .eq('license_id', licenseId)
      .order('last_seen', { ascending: false });
    if (data) setDomains(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('licenses').insert([formData]);
      if (error) throw error;
      toast({ title: 'License created successfully' });
      logActivity({ action: 'admin_license_create', details: `Created license ${formData.license_key}`, userId: user?.id });
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
      logActivity({ action: 'admin_license_delete', details: `Deleted license ${id}`, userId: user?.id });
      fetchLicenses();
    }
  };

  const handleToggleLock = async (license: any) => {
    const newStatus = license.status === 'active' ? 'locked' : 'active';
    const { error } = await supabase.from('licenses').update({ status: newStatus }).eq('id', license.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: `License ${newStatus === 'active' ? 'unlocked' : 'locked'} successfully` });
      logActivity({ action: 'admin_license_toggle', details: `License ${license.id} -> ${newStatus}`, userId: user?.id });
      fetchLicenses();
      if (selectedLicense?.id === license.id) {
        setSelectedLicense({ ...selectedLicense, status: newStatus });
      }
    }
  };

  const handleViewDetails = async (license: any) => {
    setSelectedLicense(license);
    await fetchDomains(license.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'locked': return 'destructive';
      case 'expired': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between gap-3"
        >
          <div>
            <p className="pill w-fit">Licenses</p>
            <h1 className="text-3xl font-bold">License Management</h1>
            <p className="text-muted-foreground">Manage activation keys, domains, and status.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="group">
                <Plus className="mr-2 h-4 w-4" /> New License
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl surface-card border border-border/60">
              <DialogHeader>
                <DialogTitle>Create License</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="License key"
                  value={formData.license_key}
                  onChange={(e) => setFormData({ ...formData, license_key: e.target.value })}
                  required
                />
                <Input
                  placeholder="Max domains"
                  type="number"
                  min={1}
                  value={formData.max_domains}
                  onChange={(e) => setFormData({ ...formData, max_domains: Number(e.target.value) })}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Create</Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle>Licenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Max Domains</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses.map((license) => (
                  <TableRow key={license.id} className="hover:bg-muted/50">
                    <TableCell><code className="text-xs bg-muted px-2 py-1 rounded">{license.license_key}</code></TableCell>
                    <TableCell><Badge variant={getStatusColor(license.status)}>{license.status}</Badge></TableCell>
                    <TableCell>{license.max_domains}</TableCell>
                    <TableCell>{license.client_projects?.projects?.title || '—'}</TableCell>
                    <TableCell className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(license)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleToggleLock(license)}>
                        {license.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(license.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedLicense && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="surface-card border border-border/60">
              <CardHeader>
                <CardTitle>License Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Key: {selectedLicense.license_key}</span>
                </div>
                <div>Status: <Badge variant={getStatusColor(selectedLicense.status)}>{selectedLicense.status}</Badge></div>
                <div>Max Domains: {selectedLicense.max_domains}</div>
                <div>Project: {selectedLicense.client_projects?.projects?.title || '—'}</div>
              </CardContent>
            </Card>

            <Card className="surface-card border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Domains
                </CardTitle>
              </CardHeader>
              <CardContent>
                {domains.length ? (
                  <div className="space-y-2 text-sm">
                    {domains.map((domain) => (
                      <div key={domain.id} className="flex items-center justify-between rounded border border-border/60 px-3 py-2">
                        <span>{domain.domain}</span>
                        <span className="text-xs text-muted-foreground">Last seen: {new Date(domain.last_seen).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No domains recorded.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLicenses;
