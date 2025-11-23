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
      .limit(1)
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
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle><Key className="inline mr-2" />License Key</CardTitle>
          </CardHeader>
          <CardContent>
            {license ? (
              <div>
                <code className="text-sm bg-muted px-3 py-2 rounded block mb-2">{license.license_key}</code>
                <p className="text-xs text-muted-foreground mb-2">Status: <Badge variant={license.status === 'active' ? 'default' : 'destructive'}>{license.status}</Badge></p>
                <p className="text-xs text-muted-foreground mb-2">Max Domains: {license.max_domains}</p>
              </div>
            ) : <p className="text-muted-foreground">No license found.</p>}
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle><Globe className="inline mr-2" />Associated Domains</CardTitle>
          </CardHeader>
          <CardContent>
            {domains.length ? (
              <ul className="text-sm space-y-2">
                {domains.map((domain: any) => (
                  <li key={domain.id} className="p-2 border rounded">
                    <div className="font-medium">{domain.domain}</div>
                    <div className="text-xs text-muted-foreground">
                      Last seen: {new Date(domain.last_seen).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No domains registered yet.</p>}
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle><RefreshCw className="inline mr-2" />License Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length ? (
              <ul className="text-sm space-y-2">
                {logs.map((log: any) => (
                  <li key={log.id} className="p-2 border-b">
                    <div>{log.domain}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground">No activity logs found.</p>}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientLicense;
