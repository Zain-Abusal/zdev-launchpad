import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertTriangle, Save, RefreshCw } from "lucide-react";

const AdminMaintenance = () => {
  const [enabled, setEnabled] = useState(false);
  const [banner, setBanner] = useState("Scheduled maintenance at 2 AM UTC.");
  const [notes, setNotes] = useState("Expected downtime: 15 minutes.");

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="pill w-fit">Maintenance</p>
          <h1 className="text-3xl font-bold text-foreground">Maintenance Mode</h1>
          <p className="text-muted-foreground">Toggle site availability and set banner messaging.</p>
        </motion.div>

        <Card className="surface-card border border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Maintenance controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Enable maintenance mode</p>
                <p className="text-xs text-muted-foreground">Show banner and limit access for non-admin users.</p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Banner message</label>
              <Input value={banner} onChange={(e) => setBanner(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Notes</label>
              <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={enabled ? "destructive" : "secondary"} className="rounded-full">
                {enabled ? "Maintenance enabled" : "Maintenance disabled"}
              </Badge>
              <Badge variant="secondary" className="rounded-full">Banner preview: {banner.slice(0, 40)}{banner.length > 40 ? "…" : ""}</Badge>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1 border-border/60">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMaintenance;
