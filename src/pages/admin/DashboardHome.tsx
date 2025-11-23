import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, FolderKanban, Key, MessageSquare, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({ projects: 0, clients: 0, tickets: 0, licenses: 0 });
  const [systemStatus, setSystemStatus] = useState('Operational');
  const [activity, setActivity] = useState<any[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const [announcementActive, setAnnouncementActive] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchActivity();
    fetchAnnouncement();
  }, []);

  const fetchStats = async () => {
    const projects = await supabase.from('projects').select('id');
    const clients = await supabase.from('clients').select('id');
    // No support_tickets table, so skip tickets stat
    const licenses = await supabase.from('licenses').select('id');
    setStats({
      projects: projects.data?.length || 0,
      clients: clients.data?.length || 0,
      tickets: 0,
      licenses: licenses.data?.length || 0,
    });
  };

  const fetchActivity = async () => {
    const { data } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    setActivity(data || []);
  };

  const fetchAnnouncement = async () => {
    const { data } = await supabase
      .from('header_announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (data && data[0]) {
      setAnnouncement(data[0].text);
      setAnnouncementActive(data[0].enabled ?? false);
    }
  };

  const handleAnnouncementSave = async () => {
    await supabase.from('header_announcements').insert({ text: announcement, enabled: announcementActive });
    fetchAnnouncement();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle><FolderKanban className="inline mr-2" />Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle><Users className="inline mr-2" />Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle><MessageSquare className="inline mr-2" />Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tickets}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle><Key className="inline mr-2" />Licenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.licenses}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle><BarChart2 className="inline mr-2" />System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default">{systemStatus}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><AlertCircle className="inline mr-2" />Announcement Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              placeholder="Announcement text..."
            />
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={e => setAnnouncementActive(e.target.checked)}
              />
              Banner Active
            </label>
            <Button size="sm" onClick={handleAnnouncementSave}>Save Banner</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length ? (
              <table className="w-full text-sm border">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">User</th>
                    <th className="border px-2 py-1">Action</th>
                    <th className="border px-2 py-1">Details</th>
                    <th className="border px-2 py-1">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((log: any) => (
                    <tr key={log.id}>
                      <td className="border px-2 py-1">{log.user_id || 'System'}</td>
                      <td className="border px-2 py-1">{log.action}</td>
                      <td className="border px-2 py-1">{log.details}</td>
                      <td className="border px-2 py-1">{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p className="text-muted-foreground">No recent activity.</p>}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardHome;
