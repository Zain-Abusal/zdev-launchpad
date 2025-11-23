import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Database, Shield, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [expandedLog, setExpandedLog] = useState<any>(null);
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [search, setSearch] = useState('');

  // Extract unique users and actions for dropdowns
  const currentLogs = logs[activeTab] || [];
  const userOptions = Array.from(new Set(currentLogs.map((l: any) => l.user_id).filter(Boolean)));
  const actionOptions = Array.from(new Set(currentLogs.map((l: any) => l.action).filter(Boolean)));

  useEffect(() => {
    const tab = logTypes.find(l => l.key === activeTab);
    if (tab) fetchLogs(tab.table, tab.key);
  }, [activeTab]);

  const fetchLogs = async (table: string, key: string) => {
    setLoading(true);
    let query = supabase.from(table as any).select('*').order('created_at', { ascending: false }).limit(100);
    if (filterUser) query = query.ilike('user_id', `%${filterUser}%`);
    if (filterAction) query = query.ilike('action', `%${filterAction}%`);
    if (filterDate) query = query.gte('created_at', filterDate);
    const { data } = await query;
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

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between bg-gradient-to-r from-muted/40 to-card rounded-xl p-4 shadow">
          <div className="flex gap-3 items-center w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="🔍 Search logs (details, user, action...)"
                className="w-full rounded-xl px-5 py-3 bg-background border border-border shadow focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.01em' }}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
            </div>
            <select
              className="rounded-xl px-4 py-2 border border-border bg-background text-base shadow focus:outline-none"
              value={filterUser}
              onChange={e => setFilterUser(e.target.value)}
            >
              <option value="">All Users</option>
              {userOptions.map(u => (
                <option key={String(u)} value={String(u)}>{String(u)}</option>
              ))}
            </select>
            <select
              className="rounded-xl px-4 py-2 border border-border bg-background text-base shadow focus:outline-none"
              value={filterAction}
              onChange={e => setFilterAction(e.target.value)}
            >
              <option value="">All Actions</option>
              {actionOptions.map(a => (
                <option key={String(a)} value={String(a)}>{String(a)}</option>
              ))}
            </select>
            <input
              type="date"
              className="rounded-xl px-4 py-2 border border-border bg-background text-base shadow focus:outline-none"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <button
              className="px-4 py-2 bg-primary text-white rounded-xl text-base shadow hover:bg-primary/90 transition"
              onClick={() => {
                const tab = logTypes.find(l => l.key === activeTab);
                if (tab) fetchLogs(tab.table, tab.key);
              }}
            >
              Apply Filters
            </button>
            <button
              className="px-4 py-2 bg-secondary text-base rounded-xl shadow hover:bg-secondary/80 transition"
              onClick={() => {
                setFilterUser('');
                setFilterAction('');
                setFilterDate('');
                setSearch('');
                const tab = logTypes.find(l => l.key === activeTab);
                if (tab) fetchLogs(tab.table, tab.key);
              }}
            >
              Reset
            </button>
          </div>
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
                          {logs[log.key]
                            .filter((row: any) => {
                              // Search filter: match any field
                              if (!search) return true;
                              const searchLower = search.toLowerCase();
                              return Object.values(row).some(val =>
                                String(val || '').toLowerCase().includes(searchLower)
                              );
                            })
                            .map((row: any, i: number) => (
                              <tr
                                key={i}
                                className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => setExpandedLog(row)}
                              >
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
                {expandedLog && (
                  <Dialog open={!!expandedLog} onOpenChange={() => setExpandedLog(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        {Object.entries(expandedLog).map(([key, val]: [string, any]) => (
                          <div key={key} className="flex flex-col">
                            <span className="font-semibold text-xs text-muted-foreground">{key.replace(/_/g, ' ').toUpperCase()}</span>
                            <span className="break-all text-sm">{String(val || '-')}</span>
                          </div>
                        ))}
                        <button
                          className="mt-4 px-3 py-1 bg-primary text-white rounded text-xs"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              Object.entries(expandedLog)
                                .map(([key, val]) => `${key}: ${val}`)
                                .join('\n')
                            );
                          }}
                        >
                          Copy Details
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminLogs;
