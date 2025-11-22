import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const AdminSettings = () => {
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
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="zdev" />
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                defaultValue="Custom websites, systems, and Python tools."
              />
            </div>

            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" type="email" defaultValue="support@zdev.dev" />
            </div>

            <Button>Save Branding</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcement Bar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="announcementEnabled">Show Announcement Bar</Label>
              <Switch id="announcementEnabled" />
            </div>

            <div>
              <Label htmlFor="announcementText">Announcement Text</Label>
              <Textarea
                id="announcementText"
                placeholder="Enter announcement message..."
              />
            </div>

            <div>
              <Label htmlFor="announcementLink">Link (Optional)</Label>
              <Input id="announcementLink" placeholder="https://..." />
            </div>

            <Button>Save Announcement</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Default Theme</Label>
              <div className="flex gap-4 mt-2">
                <Button variant="outline">Light</Button>
                <Button variant="default">Dark</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
