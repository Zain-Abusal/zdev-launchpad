import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

const logTypes = [
  { key: 'license_logs', label: 'License Logs', table: 'license_logs' },
  { key: 'license_events', label: 'License Events', table: 'license_events' },
  { key: 'license_domains', label: 'License Domains', table: 'license_domains' },
  { key: 'chat_messages', label: 'Support Messages', table: 'chat_messages' },
];

const AdminLogs = () => {
  const [activeTab, setActiveTab] = useState(logTypes[0].key);
  const [logs, setLogs] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tab = logTypes.find(l => l.key === activeTab);
    if (tab) fetchLogs(tab.table, tab.key);
  }, [activeTab]);

  const fetchLogs = async (table: string, key: string) => {
    setLoading(true);
    const { data } = await supabase
      .from(table as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setLogs((prev: any) => ({ ...prev, [key]: data || [] }));
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Logs Viewer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList>
                {logTypes.map(log => (
                  <TabsTrigger key={log.key} value={log.key}>{log.label}</TabsTrigger>
                ))}
              </TabsList>
              {logTypes.map(log => (
                <TabsContent key={log.key} value={log.key}>
                  {loading ? <div>Loading...</div> : (
                    <table className="w-full text-sm border">
                      <thead>
                        <tr>
                          {logs[log.key] && logs[log.key][0] && Object.keys(logs[log.key][0]).map((col: string) => (
                            <th key={col} className="border px-2 py-1">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {logs[log.key] && logs[log.key].map((row: any, i: number) => (
                          <tr key={i}>
                            {Object.values(row).map((val: any, j: number) => (
                              <td key={j} className="border px-2 py-1">{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminLogs;
