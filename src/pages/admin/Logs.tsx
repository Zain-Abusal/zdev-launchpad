import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Database, Shield, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const logTypes = [
  { key: 'activity_logs', label: 'Activity Logs', table: 'activity_logs', icon: Activity },
  { key: 'license_logs', label: 'License Logs', table: 'license_logs', icon: Shield },
  { key: 'license_events', label: 'License Events', table: 'license_events', icon: Database },
  { key: 'chat_messages', label: 'Support Messages', table: 'chat_messages', icon: MessageSquare },
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
      .limit(100);
    setLogs((prev: any) => ({ ...prev, [key]: data || [] }));
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Activity & System Logs</h1>
          <p className="text-muted-foreground">
            Monitor system activity, user actions, and license usage
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            {logTypes.map(log => {
              const Icon = log.icon;
              return (
                <TabsTrigger key={log.key} value={log.key} className="gap-2">
                  <Icon className="h-4 w-4" />
                  {log.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {logTypes.map(log => (
            <TabsContent key={log.key} value={log.key}>
              <Card>
                <CardHeader>
                  <CardTitle>{log.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : logs[log.key] && logs[log.key].length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            {Object.keys(logs[log.key][0]).map((col: string) => (
                              <th key={col} className="text-left p-3 font-semibold">
                                {col.replace(/_/g, ' ').toUpperCase()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {logs[log.key].map((row: any, i: number) => (
                            <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                              {Object.entries(row).map(([key, val]: [string, any], j: number) => (
                                <td key={j} className="p-3">
                                  {key.includes('created_at') || key.includes('updated_at') || key.includes('_at') ? (
                                    <span className="text-muted-foreground">
                                      {val ? format(new Date(val), 'MMM dd, yyyy HH:mm') : '-'}
                                    </span>
                                  ) : key === 'status' || key === 'event_type' ? (
                                    <Badge variant={val === 'active' || val === 'success' ? 'default' : 'secondary'}>
                                      {String(val)}
                                    </Badge>
                                  ) : (
                                    <span className="truncate max-w-xs block">{String(val || '-')}</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No logs found
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminLogs;
