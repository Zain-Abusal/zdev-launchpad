import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Megaphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('header_announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (data) {
      setAnnouncement(data.text || '');
      setLinkUrl(data.link_url || '');
      setLinkText(data.link_text || '');
      setEnabled(data.enabled || false);
      setCurrentId(data.id);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    
    const announcementData = {
      text: announcement,
      link_url: linkUrl || null,
      link_text: linkText || null,
      enabled,
    };

    if (currentId) {
      // Update existing
      const { error } = await supabase
        .from('header_announcements')
        .update(announcementData)
        .eq('id', currentId);
        
      if (error) {
        toast.error('Failed to update announcement');
      } else {
        toast.success('Announcement updated successfully');
      }
    } else {
      // Create new
      const { error } = await supabase
        .from('header_announcements')
        .insert(announcementData);
        
      if (error) {
        toast.error('Failed to create announcement');
      } else {
        toast.success('Announcement created successfully');
        fetchAnnouncement();
      }
    }
    
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Announcement Banner</h1>
          <p className="text-muted-foreground">
            Manage the announcement banner that appears at the top of all pages
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Announcement Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="announcement">Announcement Text</Label>
              <Input
                id="announcement"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Enter announcement text..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL (Optional)</Label>
              <Input
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkText">Link Text (Optional)</Label>
              <Input
                id="linkText"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Learn more"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enabled">Display Banner</Label>
              <Switch
                id="enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>

            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Announcement'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncement;
