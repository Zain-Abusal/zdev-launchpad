import { useEffect, useState } from 'react';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Key, Globe, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ClientLicense = () => {
  const { user } = useAuth();
  const [license, setLicense] = useState<any>(null);
  const [domains, setDomains] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchLicense();
    }
  }, [user]);

  const fetchLicense = async () => {
    const { data } = await supabase
      .from('licenses')
      .select('*')
      .eq('client_id', user.id)
      .single();
    if (data) {
      setLicense(data);
      fetchDomains(data.id);
      fetchLogs(data.id);
    }
  };

  const fetchDomains = async (licenseId: string) => {
    const { data } = await supabase
      .from('license_domains')
      .select('*')
      .eq('license_id', licenseId);
    if (data) setDomains(data);
  };

  const fetchLogs = async (licenseId: string) => {
    const { data } = await supabase
      .from('license_logs')
      .select('*')
      .eq('license_id', licenseId);
    if (data) setLogs(data);
  };

  return (
    <ClientLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle><Key className="inline mr-2" />License Key</CardTitle>
          </CardHeader>
          <CardContent>
            {license ? (
              <div>
                <code className="text-sm bg-muted px-3 py-2 rounded block mb-2">{license.license_key}</code>
                <p className="text-xs text-muted-foreground mb-2">Status: {license.status}</p>
                <p className="text-xs text-muted-foreground mb-2">Expires: {license.expires_at || 'Never'}</p>
                <Button size="sm" variant="outline" className="mt-2">Renew/Change Tier</Button>
              </div>
            ) : <p className="text-muted-foreground">No license found.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><Globe className="inline mr-2" />Allowed Domains</CardTitle>
          </CardHeader>
          <CardContent>
            {domains.length ? (
              <ul className="text-sm">
                {domains.map((domain: any) => (
                  <li key={domain.id} className="mb-1">{domain.domain} - {domain.last_seen ? 'Active' : 'Inactive'}</li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No domains found.</p>}
            <Button size="sm" variant="outline" className="mt-2">Request Domain Change</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><RefreshCw className="inline mr-2" />License Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length ? (
              <ul className="text-sm">
                {logs.map((log: any) => (
                  <li key={log.id} className="mb-2">{log.event}: {log.details} <span className="text-xs text-muted-foreground">({log.created_at})</span></li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No license logs found.</p>}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientLicense;
