import { AdminLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AdminSettings = () => (
  <AdminLayout>
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Platform Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label>Brand name</Label>
          <Input defaultValue="Launchpad API" />
        </div>
        <div>
          <Label>Support email</Label>
          <Input defaultValue="support@example.com" />
        </div>
        <div>
          <Label>Docs URL</Label>
          <Input defaultValue={import.meta.env.VITE_MINTLIFY_DOCS_URL || "https://docs.example.com"} />
        </div>
        <Button>Save settings</Button>
      </CardContent>
    </Card>
  </AdminLayout>
);

export default AdminSettings;
