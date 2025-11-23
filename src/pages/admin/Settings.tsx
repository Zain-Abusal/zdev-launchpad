import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const AdminSettings = () => {
  // Supabase CRUD logic for settings
  import { useEffect, useState } from 'react';
  import { supabase } from '@/integrations/supabase/client';
  const [settings, setSettings] = useState({ site_title: '', logo_url: '', favicon_url: '', theme: 'system', smtp_host: '', smtp_user: '', smtp_pass: '', deployment: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('settings')
      .select('*')
      .limit(1);
    if (data && data[0]) setSettings(data[0]);
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    await supabase
      .from('settings')
      .upsert(settings);
    fetchSettings();
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your site settings
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.site_title}
              onChange={e => setSettings({ ...settings, site_title: e.target.value })}
              placeholder="Site Title"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.logo_url}
              onChange={e => setSettings({ ...settings, logo_url: e.target.value })}
              placeholder="Logo URL"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.favicon_url}
              onChange={e => setSettings({ ...settings, favicon_url: e.target.value })}
              placeholder="Favicon URL"
            />
            <select
              value={settings.theme}
              onChange={e => setSettings({ ...settings, theme: e.target.value })}
              className="border rounded px-2 py-1 mb-2 w-full"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.smtp_host}
              onChange={e => setSettings({ ...settings, smtp_host: e.target.value })}
              placeholder="SMTP Host"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.smtp_user}
              onChange={e => setSettings({ ...settings, smtp_user: e.target.value })}
              placeholder="SMTP User"
            />
            <input
              type="password"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.smtp_pass}
              onChange={e => setSettings({ ...settings, smtp_pass: e.target.value })}
              placeholder="SMTP Password"
            />
            <input
              type="text"
              className="border rounded px-2 py-1 mb-2 w-full"
              value={settings.deployment}
              onChange={e => setSettings({ ...settings, deployment: e.target.value })}
              placeholder="Deployment Settings"
            />
            <Button size="sm" onClick={handleSave} disabled={loading}>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
