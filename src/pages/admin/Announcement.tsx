import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('header_announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (data && data[0]) {
      setAnnouncement(data[0].text);
      setActive(data[0].enabled ?? false);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    await supabase
      .from('header_announcements')
      .insert({ text: announcement, enabled: active });
    fetchAnnouncement();
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
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
                checked={active}
                onChange={e => setActive(e.target.checked)}
              />
              Banner Active
            </label>
            <Button size="sm" onClick={handleSave} disabled={loading}>Save Banner</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncement;
