import { AppLayout } from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Settings = () => (
  <AppLayout>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input defaultValue="Demo User" />
          </div>
          <div>
            <Label>Timezone</Label>
            <Input defaultValue="UTC" />
          </div>
          <Button>Save profile</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Org name</Label>
            <Input defaultValue="Acme Corp" />
          </div>
          <div>
            <Label>Billing email</Label>
            <Input defaultValue="billing@acme.com" />
          </div>
          <Button>Save organization</Button>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Label>Change password</Label>
        <Input type="password" placeholder="New password" />
        <Button>Update password</Button>
      </CardContent>
    </Card>
  </AppLayout>
);

export default Settings;
