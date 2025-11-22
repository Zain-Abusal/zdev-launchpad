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
